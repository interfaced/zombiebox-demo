import DataList from 'ui/data/list';
import DynamicList, {Options} from 'ui/data/dynamic-list';


/**
 */
export class DataSourceGenerator {
	/**
	 * @param {DataSourceGenerator.Params} params
	 */
	constructor(params) {
		/**
		 * @type {DataType}
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
	 * @return {DataList}
	 */
	getStaticSource(from, to) {
		return new DataList(this._generateData(from, to));
	}

	/**
	 * @param {Options=} options
	 * @return {DynamicList}
	 */
	getDynamicSource(options) {
		return new DynamicList(this._queryFunction.bind(this), options);
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
	 * @param {number=} row
	 * @return {Array<{id: *}>}
	 * @protected
	 */
	_generateData(from, to, row = 1) {
		const data = [];
		let elementInARow = 0;

		for (let i = from; i <= to && i < 200; i++) {
			let obj = {id: i};
			if (this._lineSize > 0) {
				++elementInARow > this._lineSize && (elementInARow = 1) && ++row; // eslint-disable-line
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
	 * @return {Promise}
	 * @protected
	 */
	_queryFunction(from, to) {
		return new Promise((resolve) => {
			const data = this._generateData(from, to);

			const deferred = setTimeout.bind(window, resolve.bind(null, data), this._timeout);
			const immediately = resolve.bind(null, data);

			switch (this._dataType) {
				case DataType.RANDOM:
					if (Math.random() > 0.5) {
						deferred();
					} else {
						immediately();
					}
					break;
				case DataType.DEFERRED:
					deferred();
					break;
				case DataType.IMMEDIATELY:
					immediately();
					break;
			}
		});
	}
}


/**
 * @typedef {{
 *     dataType: DataType,
 *     timeout: number,
 *     lineSize: (number|undefined)
 * }}
 */
DataSourceGenerator.Params;


/**
 * @enum {string}
 */
export const DataType = {
	RANDOM: 'random',
	DEFERRED: 'deferred',
	IMMEDIATELY: 'immediately'
};
