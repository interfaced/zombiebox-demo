import {div} from 'zb/html';
import UIThrobber from 'ui/widgets/throbber/throbber';


/**
 */
export default class Throbber extends UIThrobber {
	/**
	 */
	constructor() {
		const params = {
			step: 58,
			width: 1392,
			stepInterval: NaN
		};

		super(div('w-throbber'), params);

		// TODO: remove once traces of themes removed from ui
		this._container.classList.remove('_theme_default');
	}

	/**
	 * @override
	 */
	isFocusable() {
		return false;
	}
}
