goog.provide('demo.widgets.KeyboardExtendedLayout');
goog.require('demo.widgets.KeyboardExtendedItem');
goog.require('zb.ui.KeyboardLayout');


demo.widgets.KeyboardExtendedLayout = class extends zb.ui.KeyboardLayout {
	/**
	 * @override
	 */
	_addWidget(container) {
		const action = container.getAttribute('data-keyboard-action');
		const symbol = container.getAttribute('data-keyboard-symbol') || container.textContent;
		const opt_name = container.getAttribute('data-keyboard-name') || undefined;

		const item = new demo.widgets.KeyboardExtendedItem(container, action || symbol);

		this.appendWidget(item, opt_name);

		item.on(item.EVENT_CLICK, this._fireEventClick);

		this._items.push(item);
	}
};
