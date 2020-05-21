import {Value} from 'zb/geometry/direction';
import {text} from 'zb/html';
import {Source} from 'ui/widgets/base-list/abstract-base-list-buffer';
import {Out, render} from 'generated/cutejs/demo/scenes/list-scroll/list-scroll.jst';
import ListStatic from '../list-static/list-static';
import {DataSourceGenerator} from '../../widgets/data-source-generator/data-source-generator';


/**
 */
export default class ListScroll extends ListStatic {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-list-scroll');

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

		text(this._exported.title, 'list-scroll with certain amount of elements');
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
	 * @protected
	 */
	_updateView() {
		text(this._exported.count, String(this._numberOfElements));
	}

	/**
	 * @return {Source}
	 * @protected
	 */
	_getSource() {
		return this._exported.scrollList.getSource();
	}
}
