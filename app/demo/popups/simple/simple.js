goog.provide('demo.popups.Simple');
goog.require('demo.popups.Base');
goog.require('demo.popups.templates.simple.SimpleOut');
goog.require('demo.popups.templates.simple.simple');
goog.require('demo.widgets.Button');
goog.require('zb.html');
goog.require('zb.layers.Layer');


demo.popups.Simple = class extends demo.popups.Base {
	/**
	 * @param {demo.popups.Simple.Input} params
	 */
	constructor(params) {
		super();

		/**
		 * @type {demo.popups.templates.simple.SimpleOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('p-simple');

		zb.html.text(this._exported.title, params.title);

		if (params.message) {
			zb.html.text(this._exported.message, params.message);
			zb.html.updateClassName(this.getContainer(), '_has-message', true);
		}

		if (params.modifier) {
			this.setModifier(params.modifier);
		}

		params.buttons.forEach(this._addButton.bind(this));
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.popups.templates.simple.simple(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @param {demo.popups.Simple.Button} params
	 * @private
	 */
	_addButton(params) {
		const button = new demo.widgets.Button({title: params.title});
		this.appendWidget(button);
		this._exported.buttonsContainer.appendChild(button.getContainer());

		button.on(button.EVENT_CLICK, this.close.bind(this, params.status));
	}


	/**
	 * @param {string} modifier
	 */
	setModifier(modifier) {
		zb.html.updateClassName(this.getContainer(), `_${modifier}`, true);
	}

	/**
	 * @param {demo.popups.Simple.Input} params
	 * @param {zb.layers.Layer=} opt_layer
	 * @return {demo.popups.Simple}
	 */
	static open(params, opt_layer) {
		const popup = new demo.popups.Simple(params);
		(opt_layer || app).showChildLayerInstance(popup);

		return popup;
	}


	/**
	 * @param {demo.popups.Simple.Input} params
	 * @param {zb.layers.Layer=} opt_layer
	 * @param {demo.popups.Base.StatusHandler=} opt_statusHandler
	 * @return {IThenable}
	 */
	static asPromise(params, opt_layer, opt_statusHandler) {
		const popup = demo.popups.Simple.open(params, opt_layer);

		return popup.toPromise(opt_statusHandler);
	}

	/**
	 * @param {string} title
	 * @param {string=} opt_message
	 * @param {string=} opt_title
	 * @param {zb.layers.Layer=} opt_layer
	 * @return {IThenable}
	 */
	static alert(title, opt_message, opt_title, opt_layer) {
		/** @type {demo.popups.Simple.Input} */
		const params = {
			title,
			message: opt_message || '',
			buttons: [{
				title: opt_title || demo.popups.Simple.Buttons.ALERT,
				status: demo.popups.Base.Status.SUCCEEDED
			}]
		};

		return demo.popups.Simple.asPromise(params, opt_layer);
	}


	/**
	 * @param {string} title
	 * @param {string=} opt_message
	 * @param {string=} opt_yesTitle
	 * @param {string=} opt_noTitle
	 * @param {zb.layers.Layer=} opt_layer
	 * @return {IThenable}
	 */
	static confirm(title, opt_message, opt_yesTitle, opt_noTitle, opt_layer) {
		/** @type {demo.popups.Simple.Input} */
		const params = {
			title,
			message: opt_message || '',
			modifier: 'confirm',
			buttons: [{
				title: opt_yesTitle || demo.popups.Simple.Buttons.CONFIRM_YES,
				status: demo.popups.Base.Status.SUCCEEDED
			}, {
				title: opt_noTitle || demo.popups.Simple.Buttons.CONFIRM_NO,
				status: demo.popups.Base.Status.CANCELLED
			}]
		};

		return demo.popups.Simple.asPromise(params, opt_layer);
	}


	/**
	 * @param {string} title
	 * @param {string=} opt_message
	 * @param {Array.<demo.widgets.Button>=} opt_buttons
	 * @param {string=} opt_modifier
	 * @param {zb.layers.Layer=} opt_layer
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

		/** @type {demo.popups.Simple.Input} */
		const params = {
			title,
			message: opt_message || '',
			modifier: opt_modifier || 'select',
			buttons
		};

		return demo.popups.Simple.asPromise(params, opt_layer);
	}
};


/**
 * @typedef {{
 *     title: string,
 *     status: demo.popups.Base.Status
 * }}
 */
demo.popups.Simple.Button;


/**
 * @typedef {{
 *     title: string,
 *     message: (string|undefined),
 *     modifier: (string|undefined),
 *     buttons: Array.<demo.popups.Simple.Button>
 * }}
 */
demo.popups.Simple.Input;


/**
 * @enum {string}
 */
demo.popups.Simple.Buttons = {
	ALERT: 'Back',
	CONFIRM_YES: 'Ok',
	CONFIRM_NO: 'Cancel'
};
