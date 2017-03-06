goog.provide('demo.widgets.MatrixDataList');
goog.require('zb.ui.BaseListUtils');
goog.require('zb.ui.DataList');


demo.widgets.MatrixDataList = class extends zb.ui.DataList {
	/**
	 * @param {number} lineSize
	 * @param {Array.<!ItemType>=} opt_items
	 * @template ItemType
	 */
	constructor(lineSize, opt_items) {
		super(opt_items);

		/**
		 * @type {number}
		 * @protected
		 */
		this._lineSize;

		/**
		 * @const {string}
		 */
		this.EVENT_COLUMN_CHANGE = 'column-change';

		/**
		 * @const {string}
		 */
		this.EVENT_ROW_CHANGE = 'row-change';

		this.setLineSize(lineSize);
	}


	/**
	 * @param {number} lineSize
	 */
	setLineSize(lineSize) {
		this._lineSize = lineSize;
	}


	/**
	 * @param {Array.<number>} indexes
	 * @return {Array.<?ItemType>}
	 */
	getItemsByIndexes(indexes) {
		const items = [];

		indexes
			.forEach((index) => {
				items.push(this.itemAt(index));
			});

		return items;
	}


	/**
	 * @return {number}
	 */
	getLineSize() {
		return this._lineSize;
	}


	/**
	 * @param {Array.<ItemType>} arr
	 * @param {number} index
	 */
	addRow(arr, index) {
		this.addItemsAt(arr, index);

		this._fireEvent(this.EVENT_ROW_CHANGE);
	}


	/**
	 * @param {number=} opt_index
	 */
	removeRow(opt_index) {
		const indexes = this._getRowIndexes(opt_index);
		const items = this.getItemsByIndexes(indexes);

		if (this.removeItems(items)) {
			this._fireEvent(this.EVENT_ROW_CHANGE);
		}
	}


	/**
	 * @param {Array.<ItemType>} arr
	 * @param {number} colIndex
	 */
	addColumn(arr, colIndex) {
		const lineSize = this.getLineSize() + 1;
		const newItems = this._items;

		arr.forEach((item, index) => {
			newItems.splice(index * lineSize + colIndex, 0, item);
		});

		this._fireEvent(this.EVENT_COLUMN_CHANGE, lineSize, newItems);
	}


	/**
	 * @param {number=} opt_index
	 */
	removeColumn(opt_index) {
		const indexes = this._getColumnIndexes(opt_index);
		const items = this.getItemsByIndexes(indexes);

		const filteredItems = this._items.filter((item) => {
			let status = true;

			items.forEach((itemToRemove) => {
				if (itemToRemove === item) {
					status = false;
				}
			});

			return status;
		});

		if (filteredItems.length !== this._items.length) {
			this.setLineSize(this.getLineSize() - 1);
			this._fireEvent(this.EVENT_COLUMN_CHANGE, this.getLineSize(), filteredItems);
		}
	}


	/**
	 * @return {number}
	 */
	getRowsCount() {
		return zb.ui.BaseListUtils.getLinesByItems(this.size(), this.getLineSize());
	}


	/**
	 * @param {number} index
	 * @return {number}
	 */
	getRowIndex(index) {
		return zb.ui.BaseListUtils.getCoordsByIndex(index, this.getLineSize()).line + 1;
	}


	/**
	 * @param {number} index
	 * @return {number}
	 */
	getColIndex(index) {
		return zb.ui.BaseListUtils.getCoordsByIndex(index, this.getLineSize()).index + 1;
	}


	/**
	 * @param {number=} opt_index
	 * @return {Array.<number>}
	 * @protected
	 */
	_getRowIndexes(opt_index) {
		const index = opt_index || this.currentIndex();
		const lineSize = this.getLineSize();
		const start = zb.ui.BaseListUtils.getLineStart(index, lineSize);
		const end = zb.ui.BaseListUtils.getLineEnd(index, lineSize);
		const items = [];

		for (let i = start; i <= end; i++) {
			items.push(i);
		}

		return items;
	}


	/**
	 * @param {number=} opt_index
	 * @return {Array.<number>}
	 * @protected
	 */
	_getColumnIndexes(opt_index) {
		const index = opt_index || this.currentIndex();
		const lineSize = this.getLineSize();
		const rowIndex = zb.ui.BaseListUtils.getCoordsByIndex(index, lineSize).index;
		const rowNumber = zb.ui.BaseListUtils.getLinesByItems(this.size(), lineSize);
		const items = [];

		for (let i = 0; i <= rowNumber; i++) {
			items.push(zb.ui.BaseListUtils.getIndexByCoords(i, rowIndex, lineSize));
		}

		return items;
	}
};
