import {Out, render} from 'generated/cutejs/demo/scenes/scroll-text/scroll-text.jst';
import {AbstractBase} from '../abstract-base/abstract-base';


/**
 */
export default class ScrollText extends AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-scroll-text');

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		const exp = this._exported;
		exp.scroll.setNodes(exp.slider, exp.scrollBar, exp.shadow);
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}
}
