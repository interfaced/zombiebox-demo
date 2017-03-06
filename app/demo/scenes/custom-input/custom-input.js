goog.provide('demo.scenes.CustomInput');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.customInput.CustomInputOut');
goog.require('demo.scenes.templates.customInput.customInput');
goog.require('zb.html');


demo.scenes.CustomInput = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.scenes.templates.customInput.CustomInputOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-custom-input');

		const input = this._exported.input;

		input.setTheme(this._exported.input.THEME_NONE);
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

		zb.html.updateClassName(input.getContainer(), '_not-changed', true);
		input.setValue('http://');
		input.once(input.EVENT_CHANGE, () => {
			zb.html.updateClassName(input.getContainer(), '_not-changed', false);
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
		return demo.scenes.templates.customInput.customInput(this._getTemplateData(), this._getTemplateOptions());
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
		zb.html.updateClassName(this._exported.inputWrap, '_active', true);
	}


	/**
	 * @protected
	 */
	_inputOnBlur() {
		zb.html.updateClassName(this._exported.inputWrap, '_active', false);
	}
};
