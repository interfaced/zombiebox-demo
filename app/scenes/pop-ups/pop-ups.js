import {Out, render} from 'generated/cutejs/demo/scenes/pop-ups/pop-ups.jst';
import {Simple} from '../../popups/simple/simple';
import {AbstractBase} from '../abstract-base/abstract-base';


/**
 */
export default class PopUps extends AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-pop-ups');

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		this._exported.alertBtn.setTitle('Alert');
		this._exported.alertBtn.onClick(() => {
			Simple.alert('Alert pop-up', 'Alert text');
		});

		this._exported.confirmBtn.setTitle('Confirm');
		this._exported.confirmBtn.onClick(() => {
			Simple.confirm('Confirm pop-up', 'Confirm text');
		});

		this._exported.selectBtn.setTitle('Select');
		this._exported.selectBtn.onClick(() => {
			Simple.select('Select pop-up');
		});
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}
}
