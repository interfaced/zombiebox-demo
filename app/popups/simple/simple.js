import {updateClassName, text} from 'zb/html';
import {Status, StatusHandler} from 'ui/popups/abstract-base/abstract-base';
import Layer from 'zb/layers/layer';
import AbstractApplication from 'zb/abstract-application';
import {Out, render} from 'generated/cutejs/demo/popups/simple/simple.jst';
import app from 'generated/app';
import AbstractBase from '../base/base';
import Button from '../../widgets/button/button';

/* eslint-disable default-param-last */


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
	 * @param {(AbstractApplication|Layer)=} layer
	 * @return {Simple}
	 */
	static open(params, layer = app) {
		const popup = new Simple(params);
		layer.showChildLayerInstance(popup);

		return popup;
	}

	/**
	 * @param {Simple.Input} params
	 * @param {Layer=} layer
	 * @param {StatusHandler=} statusHandler
	 * @return {Promise}
	 */
	static asPromise(params, layer, statusHandler) {
		const popup = Simple.open(params, layer);

		return popup.toPromise(statusHandler);
	}

	/**
	 * @param {string} title
	 * @param {string=} message
	 * @param {string=} buttonTitle
	 * @param {Layer=} layer
	 * @return {Promise}
	 */
	static alert(title, message = '', buttonTitle = ButtonType.ALERT, layer) {
		/** @type {Simple.Input} */
		const params = {
			title,
			message,
			buttons: [{
				title: buttonTitle,
				status: Status.SUCCEEDED
			}]
		};

		return Simple.asPromise(params, layer);
	}

	/**
	 * @param {string} title
	 * @param {string=} message
	 * @param {string=} yesTitle
	 * @param {string=} noTitle
	 * @param {Layer=} layer
	 * @return {Promise}
	 */
	static confirm(title, message = '', yesTitle = ButtonType.CONFIRM_YES, noTitle = ButtonType.CONFIRM_NO, layer) {
		/** @type {Simple.Input} */
		const params = {
			title,
			message,
			modifier: 'confirm',
			buttons: [{
				title: yesTitle,
				status: Status.SUCCEEDED
			}, {
				title: noTitle,
				status: Status.CANCELLED
			}]
		};

		return Simple.asPromise(params, layer);
	}

	/**
	 * @param {string} title
	 * @param {string=} message
	 * @param {Array<Button>=} unusedButtons
	 * @param {string=} modifier
	 * @param {Layer=} layer
	 * @return {Promise}
	 */
	static select(title, message = '', unusedButtons, modifier = 'select', layer) {
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
			message,
			modifier,
			buttons
		};

		return Simple.asPromise(params, layer);
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
