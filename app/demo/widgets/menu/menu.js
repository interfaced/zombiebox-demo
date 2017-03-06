goog.provide('demo.widgets.Menu');
goog.require('demo.widgets.MenuItem');
goog.require('demo.widgets.templates.menu.MenuOut');
goog.require('demo.widgets.templates.menu.menu');
goog.require('zb.widgets.CuteWidget');


demo.widgets.Menu = class extends zb.widgets.CuteWidget {
	/**
	 * @param {{menu: Object}} params
	 */
	constructor(params) {
		super();


		/**
		 * @type {?number}
		 * @protected
		 */
		this._menuItemId;


		/**
		 * @type {demo.widgets.templates.menu.MenuOut}
		 * @protected
		 */
		this._exported;


		/**
		 * @type {Array.<demo.widgets.MenuItem>}
		 * @protected
		 */
		this._menuItems;

		this._generateMenu(params.menu || {});
	}


	/**
	 * @param {number} id
	 * @return {?demo.widgets.MenuItem}
	 */
	getItemById(id) {
		return this._menuItems[id];
	}


	/**
	 * @param {{
	 *      id: number,
	 *      subItem: ?number
	 * }} input
	 */
	activateItemByID(input) {
		const id = input.id;
		const subId = input.subItem;
		let item;

		if (subId != null) {
			item = this.getItemById(subId);
		} else {
			item = this.getItemById(id);
		}

		item.setSelected(true);
		this.activateWidget(item);
	}


	/**
	 * @param {{
 *      id: number,
 *      status: boolean
 *   }} param
	 */
	setMenuSection(param) {
		if (this._menuItemId != null) {
			this._hideSubItems(this._menuItemId);
		}

		if (!param.status) {
			this._menuItemId = param.id;
			this._showSubItems(this._menuItemId);
		} else {
			this._menuItemId = null;
		}
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.widgets.templates.menu.menu(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @param {Object} menu
	 * @protected
	 */
	_generateMenu(menu) {
		this._menuItemId = null;
		this._menuItems = [];

		for (const prop in menu) {
			if (!menu.hasOwnProperty(prop)) {
				continue;
			}

			const item = menu[prop];
			item.id = this._menuItems.length;
			item.parentItem = null;
			this._generateMenuItem(item);

			if (item.subItems) {
				const subItemsCount = item.subItems.length;
				item.subItems.forEach((subitem, i) => {
					subitem.id = this._menuItems.length;
					subitem.parentItem = item.id;

					let modifier = '';
					if (i === 0) {
						modifier = '_first-child';
					} else if (i + 1 === subItemsCount) {
						modifier = '_last-child';
					}
					subitem.modifier = modifier;

					this._generateMenuItem(subitem);
				});
			}
		}

		this._initMenuSections();
	}


	/**
	 * @param {demo.widgets.MenuItem.Input} item
	 * @protected
	 */
	_generateMenuItem(item) {
		const menuItem = new demo.widgets.MenuItem({
			id: item.id,
			title: item.title,
			scene: item.scene,
			parentItem: item.parentItem,
			subItems: item.subItems,
			modifier: item.modifier
		});
		this._menuItems.push(menuItem);
		this.appendWidget(menuItem);
		this._exported.buttons.appendChild(menuItem.getContainer());
	}


	/**
	 * @protected
	 */
	_initMenuSections() {
		this._menuItemId = null;

		this._menuItems.forEach((item) => {
			const data = item.getData();
			if (data.subItems != null) {
				this._hideSubItems(data.id);
			}
		});

		this._updateScrollView();
	}


	/**
	 * @param {number} id
	 * @protected
	 */
	_showSubItems(id) {
		const item = this.getItemById(id);
		const isCollapsed = false;
		item.setCollapsed(isCollapsed);

		item.getSubItems()
			.forEach((subItem) => {
				const widget = this.getItemById(subItem.id);

				widget.show();
				widget.setUnfolded(!isCollapsed);
			});
	}


	/**
	 * @param {number} id
	 * @protected
	 */
	_hideSubItems(id) {
		const item = this.getItemById(id);
		const isCollapsed = true;
		item.setCollapsed(isCollapsed);

		item.getSubItems().forEach((subItem) => {
			const widget = this.getItemById(subItem.id);

			widget.hide();
			widget.setUnfolded(!isCollapsed);
		});
	}


	/**
	 * @protected
	 */
	_updateScrollView() {
		// todo add scroll functionality
		// todo temporary hide scroll bar

		this._exported.scrollBar.hide();
	}
};
