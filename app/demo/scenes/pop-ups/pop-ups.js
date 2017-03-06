goog.provide('demo.scenes.PopUps');
goog.require('demo.popups.Simple');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.popUps.PopUpsOut');
goog.require('demo.scenes.templates.popUps.popUps');


demo.scenes.PopUps = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-pop-ups');

		/**
		 * @type {demo.scenes.templates.popUps.PopUpsOut}
		 * @protected
		 */
		this._exported;

		this._exported.alertBtn.setTitle('Alert');
		this._exported.alertBtn.onClick(() => {
			demo.popups.Simple.alert('Alert pop-up', 'Alert text');
		});

		this._exported.confirmBtn.setTitle('Confirm');
		this._exported.confirmBtn.onClick(() => {
			demo.popups.Simple.confirm('Confirm pop-up', 'Confirm text');
		});

		this._exported.selectBtn.setTitle('Select');
		this._exported.selectBtn.onClick(() => {
			demo.popups.Simple.select('Select pop-up');
		});
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.popUps.popUps(this._getTemplateData(), this._getTemplateOptions());
	}
};
