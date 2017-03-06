goog.provide('demo.widgets.MatrixList');
goog.require('demo.widgets.DataSourceGenerator');
goog.require('demo.widgets.MatrixDataList');
goog.require('zb.ui.BaseList');


demo.widgets.MatrixList = class extends zb.ui.BaseList {
	/**
	 * @param {zb.ui.BaseList.Input=} opt_params
	 */
	constructor(opt_params) {
		super(opt_params);

		this._onColumnChange = this._onColumnChange.bind(this);
		this._updateView = this._updateView.bind(this);

		/**
		 * @const {string}
		 */
		this.EVENT_MATRIX_CHANGE = 'matrix-change';

		/**
		 * @type {number}
		 * @protected
		 */
		this._itemWidth = NaN;

		/**
		 * @type {number}
		 * @protected
		 */
		this._numberOfElements = 35;

		/**
		 * @type {number}
		 * @protected
		 */
		this._maxLineSize = 5;

		/**
		 * @type {demo.widgets.DataSourceGenerator}
		 * @protected
		 */
		this._sourceGenerator = new demo.widgets.DataSourceGenerator({
			dataType: demo.widgets.DataSourceGenerator.dataType.IMMEDIATELY,
			timeout: 3000,
			lineSize: 5
		});

		this._configure();
	}


	/**
	 * @override
	 */
	beforeDOMShow() {
		this._updateView();

		super.beforeDOMShow();
	}


	/**
	 * @public
	 */
	addRow() {
		const source = this.getSource();
		const currIndex = source.currentIndex();
		const rowIndex = source.getRowIndex(currIndex);
		const arr = this._sourceGenerator.generateRowItems(rowIndex + 1);
		const index = (rowIndex * source.getLineSize()) || 0;

		source.addRow(arr, index);
	}


	/**
	 * @public
	 */
	removeRow() {
		const source = this.getSource();

		if (source.getRowsCount() > 1) {
			source.removeRow();
		}
	}


	/**
	 * @public
	 */
	addColumn() {
		const source = this.getSource();
		const currIndex = source.currentIndex();
		const colIndex = source.getColIndex(currIndex) || 0;
		const rowsCount = source.getRowsCount();
		const arr = this._sourceGenerator.generateColItems(rowsCount, colIndex + 1);
		const lineSize = source.getLineSize();

		if (lineSize < this._maxLineSize) {
			source.addColumn(arr, colIndex);
		}
	}


	/**
	 * @public
	 */
	removeColumn() {
		const source = this.getSource();

		if (source.getLineSize() > 1) {
			source.removeColumn();
		}
	}


	/**
	 * @override
	 * @return {demo.widgets.MatrixDataList}
	 */
	getSource() {
		return /** @type {demo.widgets.MatrixDataList} */(super.getSource());
	}


	/**
	 * @protected
	 */
	_bindEvents() {
		const source = this.getSource();

		source.on(source.EVENT_COLUMN_CHANGE, this._onColumnChange);
		source.on(source.EVENT_ROW_CHANGE, this._updateView);
	}


	/**
	 * @protected
	 */
	_unbindEvents() {
		const source = this.getSource();

		source.off(source.EVENT_COLUMN_CHANGE, this._onColumnChange);
		source.off(source.EVENT_ROW_CHANGE, this._updateView);
	}


	/**
	 * @param {string} event
	 * @param {number} columnNum
	 * @param {Array.<{id: string}>} items
	 */
	_onColumnChange(event, columnNum, items) {
		const newSource = new demo.widgets.MatrixDataList(columnNum, items);
		this._itemWidth = this._itemSize + 20;

		this._sourceGenerator.setLineSize(columnNum);
		this._unbindEvents();
		this.setSource(null);
		this.setSource(newSource, {padding: 5, lineSize: columnNum});
		this._bindEvents();
		this._updateView();
	}


	/**
	 * @param {string=} opt_eventName
	 * @protected
	 */
	_updateView(opt_eventName) {
		const source = this.getSource();
		const columnNum = source.getLineSize();

		this.getContainer().style.marginRight = `${(this._maxLineSize - columnNum) * this._itemWidth}px`;
		this._fireEvent(this.EVENT_MATRIX_CHANGE, String(source.getRowsCount()), String(columnNum));
	}


	/**
	 * @protected
	 */
	_configure() {
		const source = this._sourceGenerator.getStaticMatrixSource(1, this._numberOfElements);

		this.setSource(source, {padding: 5, lineSize: source.getLineSize()});
		this._bindEvents();
	}
};
