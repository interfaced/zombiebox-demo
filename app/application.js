import {hide, show, div} from 'zb/html';
import {setLevel, Level} from 'zb/console/console';
import {Resolution, ResolutionInfo} from 'zb/device/resolutions';
import About from 'about/about';
import BaseApplication from 'generated/base-application';
import BaseServiceContainer from 'generated/dependency-injection/base-service-container';
import Throbber from './widgets/throbber/throbber';


/**
 */
export default class Application extends BaseApplication {
	/**
	 */
	constructor() {
		setLevel(Level.ALL);
		super();

		/**
		 * @type {BaseServiceContainer}
		 */
		this.sc;

		/**
		 * @type {?Throbber}
		 * @private
		 */
		this._throbber = null;

		/**
		 * Fired with: {{
		 *     id: number,
		 *     status: boolean
		 * }}
		 * @const {string}
		 */
		this.EVENT_MENU_TOGGLE = 'menu-toggle';
	}

	/**
	 * @override
	 */
	processKey(zbKey, e) {
		About.processKey(zbKey);

		return super.processKey(zbKey, e);
	}

	/**
	 * @override
	 */
	onReady() {
		super.onReady();

		this.sc = new BaseServiceContainer(this);
		this.sc.bootstrap();

		if (this.isDevicePc()) {
			this._body.appendChild(div('zb-body__pc-help'));
		}
	}

	/**
	 * @override
	 */
	onStart() {
		// login, splashscreen, timeout, etc.
		this.home();
	}

	/**
	 * @override
	 */
	home() {
		return this.getSceneOpener()
			.open(this.sc.scenesVideoPlayer, () => {
				this.sc.scenesVideoPlayer.setActiveSceneId({
					id: 0,
					subItem: null
				});
			});
	}

	/**
	 * @param {Promise} job
	 */
	addTrobberJob(job) {
		if (this._throbber) {
			this._throbber.wait(job);
		}
	}

	/**
	 * @override
	 */
	_backOnEmptyHistory() {
		this.device.exit();
	}

	/**
	 * @override
	 */
	_onDeviceReady(eventName, device) {
		super._onDeviceReady(eventName, device);
		this._createThrobber();
	}

	/**
	 * @override
	 */
	_appendScreenSizeClass() {
		// No super necessary
		const resolutionInfo = ResolutionInfo[Resolution.HD];
		this._appendViewportSize(resolutionInfo);
		this._body.classList.add('zb-hd');
	}

	/**
	 * @private
	 */
	_createThrobber() {
		const throbberWrap = div('a-throbber zb-fullscreen');

		this._throbber = new Throbber();
		throbberWrap.appendChild(this._throbber.getContainer());
		this._body.appendChild(throbberWrap);

		this._throbber.on(this._throbber.EVENT_START, () => {
			show(throbberWrap);
		});

		this._throbber.on(this._throbber.EVENT_STOP, () => {
			hide(throbberWrap);
		});
	}
}
