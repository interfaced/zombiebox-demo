goog.provide('demo.scenes.ListDynamic');
goog.require('demo.scenes.ListStatic');
goog.require('demo.widgets.DataSourceGenerator');
goog.require('demo.widgets.helpBarItemFactory');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');


demo.scenes.ListDynamic = class extends demo.scenes.ListStatic {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-list-dynamic');
		const title = 'Horizontal dynamic base-list with infinite amount of elements and throbber';
		zb.html.text(this._exported.title, title);
	}


	/**
	 * @override
	 */
	_getDataType() {
		return demo.widgets.DataSourceGenerator.dataType.DEFERRED;
	}


	/**
	 * @override
	 */
	_configure() {
		this.setNavigationRule(this._exported.baseList, zb.std.plain.Direction.Value.RIGHT, null);
		this.setNavigationRule(this._exported.baseList, zb.std.plain.Direction.Value.LEFT, this._menu);

		const source = this._sourceGenerator.getDynamicSource({
			startLoadingOnItemsLeft: 2
		});

		source.on(source.EVENT_LOADING_DATA, (event, query) => {
			app.addTrobberJob(query);
		});

		this._exported.baseList.setSource(source);
	}


	/**
	 * @protected
	 */
	_redCallback() {
		/* empty function */
	}


	/**
	 * @protected
	 */
	_greenCallback() {
		/* empty function */
	}


	/**
	 * @override
	 */
	_getHelpBarItems() {
		return [
			demo.widgets.helpBarItemFactory.back()
		];
	}
};
