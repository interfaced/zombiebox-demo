import UIKeyboardLayout from 'ui/widgets/keyboard/keyboard-layout';
import KeyboardExtendedItem from './keyboard-extended-item';


/**
 */
export default class KeyboardLayout extends UIKeyboardLayout {
	/**
	 * @override
	 */
	_addWidget(container) {
		const action = container.getAttribute('data-keyboard-action');
		const symbol = container.getAttribute('data-keyboard-symbol') || container.textContent;
		const name = container.getAttribute('data-keyboard-name') || undefined;

		const item = new KeyboardExtendedItem(container, action || symbol);

		this.appendWidget(item, name);

		item.on(item.EVENT_CLICK, this._fireEventClick);

		this._items.push(item);
	}
}
