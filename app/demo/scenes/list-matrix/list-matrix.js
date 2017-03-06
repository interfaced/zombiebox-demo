goog.provide('demo.scenes.ListMatrix');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.listMatrix.ListMatrixOut');
goog.require('demo.scenes.templates.listMatrix.listMatrix');
goog.require('demo.widgets.helpBarItemFactory');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');


demo.scenes.ListMatrix = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.scenes.templates.listMatrix.ListMatrixOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-list-matrix');

		this._exported.listMatrix.on(this._exported.listMatrix.EVENT_MATRIX_CHANGE, this._updateView.bind(this));
		this.setNavigationRule(this._exported.listMatrix, zb.std.plain.Direction.Value.RIGHT, null);
		this.setNavigationRule(this._exported.listMatrix, zb.std.plain.Direction.Value.LEFT, this._menu);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.listMatrix.listMatrix(this._getTemplateData(), this._getTemplateOptions());
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
			case keys.YELLOW:
				this._yellowCallback();

				return true;
			case keys.BLUE:
				this._blueCallback();

				return true;
		}

		return super._processKey(zbKey, e);
	}


	/**
	 * @override
	 */
	_getHelpBarItems() {
		const redButton = demo.widgets.helpBarItemFactory.red('');
		const greenButton = demo.widgets.helpBarItemFactory.green('Remove/add row');
		const yellowButton = demo.widgets.helpBarItemFactory.yellow('');
		const blueButton = demo.widgets.helpBarItemFactory.blue('Remove/add column');

		redButton.disable();
		greenButton.disable();
		yellowButton.disable();
		blueButton.disable();

		zb.html.updateClassName(redButton.getContainer(), '_remove', true);
		zb.html.updateClassName(greenButton.getContainer(), '_add', true);
		zb.html.updateClassName(yellowButton.getContainer(), '_remove', true);
		zb.html.updateClassName(blueButton.getContainer(), '_add', true);

		return [
			redButton,
			greenButton,
			yellowButton,
			blueButton,
			demo.widgets.helpBarItemFactory.back()
		];
	}


	/**
	 * @protected
	 */
	_redCallback() {
		this._exported.listMatrix.removeRow();
	}


	/**
	 * @protected
	 */
	_greenCallback() {
		this._exported.listMatrix.addRow();
	}


	/**
	 * @protected
	 */
	_yellowCallback() {
		this._exported.listMatrix.removeColumn();
	}


	/**
	 * @protected
	 */
	_blueCallback() {
		this._exported.listMatrix.addColumn();
	}


	/**
	 * @param {string} eventName
	 * @param {string} rowsCount
	 * @param {string} columnCount
	 * @protected
	 */
	_updateView(eventName, rowsCount, columnCount) {
		const exp = this._exported;
		zb.html.text(exp.rows, rowsCount);
		zb.html.text(exp.columns, columnCount);
	}
};

