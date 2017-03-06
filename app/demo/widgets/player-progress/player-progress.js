goog.provide('demo.widgets.PlayerProgress');
goog.require('demo.widgets.templates.playerProgress.PlayerProgressOut');
goog.require('demo.widgets.templates.playerProgress.playerProgress');
goog.require('zb.ui.PlayerProgress');


demo.widgets.PlayerProgress = class extends zb.ui.PlayerProgress {
	/**
	 */
	constructor() {
		super();
		/**
		 * @type {demo.widgets.templates.playerProgress.PlayerProgressOut}
		 * @protected
		 */
		this._exported;
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.widgets.templates.playerProgress.playerProgress(
			this._getTemplateData(),
			this._getTemplateOptions()
		);
	}
};
