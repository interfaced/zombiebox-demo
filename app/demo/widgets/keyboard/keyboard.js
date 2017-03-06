goog.provide('demo.widgets.Keyboard');
goog.require('demo.widgets.templates.keyboard.keyboard');
goog.require('zb.console');
goog.require('zb.device.input.Keys');
goog.require('zb.ui.Keyboard');


demo.widgets.Keyboard = class extends zb.ui.Keyboard {
	/**
	 */
	constructor() {
		super();

		this._addLayout(this._exported.layoutAbc, this._exported.itemsAbc);
		this._addLayout(this._exported.layoutNum, this._exported.itemsNum);

		this._setLayout(this._exported.layoutAbc);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.widgets.templates.keyboard.keyboard(this._getTemplateData(), this._getTemplateOptions());
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
	_handleClick(action) {
		let isHandled = true;
		switch (action) {
			case demo.widgets.Keyboard.Actions.CAPS:
				this.setCaps(!this._isCaps);
				break;
			case demo.widgets.Keyboard.Actions.BACKSPACE:
				if (this._input) {
					this._input.backspace();
				}
				break;
			case demo.widgets.Keyboard.Actions.TYPE_ABC:
				this.setType(demo.widgets.Keyboard.Type.ABC);
				break;
			case demo.widgets.Keyboard.Actions.TYPE_NUM:
				this.setType(demo.widgets.Keyboard.Type.NUM);
				break;
			default:
				zb.console.debug('_execAction fail', action);
				isHandled = false;
		}

		return isHandled;
	}
};


/**
 * @enum {zb.ui.KeyboardLayout.Lang}
 */
demo.widgets.Keyboard.Type = {
	ABC: 'abc',
	NUM: 'num'
};


/**
 * @enum {zb.ui.KeyboardLayout.Action}
 */
demo.widgets.Keyboard.Actions = {
	CAPS: 'caps',
	BACKSPACE: 'backspace',
	TYPE_ABC: 'type-abc',
	TYPE_NUM: 'type-num'
};
