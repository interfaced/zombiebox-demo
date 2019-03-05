import {Value} from 'zb/geometry/direction';
import {text} from 'zb/html';
import {Out, render} from 'generated/cutejs/demo/scenes/scroll-list/scroll-list.jst';
import {Source} from 'ui/widgets/base-list/abstract-base-list-buffer';
import ListStatic from '../list-static/list-static';
import {DataSourceGenerator} from '../../widgets/data-source-generator/data-source-generator';


/**
 */
export default class ScrollList extends ListStatic {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-scroll-list');

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

		text(this._exported.title, 'Scroll-list with certain amount of elements');
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
	_configure() {
		this.setNavigationRule(this._exported.scrollList, Value.RIGHT, null);
		this.setNavigationRule(this._exported.scrollList, Value.LEFT, this._menu);
		const source = this._sourceGenerator.getStaticSource(1, this._numberOfElements);

		this._exported.scrollList.setSource(source);
	}

	/**
	 * @return {Source}
	 * @protected
	 */
	_getSource() {
		return this._exported.scrollList.getSource();
	}
}
