import {Value} from 'zb/geometry/direction';
import {text, updateClassName} from 'zb/html';
import Key from 'zb/device/input/key';
import BaseList from 'ui/widgets/base-list/base-list';
import {Out, render} from 'generated/cutejs/demo/scenes/list-matrix/list-matrix.jst';
import {red, green, yellow, blue, back} from '../../widgets/help-bar-item-factory/help-bar-item-factory';
import {DataSourceGenerator, DataType} from '../../widgets/data-source-generator/data-source-generator';
import {AbstractBase} from '../abstract-base/abstract-base';
import BaseListItem from '../../widgets/base-list-item/base-list-item';


/**
 */
export default class ListMatrix extends AbstractBase {
	/**
	 */
	constructor() {
		super();

		this._addContainerClass('s-list-matrix');

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		/**
		 * @type {number}
		 * @private
		 */
		this._columnsCount = 5;

		/**
		 * @type {number}
		 * @private
		 */
		this._rowsCount = 1;

		/**
		 * @type {DataSourceGenerator}
		 * @private
		 */
		this._sourceGenerator = new DataSourceGenerator({
			dataType: DataType.IMMEDIATELY,
			timeout: 3000
		});

		/**
		 * @type {BaseList}
		 * @private
		 */
		this._baseList = this._createBaseList(this._columnsCount, this._rowsCount, 0);

		/**
		 * @const {number}
		 */
		this.ITEM_WIDTH = 161;

		/**
		 * @const {number}
		 */
		this.MAX_COLUMNS_COUNT = 5;

		/**
		 * @const {number}
		 */
		this.MAX_ROWS_COUNT = 4;

		text(this._exported.title, 'Matrix static base-list');
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		switch (zbKey) {
			case Key.RED:
				this._removeRow();
				return true;
			case Key.GREEN:
				this._addRow();
				return true;
			case Key.YELLOW:
				this._removeColumn();
				return true;
			case Key.BLUE:
				this._addColumn();
				return true;
		}

		return super._processKey(zbKey, e);
	}

	/**
	 * @override
	 */
	_getHelpBarItems() {
		const redButton = red('');
		const greenButton = green('Remove/add row');
		const yellowButton = yellow('');
		const blueButton = blue('Remove/add column');

		redButton.disable();
		greenButton.disable();
		yellowButton.disable();
		blueButton.disable();

		updateClassName(redButton.getContainer(), '_remove', true);
		updateClassName(greenButton.getContainer(), '_add', true);
		updateClassName(yellowButton.getContainer(), '_remove', true);
		updateClassName(blueButton.getContainer(), '_add', true);

		return [
			redButton,
			greenButton,
			yellowButton,
			blueButton,
			back()
		];
	}

	/**
	 * @private
	 */
	_addRow() {
		const rowsCount = Math.min(this._rowsCount + 1, this.MAX_ROWS_COUNT);

		if (rowsCount !== this._rowsCount) {
			this._rowsCount = rowsCount;
			this._baseList = this._updateBaseList(this._baseList, this._columnsCount, this._rowsCount);
		}
	}

	/**
	 * @private
	 */
	_removeRow() {
		const rowsCount = Math.max(this._rowsCount - 1, 1);

		if (rowsCount !== this._rowsCount) {
			this._rowsCount = rowsCount;
			this._baseList = this._updateBaseList(this._baseList, this._columnsCount, this._rowsCount);
		}
	}

	/**
	 * @private
	 */
	_addColumn() {
		const columnsCount = Math.min(this._columnsCount + 1, this.MAX_COLUMNS_COUNT);

		if (columnsCount !== this._columnsCount) {
			this._columnsCount = columnsCount;
			this._baseList = this._updateBaseList(this._baseList, this._columnsCount, this._rowsCount);
		}
	}

	/**
	 * @private
	 */
	_removeColumn() {
		const columnsCount = Math.max(this._columnsCount - 1, 1);

		if (columnsCount !== this._columnsCount) {
			this._columnsCount = columnsCount;
			this._baseList = this._updateBaseList(this._baseList, this._columnsCount, this._rowsCount);
		}
	}

	/**
	 * @param {BaseList} oldBaseList
	 * @param {number} columnsCount
	 * @param {number} rowsCount
	 * @return {BaseList}
	 * @private
	 */
	_updateBaseList(oldBaseList, columnsCount, rowsCount) {
		const isBaseListInFocus = this.getActiveWidget() instanceof BaseList;

		const source = oldBaseList.getSource();
		const index = source ? source.currentIndex() : 0;

		this._removeBaseList(oldBaseList);

		const newBaseList = this._createBaseList(columnsCount, rowsCount, index);

		if (isBaseListInFocus) {
			this.activateWidget(newBaseList);
		}

		return newBaseList;
	}

	/**
	 * @param {number} columnsCount
	 * @param {number} rowsCount
	 * @param {number} index
	 * @return {BaseList}
	 * @private
	 */
	_createBaseList(columnsCount, rowsCount, index) {
		const itemsCount = columnsCount * rowsCount;

		const baseList = new BaseList({
			itemClass: BaseListItem,
			options: {
				lineSize: columnsCount,
				padding: itemsCount
			},
			isVertical: true
		});

		this._exported.sliderWrapper.appendChild(baseList.getContainer());
		this._exported.sliderWrapper.style.width = columnsCount * this.ITEM_WIDTH + 'px';

		this.appendWidget(baseList);

		this.setNavigationRule(baseList, Value.RIGHT, null);
		this.setNavigationRule(baseList, Value.LEFT, this._menu);

		const source = this._sourceGenerator.getStaticSource(1, itemsCount);
		source.selectAt(index);
		baseList.setSource(source);

		text(this._exported.rows, String(rowsCount));
		text(this._exported.columns, String(columnsCount));

		return baseList;
	}

	/**
	 * @param {BaseList} baseList
	 * @private
	 */
	_removeBaseList(baseList) {
		this.removeNavigationRule(baseList, Value.RIGHT);
		this.removeNavigationRule(baseList, Value.LEFT);

		this._exported.sliderWrapper.removeChild(baseList.getContainer());
		this.removeWidget(baseList);
	}
}
