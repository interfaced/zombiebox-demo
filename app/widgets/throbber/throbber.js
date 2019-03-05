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
		this.setTheme(this.THEME_NONE);
	}

	/**
	 * @override
	 */
	isFocusable() {
		return false;
	}
}
