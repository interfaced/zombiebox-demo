goog.provide('demo.scenes.ListStatic');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.listStatic.ListStaticOut');
goog.require('demo.scenes.templates.listStatic.listStatic');
goog.require('demo.widgets.DataSourceGenerator');
goog.require('demo.widgets.helpBarItemFactory');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');
goog.require('zb.ui.BaseListBuffer');


demo.scenes.ListStatic = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.scenes.templates.listStatic.ListStaticOut}
		 * @protected
		 */
		this._exported;

		// TODO next line before super
		/**
		 * @type {number}
		 * @protected
		 */
		this._numberOfElements = 8;

		this._addContainerClass('s-list-static');
		zb.html.text(this._exported.title, 'Horizontal static base-list with certain amount of elements');

		/**
		 * @type {demo.widgets.DataSourceGenerator}
		 * @protected
		 */
		this._sourceGenerator = new demo.widgets.DataSourceGenerator({
			dataType: this._getDataType(),
			timeout: 3000
		});

		/**
		 * @type {number}
		 * @protected
		 */
		this._itemsValue = this._numberOfElements;
		this._configure();
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.listStatic.listStatic(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @return {{
	 *     count: number
	 * }}
	 * @protected
	 */
	_getTemplateData() {
		return {
			count: this._numberOfElements
		};
	}


	/**
	 * @return {demo.widgets.DataSourceGenerator.dataType}
	 * @protected
	 */
	_getDataType() {
		return demo.widgets.DataSourceGenerator.dataType.IMMEDIATELY;
	}


	/**
	 * @protected
	 */
	_configure() {
		this.setNavigationRule(this._exported.baseList, zb.std.plain.Direction.Value.RIGHT, null);
		this.setNavigationRule(this._exported.baseList, zb.std.plain.Direction.Value.LEFT, this._menu);
		const source = this._sourceGenerator.getStaticSource(1, this._itemsValue);

		this._exported.baseList.setSource(source);
	}


	/** @override */
	_processKey(zbKey, e) {
		const keys = zb.device.input.Keys;
		switch (zbKey) {
			case keys.RED:
				this._redCallback();

				return true;
			case keys.GREEN:
				this._greenCallback();

				return true;
		}

		return super._processKey(zbKey, e);
	}


	/**
	 * @override
	 */
	_getHelpBarItems() {
		const redButton = demo.widgets.helpBarItemFactory.red('');
		const greenButton = demo.widgets.helpBarItemFactory.green('Remove/add element');

		redButton.disable();
		greenButton.disable();

		zb.html.updateClassName(redButton.getContainer(), '_remove', true);
		zb.html.updateClassName(greenButton.getContainer(), '_add', true);

		return [
			redButton,
			greenButton,
			demo.widgets.helpBarItemFactory.back()
		];
	}


	/**
	 * @protected
	 */
	_redCallback() {
		const source = this._getSource();

		source.removeAt(source.currentIndex());

		this._numberOfElements = source.size();
		this._updateView();
	}


	/**
	 * @protected
	 */
	_greenCallback() {
		const source = this._getSource();
		const item = this._sourceGenerator.generateDataItem(++this._itemsValue);

		source.addAt(item, source.currentIndex() + 1);

		this._numberOfElements = source.size();
		this._updateView();
	}


	/**
	 * @return {zb.ui.BaseListBuffer.Source}
	 * @protected
	 */
	_getSource() {
		return this._exported.baseList.getSource();
	}


	/**
	 * @protected
	 */
	_updateView() {
		const exp = this._exported;

		zb.html.text(exp.count, String(this._numberOfElements));
		exp.baseList.updateView();
	}
};
