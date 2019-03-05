import app from 'generated/app';
import {updateClassName, text} from 'zb/html';
import {Status, StatusHandler} from 'ui/popups/abstract-base/abstract-base';
import {Out, render} from 'generated/cutejs/demo/popups/simple/simple.jst';
import Layer from 'zb/layers/layer';
import AbstractBase from '../base/base';
import Button from '../../widgets/button/button';


/**
 */
export class Simple extends AbstractBase {
	/**
	 * @param {Simple.Input} params
	 */
	constructor(params) {
		super();

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('p-simple');

		text(this._exported.title, params.title);

		if (params.message) {
			text(this._exported.message, params.message);
			updateClassName(this.getContainer(), '_has-message', true);
		}

		if (params.modifier) {
			this.setModifier(params.modifier);
		}

		params.buttons.forEach(this._addButton.bind(this));
	}

	/**
	 * @param {string} modifier
	 */
	setModifier(modifier) {
		updateClassName(this.getContainer(), `_${modifier}`, true);
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @param {Simple.Button} params
	 * @private
	 */
	_addButton(params) {
		const button = new Button({title: params.title});
		this.appendWidget(button);
		this._exported.buttonsContainer.appendChild(button.getContainer());

		button.on(button.EVENT_CLICK, this.close.bind(this, params.status));
	}

	/**
	 * @param {Simple.Input} params
	 * @param {Layer=} opt_layer
	 * @return {Simple}
	 */
	static open(params, opt_layer) {
		const popup = new Simple(params);
		(opt_layer || app).showChildLayerInstance(popup);

		return popup;
	}

	/**
	 * @param {Simple.Input} params
	 * @param {Layer=} opt_layer
	 * @param {StatusHandler=} opt_statusHandler
	 * @return {IThenable}
	 */
	static asPromise(params, opt_layer, opt_statusHandler) {
		const popup = Simple.open(params, opt_layer);

		return popup.toPromise(opt_statusHandler);
	}

	/**
	 * @param {string} title
	 * @param {string=} opt_message
	 * @param {string=} opt_title
	 * @param {Layer=} opt_layer
	 * @return {IThenable}
	 */
	static alert(title, opt_message, opt_title, opt_layer) {
		/** @type {Simple.Input} */
		const params = {
			title,
			message: opt_message || '',
			buttons: [{
				title: opt_title || ButtonType.ALERT,
				status: Status.SUCCEEDED
			}]
		};

		return Simple.asPromise(params, opt_layer);
	}

	/**
	 * @param {string} title
	 * @param {string=} opt_message
	 * @param {string=} opt_yesTitle
	 * @param {string=} opt_noTitle
	 * @param {Layer=} opt_layer
	 * @return {IThenable}
	 */
	static confirm(title, opt_message, opt_yesTitle, opt_noTitle, opt_layer) {
		/** @type {Simple.Input} */
		const params = {
			title,
			message: opt_message || '',
			modifier: 'confirm',
			buttons: [{
				title: opt_yesTitle || ButtonType.CONFIRM_YES,
				status: Status.SUCCEEDED
			}, {
				title: opt_noTitle || ButtonType.CONFIRM_NO,
				status: Status.CANCELLED
			}]
		};

		return Simple.asPromise(params, opt_layer);
	}

	/**
	 * @param {string} title
	 * @param {string=} opt_message
	 * @param {Array<Button>=} opt_buttons
	 * @param {string=} opt_modifier
	 * @param {Layer=} opt_layer
	 * @return {IThenable}
	 */
	static select(title, opt_message, opt_buttons, opt_modifier, opt_layer) {
		const commonTitle = 'Button';
		const buttons = [];

		for (let i = 0; i < 6; i++) {
			buttons.push({
				title: commonTitle,
				status: i
			});
		}

		/** @type {Simple.Input} */
		const params = {
			title,
			message: opt_message || '',
			modifier: opt_modifier || 'select',
			buttons
		};

		return Simple.asPromise(params, opt_layer);
	}
}


/**
 * @typedef {{
 *     title: string,
 *     status: Status
 * }}
 */
Simple.Button;


/**
 * @typedef {{
 *     title: string,
 *     message: (string|undefined),
 *     modifier: (string|undefined),
 *     buttons: Array<Simple.Button>
 * }}
 */
Simple.Input;


/**
 * @enum {string}
 */
export const ButtonType = {
	ALERT: 'Back',
	CONFIRM_YES: 'Ok',
	CONFIRM_NO: 'Cancel'
};
