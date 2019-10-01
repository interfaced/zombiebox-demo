import {updateClassName} from 'zb/html';
import {Out, render} from 'generated/cutejs/demo/scenes/custom-input/custom-input.jst';
import {AbstractBase} from '../abstract-base/abstract-base';


/**
 */
export default class CustomInput extends AbstractBase {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-custom-input');

		const input = this._exported.input;

		// TODO: remove once traces of themes removed from ui
		input.getContainer().classList.remove('_theme_default');

		this._exported.keyboard.setInput(input);
		input.setPlaceholder('Enter URL here');

		input.on(input.EVENT_FOCUS, this._inputOnFocus.bind(this));
		input.on(input.EVENT_BLUR, this._inputOnBlur.bind(this));
	}

	/**
	 * @override
	 */
	beforeDOMShow() {
		super.beforeDOMShow();
		const input = this._exported.input;

		updateClassName(input.getContainer(), '_not-changed', true);
		input.setValue('http://');
		input.once(input.EVENT_CHANGE, () => {
			updateClassName(input.getContainer(), '_not-changed', false);
		});
	}

	/**
	 * @override
	 */
	afterDOMShow() {
		super.afterDOMShow();
		this._exported.input.showCaret(true);
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		if (!this._exported.keyboard.processShortcutKey(zbKey)) {
			return super._processKey(zbKey, e);
		}

		return true;
	}

	/**
	 * @protected
	 */
	_inputOnFocus() {
		updateClassName(this._exported.inputWrap, '_active', true);
	}

	/**
	 * @protected
	 */
	_inputOnBlur() {
		updateClassName(this._exported.inputWrap, '_active', false);
	}
}
