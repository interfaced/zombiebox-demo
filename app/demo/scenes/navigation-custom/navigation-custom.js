goog.provide('demo.scenes.NavigationCustom');
goog.require('demo.scenes.Navigation');
goog.require('demo.scenes.templates.navigation.NavigationOut');
goog.require('demo.scenes.templates.navigation.navigation');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');
goog.require('zb.widgets.IWidget');


demo.scenes.NavigationCustom = class extends demo.scenes.Navigation {
	/**
	 */
	constructor() {
		super();
		this._addContainerClass('s-navigation-custom');

		/**
		 * @type {demo.scenes.templates.navigation.NavigationOut}
		 * @protected
		 */
		this._exported;

		zb.html.text(this._exported.title, 'Custom navigation scheme');

		this._setUpNavigation();
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.navigation.navigation(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @protected
	 */
	_setUpNavigation() {
		const exp = this._exported;
		const navigationRules = [{
			widget: exp.box1x1,
			up: null,
			left: this._menu,
			right: exp.box1x2,
			down: exp.box2x1
		}, {
			widget: exp.box1x2,
			up: null,
			left: null,
			right: exp.box1x3,
			down: exp.box2x2
		}, {
			widget: exp.box1x3,
			up: null,
			left: null,
			right: null,
			down: exp.box2x4
		}, {
			widget: exp.box2x1,
			up: exp.box1x1,
			left: null,
			right: null,
			down: exp.box4x1
		}, {
			widget: exp.box2x2,
			up: exp.box1x2,
			left: null,
			right: exp.box2x3,
			down: exp.box3x1
		}, {
			widget: exp.box2x3,
			up: null,
			left: null,
			right: null,
			down: exp.box3x3
		}, {
			widget: exp.box2x4,
			up: null,
			left: exp.box2x3,
			right: null,
			down: null
		}, {
			widget: exp.box3x1,
			up: null,
			left: null,
			right: null,
			down: exp.box4x2
		}, {
			widget: exp.box3x2,
			up: exp.box2x2,
			left: null,
			right: null,
			down: exp.box4x3
		}, {
			widget: exp.box3x3,
			up: exp.box2x3,
			left: null,
			right: null,
			down: exp.box4x3
		}, {
			widget: exp.box4x1,
			up: exp.box2x1,
			left: null,
			right: null,
			down: null
		}, {
			widget: exp.box4x2,
			up: null,
			left: exp.box4x1,
			right: null,
			down: null
		}, {
			widget: exp.box4x3,
			up: null,
			left: exp.box3x2,
			right: null,
			down: null
		}];

		this.setDefaultWidget(exp.box1x1);

		navigationRules.forEach((rule) => {
			this._setUpRule(rule);
		});
	}


	/**
	 * @param {{
 *      widget: zb.widgets.IWidget,
 *      up: ?zb.widgets.IWidget,
 *      left: ?zb.widgets.IWidget,
 *      right: ?zb.widgets.IWidget,
 *      down: ?zb.widgets.IWidget
 * }} param
	 * @protected
	 */
	_setUpRule(param) {
		const widget = param.widget;

		this.setNavigationRule(widget, zb.std.plain.Direction.Value.UP, param.up);
		this.setNavigationRule(widget, zb.std.plain.Direction.Value.LEFT, param.left);
		this.setNavigationRule(widget, zb.std.plain.Direction.Value.RIGHT, param.right);
		this.setNavigationRule(widget, zb.std.plain.Direction.Value.DOWN, param.down);
	}
};
