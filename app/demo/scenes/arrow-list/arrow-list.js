goog.provide('demo.scenes.ArrowList');
goog.require('demo.scenes.ListStatic');
goog.require('demo.scenes.templates.arrowList.ArrowListOut');
goog.require('demo.scenes.templates.arrowList.arrowList');
goog.require('demo.widgets.DataSourceGenerator');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');
goog.require('zb.ui.BaseListBuffer');


demo.scenes.ArrowList = class extends demo.scenes.ListStatic {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.scenes.templates.arrowList.ArrowListOut}
		 * @protected
		 */
		this._exported;

		/**
		 * @type {demo.widgets.DataSourceGenerator}
		 * @protected
		 */
		this._sourceGenerator;

		this._addContainerClass('s-arrow-list');
		zb.html.text(this._exported.title, 'Arrow list with certain amount of elements');
		zb.html.updateClassName(this._exported.arrowList.getContainer(), 's-arrow-list-slider', true);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.arrowList.arrowList(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @protected
	 */
	_configure() {
		this.setNavigationRule(this._exported.arrowList, zb.std.plain.Direction.Value.RIGHT, null);
		this.setNavigationRule(this._exported.arrowList, zb.std.plain.Direction.Value.LEFT, this._menu);
		const source = this._sourceGenerator.getStaticSource(1, this._numberOfElements);

		this._exported.arrowList.setSource(source);
	}


	/**
	 * @return {zb.ui.BaseListBuffer.Source}
	 * @protected
	 */
	_getSource() {
		return this._exported.arrowList.getSource();
	}
};
