import {findFirstElementNode} from 'zb/html';
import UIBaseListItem from 'ui/widgets/base-list/base-list-item';
import {render} from 'generated/cutejs/demo/widgets/base-list-item/base-list-item.jst';


/**
 */
export default class BaseListItem extends UIBaseListItem {
	/**
	 * @override
	 */
	_createContainer() {
		const result = render({title: this._data.id});

		this._container = (findFirstElementNode(result.root));
	}
}
