Components.utils.import('resource:///modules/CustomizableUI.jsm');
Components.utils.import("resource://gre/modules/Services.jsm");

var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath("C:\\Program Files\\Waterfox\\waterfox.exe");

var cssUri;

var args = [];
args.push("-P");
//args.push(prof);
//args.push("-new-instance");
args.push("-no-remote");
//args.push("-safe-mode");
//args.push(profilename);
//args.push(window.content.location.href);

function startup(data, reason) {

	CustomizableUI.createWidget({
		id: 'profileManagerButton', //id in cui.jsm // SHOULD match id of that in dom (Line #11)
		type: 'custom',
		defaultArea: CustomizableUI.AREA_NAVBAR,
		onBuild: function (aDocument) {
			var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
			var image = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'image');
			image.setAttribute('src', 'chrome://branding/content/icon16.png');

			var props = {
				id: 'profileManagerButton', //id in dom // SHOULD match id of that in cui.jsm (Line #2)
				title: 'profileManagerButton',
				label: 'profileManager',
				align: 'center',
				pack: 'center',
				removable: 'true',
				sdkstylewidget: 'true',
				overflows: false
			};
			for (var p in props) {
				toolbaritem.setAttribute(p, props[p]);
			}

			toolbaritem.onclick = function (e) {
				if (e.button == 0) {
					let process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
					process.init(file);
					process.run(false, args, args.length);
				}
			}
			toolbaritem.className = "toolbarbutton-1";
			toolbaritem.className += " chromeclass-toolbar-additional";
			toolbaritem.className += " badged-button";
			toolbaritem.appendChild(image);
			return toolbaritem;
		}
	});
};

function shutdown(data, reason) {
	CustomizableUI.destroyWidget('profileManagerButton');
}
