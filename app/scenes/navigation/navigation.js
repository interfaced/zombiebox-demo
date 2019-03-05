import {text} from 'zb/html';
import {Out, render} from 'generated/cutejs/demo/scenes/navigation/navigation.jst';
import {AbstractBase} from '../abstract-base/abstract-base';


/**
 */
export default class Navigation extends AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-navigation');

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		text(this._exported.title, 'Default navigation scheme');
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}
}
