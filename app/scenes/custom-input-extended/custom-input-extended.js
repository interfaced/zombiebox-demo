import Key from 'zb/device/input/key';
import {Out, render} from 'generated/cutejs/demo/scenes/custom-input-extended/custom-input-extended.jst';
import {back, blue, yellow, green, red} from '../../widgets/help-bar-item-factory/help-bar-item-factory';
import {Lang} from '../../widgets/keyboard-extended/keyboard-extended';
import CustomInput from '../custom-input/custom-input';


/**
 */
export default class CustomInputExtended extends CustomInput {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('_extended');

		this._exported.input.setPlaceholder('Enter text here');

		const keyboard = this._exported.keyboard;
		keyboard.on(keyboard.EVENT_LANG_SWITCH, (event, lang) => {
			const item = this._helpBar.getItem(Key.GREEN);
			const label = lang === Lang.RU ? 'Eng' : 'Ru';
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
		const template = render;

		return template(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @override
	 */
	_getHelpBarItems() {
		const keyboard = this._exported.keyboard;

		return [
			red('Enter', keyboard.processShortcutKey.bind(keyboard, Key.RED)),
			green('Eng', keyboard.processShortcutKey.bind(keyboard, Key.GREEN)),
			yellow('Space', keyboard.processShortcutKey.bind(keyboard, Key.YELLOW)),
			blue('Backspace', keyboard.processShortcutKey.bind(keyboard, Key.BLUE)),
			back()
		];
	}
}
