import {debug} from 'zb/console/console';
import Key from 'zb/device/input/key';
import AbstractKeyboard from 'ui/widgets/keyboard/abstract-keyboard';
import {Lang, Action as ActionType} from 'ui/widgets/keyboard/keyboard-layout';
import {render} from 'generated/cutejs/demo/widgets/keyboard/keyboard.jst';
import app from 'generated/app';


/**
 */
export class Keyboard extends AbstractKeyboard {
	/**
	 */
	constructor() {
		super();

		this._addLayout(this._exported.layoutAbc, this._exported.itemsAbc);
		this._addLayout(this._exported.layoutNum, this._exported.itemsNum);

		this._setLayout(this._exported.layoutAbc);
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
				this._setSymbol('.');

				return true;
			case zbKeys.GREEN:
				this._setSymbol(':');

				return true;
			case zbKeys.BLUE:
				if (this._input) {
					this._input.backspace();
				}

				return true;
			case zbKeys.YELLOW:
				this._setSymbol('/');

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
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @override
	 */
	_handleClick(action) {
		let isHandled = true;
		switch (action) {
			case Action.CAPS:
				this.setCaps(!this._isCaps);
				break;
			case Action.BACKSPACE:
				if (this._input) {
					this._input.backspace();
				}
				break;
			case Action.TYPE_ABC:
				this.setType(Type.ABC);
				break;
			case Action.TYPE_NUM:
				this.setType(Type.NUM);
				break;
			default:
				debug('_execAction fail', action);
				isHandled = false;
		}

		return isHandled;
	}
}


/**
 * @enum {Lang}
 */
export const Type = {
	ABC: 'abc',
	NUM: 'num'
};


/**
 * @enum {ActionType}
 */
export const Action = {
	CAPS: 'caps',
	BACKSPACE: 'backspace',
	TYPE_ABC: 'type-abc',
	TYPE_NUM: 'type-num'
};
