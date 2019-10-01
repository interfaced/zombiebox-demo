import app from 'generated/app';
import {AbstractBase} from '../scenes/abstract-base/abstract-base';
import ListArrow from '../scenes/list-arrow/list-arrow';
import CustomInput from '../scenes/custom-input/custom-input';
import CustomInputExtended from '../scenes/custom-input-extended/custom-input-extended';
import ListDynamic from '../scenes/list-dynamic/list-dynamic';
import ListMatrix from '../scenes/list-matrix/list-matrix';
import ListStatic from '../scenes/list-static/list-static';
import {NativeInput} from '../scenes/native-input/native-input';
import Navigation from '../scenes/navigation/navigation';
import NavigationCustom from '../scenes/navigation-custom/navigation-custom';
import PopUps from '../scenes/pop-ups/pop-ups';
import ListScroll from '../scenes/list-scroll/list-scroll';
import ScrollText from '../scenes/scroll-text/scroll-text';
import {VideoPlayer} from '../scenes/video-player/video-player';


/**
 */
export default class Router {
	/**
	 */
	constructor() {
		/**
		 * @type {ListArrow} :inject
		 */
		this.sceneArrowList;

		/**
		 * @type {CustomInput} :inject
		 */
		this.sceneCustomInput;

		/**
		 * @type {CustomInputExtended} :inject
		 */
		this.sceneCustomInputExtended;

		/**
		 * @type {ListDynamic} :inject
		 */
		this.sceneListDynamic;

		/**
		 * @type {ListMatrix} :inject
		 */
		this.sceneListMatrix;

		/**
		 * @type {ListStatic} :inject
		 */
		this.sceneListStatic;

		/**
		 * @type {NativeInput} :inject
		 */
		this.sceneNativeInput;

		/**
		 * @type {Navigation} :inject
		 */
		this.sceneNavigation;

		/**
		 * @type {NavigationCustom} :inject
		 */
		this.sceneNavigationCustom;

		/**
		 * @type {PopUps} :inject
		 */
		this.scenePopUps;

		/**
		 * @type {ListScroll} :inject
		 */
		this.sceneScrollList;

		/**
		 * @type {ScrollText} :inject
		 */
		this.sceneScrollText;

		/**
		 * @type {VideoPlayer} :inject
		 */
		this.sceneVideoPlayer;
	}

	/**
	 * @param {string} sceneName
	 * @param {{
	 *     id: number,
	 *     subItem: ?number
	 * }} activeSceneParams
	 * @return {Promise}
	 */
	show(sceneName, activeSceneParams) {
		const scene = this.getSceneByName(sceneName);

		return app.getSceneOpener()
			.open(scene, () => {
				scene.setActiveSceneId(activeSceneParams);
			});
	}

	/**
	 * @param {string} sceneName
	 * @return {AbstractBase}
	 */
	getSceneByName(sceneName) {
		return {
			'custom-input': this.sceneCustomInput,
			'custom-input-extended': this.sceneCustomInputExtended,
			'list-arrow': this.sceneArrowList,
			'list-dynamic': this.sceneListDynamic,
			'list-matrix': this.sceneListMatrix,
			'list-static': this.sceneListStatic,
			'list-scroll': this.sceneScrollList,
			'native-input': this.sceneNativeInput,
			'navigation': this.sceneNavigation,
			'navigation-custom': this.sceneNavigationCustom,
			'pop-ups': this.scenePopUps,
			'scroll-text': this.sceneScrollText,
			'video-player': this.sceneVideoPlayer
		}[sceneName];
	}
}
