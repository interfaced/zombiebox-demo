import {Value} from 'zb/geometry/direction';
import {updateClassName, text} from 'zb/html';
import {Out, render} from 'generated/cutejs/demo/scenes/list-static/list-static.jst';
import Keys from 'zb/device/input/keys';
import {Source} from 'ui/widgets/base-list/abstract-base-list-buffer';
import {back, green, red} from '../../widgets/help-bar-item-factory/help-bar-item-factory';
import {DataType, DataSourceGenerator} from '../../widgets/data-source-generator/data-source-generator';
import {AbstractBase} from '../abstract-base/abstract-base';


/**
 */
export default class ListStatic extends AbstractBase {
	/**
	 */
	constructor() {
		super();
		/* eslint-disable interfaced/lines-between-props */

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		/**
		 * TODO should be before super
		 * @type {number}
		 * @protected
		 */
		this._numberOfElements = 8;

		this._addContainerClass('s-list-static');
		text(this._exported.title, 'Horizontal static base-list with certain amount of elements');

		/**
		 * @type {DataSourceGenerator}
		 * @protected
		 */
		this._sourceGenerator = new DataSourceGenerator({
			dataType: this._getDataType(),
			timeout: 3000
		});

		/**
		 * @type {number}
		 * @protected
		 */
		this._itemsValue = this._numberOfElements;
		this._configure();

		/* eslint-enable interfaced/lines-between-props */
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/** @override */
	_processKey(zbKey, e) {
		const keys = Keys;
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
		const redButton = red('');
		const greenButton = green('Remove/add element');

		redButton.disable();
		greenButton.disable();

		updateClassName(redButton.getContainer(), '_remove', true);
		updateClassName(greenButton.getContainer(), '_add', true);

		return [
			redButton,
			greenButton,
			back()
		];
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
	 * @return {DataType}
	 * @protected
	 */
	_getDataType() {
		return DataType.IMMEDIATELY;
	}

	/**
	 * @protected
	 */
	_configure() {
		this.setNavigationRule(this._exported.baseList, Value.RIGHT, null);
		this.setNavigationRule(this._exported.baseList, Value.LEFT, this._menu);
		const source = this._sourceGenerator.getStaticSource(1, this._itemsValue);

		this._exported.baseList.setSource(source);
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
	 * @return {Source}
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

		text(exp.count, String(this._numberOfElements));
		exp.baseList.updateView();
	}
}
