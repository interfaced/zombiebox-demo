goog.provide('demo.scenes.ScrollText');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.scrollText.ScrollTextOut');
goog.require('demo.scenes.templates.scrollText.scrollText');


demo.scenes.ScrollText = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-scroll-text');

		/**
		 * @type {demo.scenes.templates.scrollText.ScrollTextOut}
		 * @protected
		 */
		this._exported;

		const exp = this._exported;
		exp.scroll.setNodes(exp.slider, exp.scrollBar, exp.shadow);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.scrollText.scrollText(this._getTemplateData(), this._getTemplateOptions());
	}
};
