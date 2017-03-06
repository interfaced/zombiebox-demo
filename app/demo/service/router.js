goog.provide('demo.service.Router');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.ArrowList');
goog.require('demo.scenes.CustomInput');
goog.require('demo.scenes.CustomInputExtended');
goog.require('demo.scenes.ListDynamic');
goog.require('demo.scenes.ListMatrix');
goog.require('demo.scenes.ListStatic');
goog.require('demo.scenes.NativeInput');
goog.require('demo.scenes.Navigation');
goog.require('demo.scenes.NavigationCustom');
goog.require('demo.scenes.PopUps');
goog.require('demo.scenes.ScrollList');
goog.require('demo.scenes.ScrollText');
goog.require('demo.scenes.VideoPlayer');


demo.service.Router = class {
	/**
	 */
	constructor() {
		/**
		 * @type {demo.scenes.ArrowList} :inject
		 */
		this.sceneArrowList;

		/**
		 * @type {demo.scenes.CustomInput} :inject
		 */
		this.sceneCustomInput;

		/**
		 * @type {demo.scenes.CustomInputExtended} :inject
		 */
		this.sceneCustomInputExtended;

		/**
		 * @type {demo.scenes.ListDynamic} :inject
		 */
		this.sceneListDynamic;

		/**
		 * @type {demo.scenes.ListMatrix} :inject
		 */
		this.sceneListMatrix;

		/**
		 * @type {demo.scenes.ListStatic} :inject
		 */
		this.sceneListStatic;

		/**
		 * @type {demo.scenes.NativeInput} :inject
		 */
		this.sceneNativeInput;

		/**
		 * @type {demo.scenes.Navigation} :inject
		 */
		this.sceneNavigation;

		/**
		 * @type {demo.scenes.NavigationCustom} :inject
		 */
		this.sceneNavigationCustom;

		/**
		 * @type {demo.scenes.PopUps} :inject
		 */
		this.scenePopUps;

		/**
		 * @type {demo.scenes.ScrollList} :inject
		 */
		this.sceneScrollList;

		/**
		 * @type {demo.scenes.ScrollText} :inject
		 */
		this.sceneScrollText;

		/**
		 * @type {demo.scenes.VideoPlayer} :inject
		 */
		this.sceneVideoPlayer;
	}

	/**
	 * @param {string} sceneName
	 * @param {{
	 *      id: number,
	 *      subItem: ?number
	 * }} activeSceneParams
	 * @return {IThenable}
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
	 * @return {demo.scenes.AbstractBase}
	 */
	getSceneByName(sceneName) {
		return {
			'arrow-list': this.sceneArrowList,
			'custom-input': this.sceneCustomInput,
			'custom-input-extended': this.sceneCustomInputExtended,
			'list-dynamic': this.sceneListDynamic,
			'list-matrix': this.sceneListMatrix,
			'list-static': this.sceneListStatic,
			'native-input': this.sceneNativeInput,
			'navigation': this.sceneNavigation,
			'navigation-custom': this.sceneNavigationCustom,
			'pop-ups': this.scenePopUps,
			'scroll-list': this.sceneScrollList,
			'scroll-text': this.sceneScrollText,
			'video-player': this.sceneVideoPlayer
		}[sceneName];
	}
};
