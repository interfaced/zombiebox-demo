goog.provide('demo.widgets.BaseListItem');
goog.require('demo.widgets.templates.baseListItem.baseListItem');
goog.require('zb.html');
goog.require('zb.ui.BaseListItem');


demo.widgets.BaseListItem = class extends zb.ui.BaseListItem {
	/**
	 * @override
	 */
	_createContainer() {
		const result = demo.widgets.templates.baseListItem.baseListItem({title: this._data.id});

		this._container = (zb.html.findFirstElementNode(result.root));
	}
};
