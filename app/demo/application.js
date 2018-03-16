goog.provide('demo.Application');
goog.require('demo.BaseApplication');
goog.require('demo.widgets.Throbber');
goog.require('zb.console');
goog.require('zb.console.Level');
goog.require('zb.device.input.Keys');
goog.require('zb.device.platforms.mag.Device');
goog.require('zb.device.platforms.samsung.Device');
goog.require('zb.device.platforms.webos.Device');
goog.require('zb.ext.pixelPerfect.Controller');
goog.require('zb.html');


demo.Application = class extends demo.BaseApplication {
	/**
	 */
	constructor() {
		zb.console.setLevel(zb.console.Level.ALL);
		super();

		/**
		 * @const {string}
		 */
		this.EVENT_MENU_TOGGLE = 'menu-toggle';

		/**
		 * @type {?demo.widgets.Throbber}
		 * @private
		 */
		this._throbber = null;

		/**
		 * @type {zb.ext.pixelPerfect.Controller}
		 * @protected
		 */
		this._pp = new zb.ext.pixelPerfect.Controller();
		this._pp.attachToApp(this);
		const keys = zb.device.input.Keys;
		this._pp.setKeySequence([keys.DIGIT_0]);
	}


	/**
	 * @override
	 */
	processKey(zbKey, e) {
		if (this._pp.processKey(zbKey, e)) {
			return true;
		}

		return super.processKey(zbKey, e);
	}


	/**
	 * @override
	 */
	onReady() {
		super.onReady();

		if (this.isDevicePc()) {
			this._body.appendChild(zb.html.div('zb-body__pc-help'));
		}

		if (app.isDeviceSamsung()) {
			window['_g_ime'].init('en', '2_35_259_12', 'USA', '', 'us');
		}

		zb.console.log('onReady');
	}


	/**
	 * @override
	 */
	onStart() {
		// login, splashscreen, timeout, etc.
		zb.console.log('onStart', typeof this.device);
		this.home();
	}


	/**
	 * @override
	 */
	home() {
		return this.getSceneOpener()
			.open(this.sc.scenesVideoPlayer, () => {
				this.sc.scenesVideoPlayer.setActiveSceneId({
					id: 0,
					subItem: null
				});
			});
	}


	/**
	 * @param {IThenable} job
	 */
	addTrobberJob(job) {
		if (this._throbber) {
			this._throbber.wait(job);
		}
	}


	/**
	 * @override
	 */
	_backOnEmptyHistory() {
		if (this.isDeviceWebos()) {
			const webosDevice = /** @type {zb.device.platforms.webos.Device} */(this.device);
			webosDevice.showAppsManager();
		} else {
			this.device.exit();
		}
	}


	/**
	 * @override
	 */
	_onDeviceReady(eventName, device) {
		super._onDeviceReady(eventName, device);
		this._createThrobber();

		if (app.isDeviceSamsung()) {
			const samsungDevice = /** @type {zb.device.platforms.samsung.Device} */(this.device);
			samsungDevice.getPluginObject()['registIMEKey']();
		} else if (app.isDeviceMag()) {
			const magDevice = /** @type {zb.device.platforms.mag.Device} */(this.device);
			// eslint-disable-next-line new-cap
			magDevice.getPluginObject().EnableVKButton(false);
		}
	}


	/**
	 * @private
	 */
	_createThrobber() {
		const throbberWrap = zb.html.div('a-throbber zb-fullscreen');

		this._throbber = new demo.widgets.Throbber();
		throbberWrap.appendChild(this._throbber.getContainer());
		this._body.appendChild(throbberWrap);

		this._throbber.on(this._throbber.EVENT_START, () => {
			zb.html.show(throbberWrap);
		});

		this._throbber.on(this._throbber.EVENT_STOP, () => {
			zb.html.hide(throbberWrap);
		});
	}
};
