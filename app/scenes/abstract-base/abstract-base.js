import AbstractCuteScene from 'cutejs/layers/abstract-scene';
import {Value} from 'zb/geometry/direction';
import HelpBar from 'ui/widgets/help-bar/help-bar';
import IHelpBarItem from 'ui/widgets/help-bar/i-help-bar-item';
import {Out, render} from 'generated/cutejs/demo/scenes/abstract-base/abstract-base.jst';
import app from 'generated/app';
import MenuWidget from '../../widgets/menu/menu';
import {back} from '../../widgets/help-bar-item-factory/help-bar-item-factory';


/**
 */
export class AbstractBase extends AbstractCuteScene {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {HelpBar}
		 * @protected
		 */
		this._helpBar;

		/**
		 * @type {?MenuWidget}
		 * @protected
		 */
		this._menu;

		/**
		 * @type {Out}
		 * @protected
		 */
		this._exported;

		this._addContainerClass('s-abstract-base');

		this._createHelpBar();
		this._createMenu();
		this.setDefaultWidget(this._menu);
	}

	/** @override */
	processKey(zbKey, e) {
		if (!super.processKey(zbKey, e)) {
			return this._helpBar.processHelpBarKey(zbKey, e);
		}

		return true;
	}

	/**
	 * @param {{
	 *     id: number,
	 *     subItem: ?number
	 * }} data
	 */
	setActiveSceneId(data) {
		this._menu.activateItemByID(data);
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @protected
	 */
	_createHelpBar() {
		this._helpBar = new HelpBar();
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
	 * @return {Array<IHelpBarItem>}
	 * @protected
	 */
	_getHelpBarItems() {
		return [
			back()
		];
	}

	/**
	 * @private
	 */
	_createMenu() {
		this._menu = new MenuWidget({
			menu: Menu
		});
		this._container.appendChild(this._menu.getContainer());
		this.appendWidget(this._menu);

		this.setNavigationRule(this._menu, Value.UP, null);
		app.on(app.EVENT_MENU_TOGGLE, (event, object) => {
			this._menu.setMenuSection(object);
		});
	}
}


/**
 * @typedef {Object}
 */
export const Menu = {
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
		title: 'Lists',
		subItems: [{
			title: 'Static',
			scene: 'list-static'
		}, {
			title: 'Dynamic',
			scene: 'list-dynamic'
		}, {
			title: 'Matrix',
			scene: 'list-matrix'
		}, {
			title: 'Arrow-list',
			scene: 'list-arrow'
		}, {
			title: 'Scroll-list',
			scene: 'list-scroll'
		}]
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
