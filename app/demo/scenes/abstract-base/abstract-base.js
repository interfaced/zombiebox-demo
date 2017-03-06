goog.provide('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.abstractBase.AbstractBaseOut');
goog.require('demo.scenes.templates.abstractBase.abstractBase');
goog.require('demo.widgets.Menu');
goog.require('demo.widgets.helpBarItemFactory');
goog.require('zb.layers.CuteScene');
goog.require('zb.std.plain.Direction');
goog.require('zb.ui.HelpBar');
goog.require('zb.ui.IHelpBarItem');


demo.scenes.AbstractBase = class extends zb.layers.CuteScene {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {zb.ui.HelpBar}
		 * @protected
		 */
		this._helpBar;

		/**
		 * @type {?demo.widgets.Menu}
		 * @protected
		 */
		this._menu;

		/**
		 * @type {demo.scenes.templates.abstractBase.AbstractBaseOut}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-abstract-base');

		this._createHelpBar();
		this._createMenu();
		this.setDefaultWidget(this._menu);
	}


	/**
	 * @param {{
	 *      id: number,
	 *      subItem: ?number
	 * }} data
	 */
	setActiveSceneId(data) {
		this._menu.activateItemByID(data);
	}


	/** @override */
	processKey(zbKey, e) {
		if (!super.processKey(zbKey, e)) {
			return this._helpBar.processHelpBarKey(zbKey, e);
		}

		return true;
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.abstractBase.abstractBase(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @protected
	 */
	_createHelpBar() {
		this._helpBar = new zb.ui.HelpBar();
		this._helpBar.setItems(this._getHelpBarItems());

		const helpBarParent = this._getHelpBarParent();
		helpBarParent.appendChild(this._helpBar.getContainer());
		this.appendWidget(this._helpBar);
	}


	/**
	 * @return {HTMLElement}
	 * @protected
	 */
	_getHelpBarParent() {
		return this._container;
	}


	/**
	 * @private
	 */
	_createMenu() {
		this._menu = new demo.widgets.Menu({
			menu: demo.scenes.AbstractBase.Menu
		});
		this._container.appendChild(this._menu.getContainer());
		this.appendWidget(this._menu);

		this.setNavigationRule(this._menu, zb.std.plain.Direction.Value.UP, null);
		app.on(app.EVENT_MENU_TOGGLE, (event, object) => {
			this._menu.setMenuSection(object);
		});
	}


	/**
	 * @return {Array.<zb.ui.IHelpBarItem>}
	 * @protected
	 */
	_getHelpBarItems() {
		return [
			demo.widgets.helpBarItemFactory.back()
		];
	}
};


/**
 * @typedef {Object}
 */
demo.scenes.AbstractBase.Menu = {
	videoPlayer: {
		title: 'Videoplayer',
		scene: 'video-player'
	},
	inputs: {
		title: 'Inputs',
		subItems: [{
			title: 'Native',
			scene: 'native-input'
		}, {
			title: 'Custom',
			scene: 'custom-input'
		}, {
			title: 'Custom-extended',
			scene: 'custom-input-extended'
		}]
	},
	navigation: {
		title: 'Navigation',
		subItems: [{
			title: 'Regular',
			scene: 'navigation'
		}, {
			title: 'Custom',
			scene: 'navigation-custom'
		}]
	},
	baseList: {
		title: 'Base-list',
		subItems: [{
			title: 'Static',
			scene: 'list-static'
		}, {
			title: 'Dynamic',
			scene: 'list-dynamic'
		}, {
			title: 'Matrix',
			scene: 'list-matrix'
		}]
	},
	arrowList: {
		title: 'Arrow-list',
		scene: 'arrow-list'
	},
	scrollList: {
		title: 'Scroll-list',
		scene: 'scroll-list'
	},
	scrollText: {
		title: 'Scroll-text',
		scene: 'scroll-text'
	},
	popups: {
		title: 'Pop-ups',
		scene: 'pop-ups'
	}
};
