goog.provide('demo.scenes.ScrollList');
goog.require('demo.scenes.ListStatic');
goog.require('demo.scenes.templates.scrollList.ScrollListOut');
goog.require('demo.scenes.templates.scrollList.scrollList');
goog.require('demo.widgets.BaseListItem');
goog.require('demo.widgets.DataSourceGenerator');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');
goog.require('zb.ui.BaseListBuffer');


demo.scenes.ScrollList = class extends demo.scenes.ListStatic {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-scroll-list');

		/**
		 * @type {demo.scenes.templates.scrollList.ScrollListOut}
		 * @protected
		 */
		this._exported;

		/**
		 * @type {demo.widgets.DataSourceGenerator}
		 * @protected
		 */
		this._sourceGenerator;

		zb.html.text(this._exported.title, 'Scroll-list with certain amount of elements');
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.scrollList.scrollList(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @return {zb.ui.BaseListBuffer.Source}
	 * @protected
	 */
	_getSource() {
		return this._exported.scrollList.getSource();
	}


	/**
	 * @override
	 */
	_configure() {
		this.setNavigationRule(this._exported.scrollList, zb.std.plain.Direction.Value.RIGHT, null);
		this.setNavigationRule(this._exported.scrollList, zb.std.plain.Direction.Value.LEFT, this._menu);
		const source = this._sourceGenerator.getStaticSource(1, this._numberOfElements);

		this._exported.scrollList.setSource(source);
	}
};
