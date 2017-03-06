goog.provide('demo.widgets.Button');
goog.require('demo.widgets.templates.button.ButtonOut');
goog.require('demo.widgets.templates.button.button');
goog.require('zb.html');
goog.require('zb.ui.Button');


demo.widgets.Button = class extends zb.ui.Button {
	/**
	 * @param {demo.widgets.Button.Input=} opt_params
	 */
	constructor(opt_params) {
		const exp = demo.widgets.templates.button.button();
		const container = zb.html.findFirstElementNode(exp.root);

		let data;
		if (opt_params && opt_params.data) {
			data = opt_params.data;
		}

		super(container, data);

		/**
		 * @type {demo.widgets.templates.button.ButtonOut}
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
		zb.html.text(this._exported.title, title);
	}


	/**
	 * @param {string} modifier
	 */
	setModifier(modifier) {
		zb.html.updateClassName(this.getContainer(), `_${modifier}`, true);
	}
};


/**
 * @typedef {{
 *     title: (string|undefined),
 *     modifier: (string|undefined),
 *     data: (*|undefined),
 * }}
 */
demo.widgets.Button.Input;
