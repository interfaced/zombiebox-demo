import {Out, render} from 'generated/cutejs/demo/widgets/player-progress/player-progress.jst';
import UIPlayerProgress from 'ui/widgets/player-progress/player-progress';


/**
 */
export default class PlayerProgress extends UIPlayerProgress {
	/**
	 */
	constructor() {
		super();
		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(
			this._getTemplateData(),
			this._getTemplateOptions()
		);
	}
}
