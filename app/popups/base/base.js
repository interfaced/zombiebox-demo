import {empty} from 'zb/html';
import UIAbstractBase from 'ui/popups/abstract-base/abstract-base';
import {Out, render} from 'generated/cutejs/demo/popups/base/base.jst';


/**
 * @abstract
 */
export default class AbstractBase extends UIAbstractBase {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Out}
		 * @protected
		 */
		this._baseExported;

		const result = render();

		const nodes = Array.prototype.slice.call(this._container.childNodes, 0);
		empty(this._container);
		this._container.appendChild(result.root);
		nodes.forEach((node) => {
			result.baseContainer.appendChild(node);
		});

		this._baseExported = result;
	}
}
