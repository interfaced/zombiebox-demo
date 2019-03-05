import {hide, show, updateClassName} from 'zb/html';
import {Out, render} from 'generated/cutejs/demo/scenes/native-input/native-input.jst';
import {AbstractBase} from '../abstract-base/abstract-base';


/**
 */
export class NativeInput extends AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-native-input');

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

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

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isPlatformScreenKeyboardSupported = this.isPlatformScreenKeyboardSupported();

		const input = this._exported.input;
		input.setPlaceholder('Enter text here');
		input.on(input.EVENT_FOCUS, this._inputOnFocus.bind(this));
		input.on(input.EVENT_BLUR, this._inputOnBlur.bind(this));
	}

	/**
	 * @override
	 */
	beforeDOMShow() {
		this._exported.input.setValue('');

		return super.beforeDOMShow();
	}

	/**
	 * @override
	 */
	processKey(zbKey, e) {
		if (this._virtualKeyboardIsShown) {
			return false;
		}

		return super.processKey(zbKey, e);
	}

	/**
	 * @return {boolean}
	 */
	isPlatformScreenKeyboardSupported() {
		return true;
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
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
		updateClassName(this._exported.inputWrap, '_active', true);

		if (!this._isPlatformScreenKeyboardSupported) {
			show(this._exported.warnMessage);
			this._exported.inputWrap.style.borderColor = '#f00';
		}
	}

	/**
	 * @protected
	 */
	_inputOnBlur() {
		updateClassName(this._exported.inputWrap, '_active', false);

		if (!this._isPlatformScreenKeyboardSupported) {
			hide(this._exported.warnMessage);
			this._exported.inputWrap.style.borderColor = '';
		}
	}
}


/**
 * @struct
 */
export const KeyboardPos = {
	QWERTY: {
		x: 630,
		y: 150
	},
	keypad: {
		x: 460,
		y: 150
	}
};
