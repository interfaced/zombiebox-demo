goog.provide('demo.widgets.MenuItem');
goog.require('demo.widgets.templates.menuItem.MenuItemOut');
goog.require('demo.widgets.templates.menuItem.menuItem');
goog.require('zb.html');
goog.require('zb.ui.Button');


demo.widgets.MenuItem = class extends zb.ui.Button {
	/**
	 * @param {demo.widgets.MenuItem.Input} data
	 */
	constructor(data) {
		const exp = demo.widgets.templates.menuItem.menuItem();
		const container = zb.html.findFirstElementNode(exp.root);
		super(container, data);

		/**
		 * @type {boolean}
		 * @private
		 */
		this._isCollapsed = false;

		/**
		 * @type {demo.widgets.templates.menuItem.MenuItemOut}
		 * @protected
		 */
		this._exported = exp;

		/**
		 * @type {demo.widgets.MenuItem.Input}
		 * @protected
		 */
		this._data = data;

		/**
		 * @type {boolean}
		 * @private
		 */
		this._selected = false;

		if (data.modifier) {
			zb.html.updateClassName(this._container, data.modifier, true);
		}

		if (data.subItems != null) {
			this.setCollapsed(true);
			this.onClick(this._toggle.bind(this));
		} else {
			this.onClick(() => {
				let param = {};

				if (this._data.parentItem !== null) {
					param = {id: this._data.parentItem, subItem: this._data.id};
				} else {
					param = {id: this._data.id, subItem: null};
				}

				app.sc.serviceRouter.show(this._data.scene, param);
			});
		}

		zb.html.updateClassName(this.getContainer(), '_sub-item', this._data.parentItem !== null);

		this.setTitle(data.title);
	}


	/**
	 * @param {boolean} state
	 */
	setCollapsed(state) {
		this._isCollapsed = state;
		this.setUnfolded(!state);

		zb.html.updateClassName(this._exported.arrow, '_down', state);
		zb.html.updateClassName(this._exported.arrow, '_up', !state);
	}


	/**
	 * @return {number}
	 */
	getID() {
		return this._data.id;
	}


	/**
	 * @return {?Array.<demo.widgets.MenuItem.Input>}
	 */
	getSubItems() {
		return this._data.subItems;
	}


	/**
	 * @param {string} title
	 */
	setTitle(title) {
		zb.html.text(this._exported.title, title);
	}


	/**
	 * @param {boolean} state
	 */
	setSelected(state) {
		this._selected = state;
		zb.html.updateClassName(this.getContainer(), demo.widgets.MenuItem.SELECTED_CLASS, state);
	}


	/**
	 * @param {boolean} state
	 */
	setUnfolded(state) {
		zb.html.updateClassName(this.getContainer(), demo.widgets.MenuItem.UNFOLDED_CLASS, state);
	}


	/**
	 * @protected
	 */
	_toggle() {
		app._fireEvent(app.EVENT_MENU_TOGGLE, {id: this.getID(), status: !this._isCollapsed});
	}
};


/**
 * @const {string}
 */
demo.widgets.MenuItem.UNFOLDED_CLASS = '_unfolded';


/**
 * @const {string}
 */
demo.widgets.MenuItem.SELECTED_CLASS = '_selected';


/**
 * @typedef {{
 *    subItems: ?Array.<demo.widgets.MenuItem.Input>,
 *    parentItem: ?number,
 *    scene: string,
 *    title: string,
 *    id: number,
 *    modifier: (string|undefined)
 * }}
 */
demo.widgets.MenuItem.Input;
