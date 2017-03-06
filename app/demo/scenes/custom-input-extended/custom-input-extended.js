goog.provide('demo.scenes.CustomInputExtended');
goog.require('demo.scenes.CustomInput');
goog.require('demo.scenes.templates.customInputExtended.CustomInputExtendedOut');
goog.require('demo.scenes.templates.customInputExtended.customInputExtended');
goog.require('demo.widgets.KeyboardExtended');
goog.require('demo.widgets.helpBarItemFactory');
goog.require('zb.device.input.Keys');


demo.scenes.CustomInputExtended = class extends demo.scenes.CustomInput {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.scenes.templates.customInputExtended.CustomInputExtendedOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('_extended');

		this._exported.input.setPlaceholder('Enter text here');

		const keyboard = this._exported.keyboard;
		keyboard.on(keyboard.EVENT_LANG_SWITCH, (event, lang) => {
			const item = this._helpBar.getItem(zb.device.input.Keys.GREEN);
			const label = lang === demo.widgets.KeyboardExtended.Lang.RU ? 'Eng' : 'Ru';
			item.setLabel(label);
		});
	}


	/**
	 * @override
	 */
	beforeDOMShow() {
		super.beforeDOMShow();
		this._exported.input.setValue('');
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
	 * @override
	 */
	_renderTemplate() {
		const template = demo.scenes.templates.customInputExtended.customInputExtended;

		return template(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @override
	 */
	_getHelpBarItems() {
		const keyboard = this._exported.keyboard;

		return [
			demo.widgets.helpBarItemFactory
				.red('Enter', keyboard.processShortcutKey.bind(keyboard, zb.device.input.Keys.RED)),
			demo.widgets.helpBarItemFactory
				.green('Eng', keyboard.processShortcutKey.bind(keyboard, zb.device.input.Keys.GREEN)),
			demo.widgets.helpBarItemFactory
				.yellow('Space', keyboard.processShortcutKey.bind(keyboard, zb.device.input.Keys.YELLOW)),
			demo.widgets.helpBarItemFactory
				.blue('Backspace', keyboard.processShortcutKey.bind(keyboard, zb.device.input.Keys.BLUE)),
			demo.widgets.helpBarItemFactory.back()
		];
	}
};
