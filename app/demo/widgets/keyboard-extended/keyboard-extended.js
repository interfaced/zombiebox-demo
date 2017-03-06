goog.provide('demo.widgets.KeyboardExtended');
goog.require('demo.widgets.templates.keyboardExtended.KeyboardExtendedOut');
goog.require('demo.widgets.templates.keyboardExtended.keyboardExtended');
goog.require('zb.device.input.Keys');
goog.require('zb.ui.Keyboard');


demo.widgets.KeyboardExtended = class extends zb.ui.Keyboard {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.widgets.templates.keyboardExtended.KeyboardExtendedOut}
		 * @protected
		 */
		this._exported;

		/**
		 * @const {string}
		 */
		this.EVENT_ENTER = 'enter';

		/**
		 * @const {string}
		 */
		this.EVENT_LANG_SWITCH = 'lang-switch';

		this._addLayout(this._exported.layoutAbcEn, this._exported.itemsAbcEn);
		this._addLayout(this._exported.layoutAbcRu, this._exported.itemsAbcRu);
		this._addLayout(this._exported.layoutSymbolsCommon, this._exported.itemsSymbolsCommon);
		this._addLayout(this._exported.layoutSymbolsSpecial, this._exported.itemsSymbolsSpecial);

		/**
		 * @type {string}
		 * @protected
		 */
		this._currentLang = demo.widgets.KeyboardExtended.Lang.RU;
		this.setOptions(demo.widgets.KeyboardExtended.Types.ABC, this._currentLang);
		this._updateABCitems();
	}


	/**
	 * @override
	 */
	setLang(opt_lang) {
		super.setLang(opt_lang);

		if (opt_lang) {
			this._currentLang = opt_lang;
			this._updateABCitems();
			this._fireEvent(this.EVENT_LANG_SWITCH, opt_lang);
		}
	}


	/**
	 * @param {zb.device.input.Keys} zbKey
	 * @return {boolean}
	 */
	processShortcutKey(zbKey) {
		const zbKeys = zb.device.input.Keys;
		const zbCharKey = app.device.input.keyToPrintableChar(zbKey);

		switch (zbKey) {
			case zbKeys.RED:
				this._fireEvent(this.EVENT_ENTER);

				return true;
			case zbKeys.GREEN:
				this._switchLang();

				return true;
			case zbKeys.BLUE:
				if (this._input) {
					this._input.backspace();
				}

				return true;
			case zbKeys.YELLOW:
				this._setSymbol(' ');

				return true;
			default:
				if (zbCharKey !== null) {
					this._setSymbol(zbCharKey);

					return true;
				}

				return false;
		}
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.widgets.templates.keyboardExtended.keyboardExtended(
			this._getTemplateData(),
			this._getTemplateOptions()
		);
	}


	/** @override */
	_handleClick(action) {
		let isHandled = true;
		switch (action) {
			case demo.widgets.KeyboardExtended.Actions.ENTER:
				this._fireEvent(this.EVENT_ENTER);
				break;
			case demo.widgets.KeyboardExtended.Actions.CAPS:
				this.setCaps(!this._isCaps);
				break;
			case demo.widgets.KeyboardExtended.Actions.BACKSPACE:
				if (this._input) {
					this._input.backspace();
				}
				break;
			case demo.widgets.KeyboardExtended.Actions.SPACE:
				if (this._input) {
					this._input.putStr(' ');
				}
				break;
			case demo.widgets.KeyboardExtended.Actions.LEFT:
				if (this._input) {
					this._input.moveCaretLeft();
				}
				break;
			case demo.widgets.KeyboardExtended.Actions.RIGHT:
				if (this._input) {
					this._input.moveCaretRight();
				}
				break;
			case demo.widgets.KeyboardExtended.Actions.LANG:
				this._switchLang();
				break;
			case demo.widgets.KeyboardExtended.Actions.LANG_RU:
				this.setLang(demo.widgets.KeyboardExtended.Lang.RU);
				break;
			case demo.widgets.KeyboardExtended.Actions.LANG_EN:
				this.setLang(demo.widgets.KeyboardExtended.Lang.EN);
				break;
			case demo.widgets.KeyboardExtended.Actions.TYPE_ABC:
				this.setType(demo.widgets.KeyboardExtended.Types.ABC);

				if (this._isCurrentLangEN()) {
					this.setLang(demo.widgets.KeyboardExtended.Lang.EN);
				} else {
					this.setLang(demo.widgets.KeyboardExtended.Lang.RU);
				}
				break;
			case demo.widgets.KeyboardExtended.Actions.TYPE_SYMBOL:
				this.setType(demo.widgets.KeyboardExtended.Types.SYMBOLS);
				break;
			case demo.widgets.KeyboardExtended.Actions.TYPE_NUM:
				this.setType(demo.widgets.KeyboardExtended.Types.NUM);
				break;
			default:
				super._handleClick(action);
				isHandled = false;
		}

		return isHandled;
	}


	/**
	 * @protected
	 */
	_switchLang() {
		this.setType(demo.widgets.KeyboardExtended.Types.ABC);

		if (this._isCurrentLangEN()) {
			this.setLang(demo.widgets.KeyboardExtended.Lang.RU);
		} else {
			this.setLang(demo.widgets.KeyboardExtended.Lang.EN);
		}
	}


	/**
	 * @protected
	 */
	_updateABCitems() {
		const {ABC_EN, ABC_RU} = demo.widgets.KeyboardExtended.ABC;
		const abcLayouts = [this._exported.layoutSymbolsCommon, this._exported.layoutSymbolsSpecial];
		const title = this._isCurrentLangEN() ? ABC_EN : ABC_RU;

		abcLayouts.forEach((layout) => {
			layout.getNamedWidgets()[demo.widgets.KeyboardExtended.Types.ABC].setTitle(title);
		});
	}


	/**
	 * @return {string}
	 * @protected
	 */
	_getCurrentLang() {
		return this._currentLang;
	}


	/**
	 * @return {boolean}
	 * @protected
	 */
	_isCurrentLangEN() {
		return this._getCurrentLang() === demo.widgets.KeyboardExtended.Lang.EN;
	}
};


/**
 * @typedef {{
 *     RU: string,
 *     EN: string
 * }}
 */
demo.widgets.KeyboardExtended.ABC = {
	RU: 'АБВ',
	EN: 'ABC'
};


/**
 * @enum {zb.ui.KeyboardLayout.Type}
 */
demo.widgets.KeyboardExtended.Types = {
	ABC: 'abc',
	NUM: 'num',
	SYMBOLS: 'symbol'
};


/**
 * @enum {zb.ui.KeyboardLayout.Lang}
 */
demo.widgets.KeyboardExtended.Lang = {
	RU: 'ru',
	EN: 'en'
};


/**
 * @enum {zb.ui.KeyboardLayout.Action}
 */
demo.widgets.KeyboardExtended.Actions = {
	ENTER: 'enter',
	CAPS: 'caps',
	BACKSPACE: 'backspace',
	SPACE: 'space',
	LEFT: 'left',
	RIGHT: 'right',
	LANG: 'lang',
	ABC: 'abc',
	LANG_RU: 'lang-ru',
	LANG_EN: 'lang-en',
	TYPE_ABC: 'type-abc',
	TYPE_SYMBOL: 'type-symbol',
	TYPE_NUM: 'type-num'
};
