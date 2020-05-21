import {Value} from 'zb/geometry/direction';
import {updateClassName, text} from 'zb/html';
import {Source} from 'ui/widgets/base-list/abstract-base-list-buffer';
import {Out, render} from 'generated/cutejs/demo/scenes/list-arrow/list-arrow.jst';
import ListStatic from '../list-static/list-static';
import {DataSourceGenerator} from '../../widgets/data-source-generator/data-source-generator';


/**
 */
export default class ListArrow extends ListStatic {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		/**
		 * @type {DataSourceGenerator}
		 * @protected
		 */
		this._sourceGenerator;

		this._addContainerClass('s-list-arrow');
		text(this._exported.title, 'Arrow list with certain amount of elements');
		updateClassName(this._exported.arrowList.getContainer(), 's-list-arrow-slider', true);
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @protected
	 */
	_updateView() {
		text(this._exported.count, String(this._numberOfElements));
	}

	/**
	 * @protected
	 */
	_configure() {
		this.setNavigationRule(this._exported.arrowList, Value.RIGHT, null);
		this.setNavigationRule(this._exported.arrowList, Value.LEFT, this._menu);
		const source = this._sourceGenerator.getStaticSource(1, this._numberOfElements);

		this._exported.arrowList.setSource(source);
	}

	/**
	 * @return {Source}
	 * @protected
	 */
	_getSource() {
		return this._exported.arrowList.getSource();
	}
}
