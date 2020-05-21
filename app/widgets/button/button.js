import {updateClassName, text, findFirstElementNode} from 'zb/html';
import UIButton from 'ui/widgets/button/button';
import {Out, render} from 'generated/cutejs/demo/widgets/button/button.jst';


/**
 */
export default class Button extends UIButton {
	/**
	 * @param {Input=} params
	 */
	constructor(params) {
		const exp = render();
		const container = findFirstElementNode(exp.root);

		let data;
		if (params && params.data) {
			data = params.data;
		}

		super(container, data);

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported = exp;

		if (params && params.title) {
			this.setTitle(params.title);
		}

		if (params && params.modifier) {
			this.setModifier(params.modifier);
		}
	}

	/**
	 * @param {string} title
	 */
	setTitle(title) {
		text(this._exported.title, title);
	}

	/**
	 * @param {string} modifier
	 */
	setModifier(modifier) {
		updateClassName(this.getContainer(), `_${modifier}`, true);
	}
}


/**
 * @typedef {{
 *     title: (string|undefined),
 *     modifier: (string|undefined),
 *     data: (*|undefined)
 * }}
 */
export let Input;
