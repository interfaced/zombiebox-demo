import {Value} from 'zb/geometry/direction';
import {text} from 'zb/html';
import app from 'generated/app';
import {back} from '../../widgets/help-bar-item-factory/help-bar-item-factory';
import {DataType} from '../../widgets/data-source-generator/data-source-generator';
import ListStatic from '../list-static/list-static';


/**
 */
export default class ListDynamic extends ListStatic {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-list-dynamic');
		const title = 'Horizontal dynamic base-list with infinite amount of elements and throbber';
		text(this._exported.title, title);
	}

	/**
	 * @override
	 */
	_getDataType() {
		return DataType.DEFERRED;
	}

	/**
	 * @override
	 */
	_configure() {
		this.setNavigationRule(this._exported.baseList, Value.RIGHT, null);
		this.setNavigationRule(this._exported.baseList, Value.LEFT, this._menu);

		const source = this._sourceGenerator.getDynamicSource({
			startLoadingOnItemsLeft: 2
		});

		source.on(source.EVENT_LOADING_DATA, (event, query) => {
			app.addTrobberJob(query);
		});

		this._exported.baseList.setSource(source);
	}

	/**
	 * @override
	 */
	_getHelpBarItems() {
		return [
			back()
		];
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
}
