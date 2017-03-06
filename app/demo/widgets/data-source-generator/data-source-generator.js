goog.provide('demo.widgets.DataSourceGenerator');
goog.require('demo.widgets.MatrixDataList');
goog.require('zb.ui.DataList');
goog.require('zb.ui.DynamicList');


demo.widgets.DataSourceGenerator = class {
	/**
	 * @param {demo.widgets.DataSourceGenerator.Params} params
	 */
	constructor(params) {
		/**
		 * @type {demo.widgets.DataSourceGenerator.dataType}
		 * @protected
		 */
		this._dataType = params.dataType;
		/**
		 * @type {number}
		 * @protected
		 */
		this._timeout = params.timeout;
		/**
		 * @type {number}
		 * @protected
		 */
		this._lineSize = params.lineSize || 0;
	}


	/**
	 * @param {number} from
	 * @param {number} to
	 * @return {zb.ui.DataList}
	 */
	getStaticSource(from, to) {
		return new zb.ui.DataList(this._generateData(from, to));
	}


	/**
	 * @param {zb.ui.DynamicList.Options=} opt_options
	 * @return {zb.ui.DynamicList}
	 */
	getDynamicSource(opt_options) {
		return new zb.ui.DynamicList(this._queryFunction.bind(this), opt_options);
	}


	/**
	 * @param {number} number
	 * @return {{id: *}}
	 */
	generateDataItem(number) {
		return this._generateData(number, number)[0];
	}


	/**
	 * @param {number} from
	 * @param {number} to
	 * @return {demo.widgets.MatrixDataList}
	 * @public
	 */
	getStaticMatrixSource(from, to) {
		return new demo.widgets.MatrixDataList(this._lineSize, this._generateData(from, to));
	}


	/**
	 * @param {number} lineSize
	 */
	setLineSize(lineSize) {
		this._lineSize = lineSize;
	}


	/**
	 * @return {number}
	 */
	getLineSize() {
		return this._lineSize || 1;
	}


	/**
	 * @param {number} row
	 * @return {Array.<{id: string}>}
	 */
	generateRowItems(row) {
		return this._generateData(1, this.getLineSize(), row);
	}


	/**
	 * @param {number} rowNumber
	 * @param {number} colIndex
	 * @return {Array.<{id: string}>}
	 */
	generateColItems(rowNumber, colIndex) {
		const data = [];

		for (let i = 1; i <= rowNumber; i++) {
			data.push({
				id: `${i}-${colIndex}`,
				toString() {
					return String(this.id);
				}
			});
		}

		return data;
	}


	/**
	 * @param {number} from
	 * @param {number} to
	 * @param {number=} opt_row
	 * @return {Array.<{id: *}>}
	 * @protected
	 */
	_generateData(from, to, opt_row) {
		const data = [];
		let elementInARow = 0;
		let row = opt_row || 1;

		for (let i = from; i <= to && i < 200; i++) {
			let obj = {id: i};
			if (this._lineSize > 0) {
				++elementInARow > this._lineSize && (elementInARow = 1) && ++row;
				obj = {id: `${row}-${elementInARow}`};
			}

			obj.toString = function() {
				return String(this.id);
			};

			data.push(obj);
		}

		return data;
	}


	/**
	 * @param {number} from
	 * @param {number} to
	 * @return {IThenable}
	 * @protected
	 */
	_queryFunction(from, to) {
		return new Promise((resolve, reject) => {
			const data = this._generateData(from, to);

			const deferred = setTimeout.bind(window, resolve.bind(null, data), this._timeout);
			const immediately = resolve.bind(null, data);

			switch (this._dataType) {
				case demo.widgets.DataSourceGenerator.dataType.RANDOM:
					if (Math.random() > 0.5) {
						deferred();
					} else {
						immediately();
					}
					break;
				case demo.widgets.DataSourceGenerator.dataType.DEFERRED:
					deferred();
					break;
				case demo.widgets.DataSourceGenerator.dataType.IMMEDIATELY:
					immediately();
					break;
			}
		});
	}
};


/**
 * @typedef {{
 *      dataType: demo.widgets.DataSourceGenerator.dataType,
 *      timeout: number,
 *      lineSize: (number|undefined)
 * }}
 */
demo.widgets.DataSourceGenerator.Params;


/**
 * @enum {string}
 */
demo.widgets.DataSourceGenerator.dataType = {
	RANDOM: 'random',
	DEFERRED: 'deferred',
	IMMEDIATELY: 'immediately'
};
