goog.provide('demo.widgets.KeyboardExtendedItem');
goog.require('zb.html');
goog.require('zb.ui.Button');


demo.widgets.KeyboardExtendedItem = class extends zb.ui.Button {
	/**
	 * @param {string} title
	 */
	setTitle(title) {
		zb.html.text(this.getContainer(), title);
	}
};
