goog.provide('demo.scenes.Navigation');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.navigation.NavigationOut');
goog.require('demo.scenes.templates.navigation.navigation');
goog.require('zb.html');


demo.scenes.Navigation = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-navigation');

		/**
		 * @type {demo.scenes.templates.navigation.NavigationOut}
		 * @protected
		 */
		this._exported;

		zb.html.text(this._exported.title, 'Default navigation scheme');
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.navigation.navigation(this._getTemplateData(), this._getTemplateOptions());
	}
};
