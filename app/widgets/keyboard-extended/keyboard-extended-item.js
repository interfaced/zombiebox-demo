import {text} from 'zb/html';
import Button from 'ui/widgets/button/button';


/**
 */
export default class KeyboardExtendedItem extends Button {
	/**
	 * @param {string} title
	 */
	setTitle(title) {
		text(this.getContainer(), title);
	}
}
