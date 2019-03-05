import {updateClassName, text, findFirstElementNode} from 'zb/html';
import {Out, render} from 'generated/cutejs/demo/widgets/button/button.jst';
import UIButton from 'ui/widgets/button/button';


/**
 */
export default class Button extends UIButton {
	/**
	 * @param {Input=} opt_params
	 */
	constructor(opt_params) {
		const exp = render();
		const container = findFirstElementNode(exp.root);

		let data;
		if (opt_params && opt_params.data) {
			data = opt_params.data;
		}

		super(container, data);

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported = exp;

		if (opt_params && opt_params.title) {
			this.setTitle(opt_params.title);
		}

		if (opt_params && opt_params.modifier) {
			this.setModifier(opt_params.modifier);
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
 *     data: (*|undefined),
 * }}
 */
export let Input;
