goog.provide('demo.scenes.NativeInput');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.nativeInput.NativeInputOut');
goog.require('demo.scenes.templates.nativeInput.nativeInput');
goog.require('zb.device.platforms.mag.Device');
goog.require('zb.device.platforms.tvip.Device');
goog.require('zb.html');


demo.scenes.NativeInput = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-native-input');

		/**
		 * @type {demo.scenes.templates.nativeInput.NativeInputOut}
		 * @protected
		 */
		this._exported;

		/**
		 * @type {?MAGgSTB}
		 * @protected
		 */
		this._pluginMAG250 = null;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._virtualKeyboardIsShown = false;
		/**
		 * @type {Object}
		 * @protected
		 */
		this._ime = null;

		const input = this._exported.input;
		input.setPlaceholder('Enter text here');
		input.on(input.EVENT_FOCUS, this._inputOnFocus.bind(this));
		input.on(input.EVENT_BLUR, this._inputOnBlur.bind(this));

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isPlatformScreenKeyboardSupported = this.isPlatformScreenKeyboardSupported();
	}


	/**
	 * @override
	 */
	beforeDOMShow() {
		this._exported.input.setValue('');

		if (app.isDeviceLg() && window['lgKb'] != null) {
			window['lgKb']['onKeyboardShow'] = this._onKeyboardShow.bind(this);
			window['lgKb']['onKeyboardHide'] = this._onKeyboardHide.bind(this);
		} else if (app.isDeviceSamsung() && this._ime === null) {
			this._ime = new window['IMEShell']('nativeInput', this._imeInitText, this);
		} else if (app.isDeviceMag()) {
			const device = /** @type {zb.device.platforms.mag.Device} */(app.device);
			this._pluginMAG250 = device.getPluginObject();
		}

		return super.beforeDOMShow();
	}


	/**
	 * @return {boolean}
	 */
	isPlatformScreenKeyboardSupported() {
		return !(app.isDeviceDune()/* || app.isDeviceEltex()*/);
	}


	/**
	 * @override
	 */
	processKey(zbKey, e) {
		if (app.isDeviceTizen()) {
			switch (e.keyCode) {
				// Cancel/Return
				case 65385:
					this._exported.input.blur();
					this.activateWidget(this._menu);
					break;
				// Done
				case 65376:
					this._exported.input.blur();
					this.activateWidget(this._menu);
					break;
				default:
					break;
			}
		}

		if (this._virtualKeyboardIsShown) {
			return false;
		}

		return super.processKey(zbKey, e);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.nativeInput.nativeInput(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @param {Object} imeobj
	 * @protected
	 */
	_imeInitText(imeobj) {
		const NativeInput = demo.scenes.NativeInput;
		imeobj['setKeypadPos'](NativeInput.KeyboardPos.QWERTY.x, NativeInput.KeyboardPos.QWERTY.y);
		imeobj['setQWERTYPos'](NativeInput.KeyboardPos.keypad.x, NativeInput.KeyboardPos.keypad.y);
		imeobj['setAnyKeyFunc'](this._anyKeyCallback.bind(this));
	}


	/**
	 * @param {number} keyCode
	 * @protected
	 */
	_anyKeyCallback(keyCode) {
		switch (keyCode) {
			// key enter
			case 29443:
				this._exported.input.blur();
				this.activateWidget(this._menu);
				break;
			// key cancel
			case 88:
				this._exported.input.blur();
				this.activateWidget(this._menu);
				break;
			default:
				break;
		}
	}


	/**
	 * @protected
	 */
	_onKeyboardShow() {
		this._virtualKeyboardIsShown = true;
	}


	/**
	 * @protected
	 */
	_onKeyboardHide() {
		this._virtualKeyboardIsShown = false;
	}


	/**
	 * @protected
	 */
	_inputOnFocus() {
		zb.html.updateClassName(this._exported.inputWrap, '_active', true);

		if (!this._isPlatformScreenKeyboardSupported) {
			zb.html.show(this._exported.warnMessage);
			this._exported.inputWrap.style.borderColor = '#f00';

			return;
		}

		if (app.isDeviceTizen() || app.isDeviceSamsung()) {
			this._virtualKeyboardIsShown = true;
		} else if (app.isDeviceTvip()) {
			const device = /** @type {zb.device.platforms.tvip.Device} */(app.device);
			device._tvipStb.showVirtualKeyboard(true);
		} else if (app.isDeviceMag()) {
			// eslint-disable-next-line new-cap
			this._pluginMAG250.ShowVirtualKeyboard();
		}

		if (app.isDeviceSamsung() && window['_g_ime']['pluginMouse_use_YN']) {
			this._ime['_focus']();
		}
	}


	/**
	 * @protected
	 */
	_inputOnBlur() {
		zb.html.updateClassName(this._exported.inputWrap, '_active', false);

		if (!this._isPlatformScreenKeyboardSupported) {
			zb.html.hide(this._exported.warnMessage);
			this._exported.inputWrap.style.borderColor = '';

			return;
		}

		if (app.isDeviceTizen() || app.isDeviceSamsung()) {
			// TODO подумать как избавиться от setTimeout
			// костыль, так как у samsung-ORSAY свой обработчик нажатия, в итоге enter обрабатывается одновременно
			// и сценой и virtual клавиатурой. Особенность ORSAY -> при скрытии клавиатуры необходимо убрать фокус с
			// инпут элемента, в итоге нажатие enter обрабатывается на виджете сцены на который уходит фокус с инпута,
			// поэтому снимаем блокировку обработки нажатия с задержкой. Если есть мысли как сделать лучше,
			// готов обсудить
			setTimeout(() => {
				this._virtualKeyboardIsShown = false;
			}, 300);
		} else if (app.isDeviceMag()) {
			// eslint-disable-next-line new-cap
			this._pluginMAG250.HideVirtualKeyboard();
		}

		if (app.isDeviceSamsung() && window['_g_ime']['pluginMouse_use_YN']) {
			this._ime['_blur']();
		}
	}
};


/**
 * @struct
 */
demo.scenes.NativeInput.KeyboardPos = {
	QWERTY: {
		x: 630,
		y: 150
	},
	keypad: {
		x: 460,
		y: 150
	}
};
