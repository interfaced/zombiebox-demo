goog.provide('demo.widgets.Throbber');
goog.require('zb.html');
goog.require('zb.ui.Throbber');


demo.widgets.Throbber = class extends zb.ui.Throbber {
	/**
	 */
	constructor() {
		const params = {
			step: 58,
			width: 1392,
			stepInterval: NaN
		};

		super(zb.html.div('w-throbber'), params);
		this.setTheme(this.THEME_NONE);
	}


	/**
	 * @override
	 */
	isFocusable() {
		return false;
	}
};
