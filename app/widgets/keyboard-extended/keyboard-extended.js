import Key from 'zb/device/input/key';
import AbstractKeyboard from 'ui/widgets/keyboard/abstract-keyboard';
import {
	Type as KeyboardLayoutType,
	Lang as KeyboardLayoutLang,
	Action as KeyboardLayoutAction
} from 'ui/widgets/keyboard/keyboard-layout';
import {Out, render} from 'generated/cutejs/demo/widgets/keyboard-extended/keyboard-extended.jst';
import app from 'generated/app';


/**
 */
export class KeyboardExtended extends AbstractKeyboard {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		/**
		 * @type {string}
		 * @protected
		 */
		this._currentLang = Lang.RU;

		/**
		 * Fired with: nothing
		 * @const {string}
		 */
		this.EVENT_ENTER = 'enter';

		/**
		 * Fired with: {Lang}
		 * @const {string}
		 */
		this.EVENT_LANG_SWITCH = 'lang-switch';

		this._addLayout(this._exported.layoutAbcEn, this._exported.itemsAbcEn);
		this._addLayout(this._exported.layoutAbcRu, this._exported.itemsAbcRu);
		this._addLayout(this._exported.layoutSymbolsCommon, this._exported.itemsSymbolsCommon);
		this._addLayout(this._exported.layoutSymbolsSpecial, this._exported.itemsSymbolsSpecial);

		this.setOptions(Type.ABC, this._currentLang);
		this._updateABCitems();
	}

	/**
	 * @override
	 */
	setLang(lang) {
		super.setLang(lang);

		if (lang) {
			this._currentLang = lang;
			this._updateABCitems();
			this._fireEvent(this.EVENT_LANG_SWITCH, lang);
		}
	}

	/**
	 * @param {Key} zbKey
	 * @return {boolean}
	 */
	processShortcutKey(zbKey) {
		const zbKeys = Key;
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
		return render(
			this._getTemplateData(),
			this._getTemplateOptions()
		);
	}

	/** @override */
	_handleClick(action) {
		let isHandled = true;
		switch (action) {
			case Action.ENTER:
				this._fireEvent(this.EVENT_ENTER);
				break;
			case Action.CAPS:
				this.setCaps(!this._isCaps);
				break;
			case Action.BACKSPACE:
				if (this._input) {
					this._input.backspace();
				}
				break;
			case Action.SPACE:
				if (this._input) {
					this._input.putStr(' ');
				}
				break;
			case Action.LEFT:
				if (this._input) {
					this._input.moveCaretLeft();
				}
				break;
			case Action.RIGHT:
				if (this._input) {
					this._input.moveCaretRight();
				}
				break;
			case Action.LANG:
				this._switchLang();
				break;
			case Action.LANG_RU:
				this.setLang(Lang.RU);
				break;
			case Action.LANG_EN:
				this.setLang(Lang.EN);
				break;
			case Action.TYPE_ABC:
				this.setType(Type.ABC);

				if (this._isCurrentLangEN()) {
					this.setLang(Lang.EN);
				} else {
					this.setLang(Lang.RU);
				}
				break;
			case Action.TYPE_SYMBOL:
				this.setType(Type.SYMBOLS);
				break;
			case Action.TYPE_NUM:
				this.setType(Type.NUM);
				break;
			default:
				isHandled = false;
		}

		return isHandled;
	}

	/**
	 * @protected
	 */
	_switchLang() {
		this.setType(Type.ABC);

		if (this._isCurrentLangEN()) {
			this.setLang(Lang.RU);
		} else {
			this.setLang(Lang.EN);
		}
	}

	/**
	 * @protected
	 */
	_updateABCitems() {
		const {EN, RU} = ABC;
		const abcLayouts = [this._exported.layoutSymbolsCommon, this._exported.layoutSymbolsSpecial];
		const title = this._isCurrentLangEN() ? EN : RU;

		abcLayouts.forEach((layout) => {
			layout.getNamedWidgets()[Type.ABC].setTitle(title);
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
		return this._getCurrentLang() === Lang.EN;
	}
}


/**
 * @typedef {{
 *     RU: string,
 *     EN: string
 * }}
 */
export const ABC = {
	RU: 'АБВ',
	EN: 'ABC'
};


/**
 * @enum {KeyboardLayoutType}
 */
export const Type = {
	ABC: 'abc',
	NUM: 'num',
	SYMBOLS: 'symbol'
};


/**
 * @enum {KeyboardLayoutLang}
 */
export const Lang = {
	RU: 'ru',
	EN: 'en'
};


/**
 * @enum {KeyboardLayoutAction}
 */
export const Action = {
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
