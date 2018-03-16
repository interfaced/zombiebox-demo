goog.provide('demo.scenes.VideoPlayer');
goog.require('demo.scenes.AbstractBase');
goog.require('demo.scenes.templates.videoPlayer.VideoPlayerOut');
goog.require('demo.scenes.templates.videoPlayer.videoPlayer');
goog.require('demo.widgets.helpBarItemFactory');
goog.require('zb.Timeout');
goog.require('zb.device.IVideo');
goog.require('zb.device.input.Keys');
goog.require('zb.device.platforms.dune.Device');
goog.require('zb.html');
goog.require('zb.std.plain.Direction');


demo.scenes.VideoPlayer = class extends demo.scenes.AbstractBase {
	/**
	 */
	constructor() {
		super();
		/**
		 * @type {demo.scenes.templates.videoPlayer.VideoPlayerOut}
		 * @protected
		 */
		this._exported;


		/**
		 * @type {?zb.device.IVideo}
		 * @private
		 */
		this._player = null;


		/**
		 * @type {Array.<string>}
		 * @protected
		 */
		this._urls = [
			'http://vs.ifaced.ru/streams/bbb/bbb.mp4',
			'http://vs.ifaced.ru/streams/ed/ed-360.mp4'
		].map((url) => app.isDevicePc() ? url.replace(/mp4$/, 'webm') : url);


		/**
		 * @type {number}
		 * @protected
		 */
		this._playingIndex = 0;


		/**
		 * @type {zb.Timeout}
		 * @private
		 */
		this._osdTimer = new zb.Timeout(this._hideOsd.bind(this), demo.scenes.VideoPlayer.OSD_SHOW_TIME);


		/**
		 * @type {boolean}
		 * @private
		 */
		this._isOsdVisible = false;

		this._addContainerClass('s-video-player');
		const exp = this._exported;

		exp.fullscreen.onClick(this._fullscreen.bind(this));
		exp.rew.onClick(this._rewind.bind(this));
		exp.ff.onClick(this._fastForward.bind(this));
		this._createPlayer();

		this._toggleHelpBarButtonsState(false);
		this._container.addEventListener('click', this._showOsd.bind(this), false);
	}


	/**
	 * @override
	 */
	beforeDOMShow() {
		super.beforeDOMShow();

		this._disableControls();

		if (app.device.hasOSDChromaKeyFeature() && !app.device.hasOSDAlphaBlendingFeature()) {
			app.device.setOSDChromaKey('#000001');
		}

		const url = this._urls[this._playingIndex];
		this._playURL(url);
	}


	/**
	 * @override
	 */
	beforeDOMHide() {
		if (app.device.hasOSDChromaKeyFeature() && !app.device.hasOSDAlphaBlendingFeature()) {
			app.device.removeOSDChromaKey();
		}
		super.beforeDOMHide();
	}


	/**
	 * @override
	 */
	afterDOMHide() {
		super.afterDOMHide();

		if (this._player) {
			this._player.stop();
			app.hideVideo();
			zb.html.hide(this._exported.playerControls);
		}
		zb.html.updateClassName(this.getContainer(), '_full-screen', false);
	}


	/**
	 * @override
	 */
	processKey(zbKey, e) {
		const keys = zb.device.input.Keys;

		this._showOsd();

		switch (zbKey) {
			case keys.PLAY:
				this._play();

				return true;
			case keys.PAUSE:
				this._pause();

				return true;
			case keys.REW:
				this._rewind();

				return true;
			case keys.FWD:
				this._fastForward();

				return true;
			case keys.PLAY_PAUSE:
				this._togglePlayPause();

				return true;
		}

		return super.processKey(zbKey, e);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return demo.scenes.templates.videoPlayer.videoPlayer(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @override
	 */
	_getHelpBarItems() {
		return [
			demo.widgets.helpBarItemFactory.play(this._play.bind(this)),
			demo.widgets.helpBarItemFactory.pause(this._pause.bind(this)),
			demo.widgets.helpBarItemFactory.back()
		];
	}


	/**
	 * @param {string} url
	 * @private
	 */
	_playURL(url) {
		this._player.play(url);
	}


	/**
	 * @private
	 */
	_play() {
		this._player.setPlaybackRate(1);
		this._player.resume();
	}


	/**
	 * @private
	 */
	_pause() {
		this._player.pause();
	}


	/**
	 * @private
	 */
	_togglePlayPause() {
		switch (this._player.getState()) {
			case zb.device.IVideo.State.PAUSED:
			case zb.device.IVideo.State.STOPPED:
				this._play();
				break;
			case zb.device.IVideo.State.PLAYING:
				this._pause();
				break;
		}
	}


	/**
	 * @private
	 */
	_fastForward() {
		if (this._player.getViewport().isFullScreen()) {
			const step = 15 * 1000;
			let position = this._player.getPosition();
			const duration = this._player.getDuration();
			const max = duration - 1000;

			position = position + step;

			if (position > max) {
				position = max;
			}

			this._player.setPosition(position);
		}
	}


	/**
	 * @private
	 */
	_fullscreen() {
		const viewport = this._player.getViewport();
		const isDisplayFullScreen = this._player.getViewport().isFullScreen();

		if (!isDisplayFullScreen) {
			this._enableControls();
		} else {
			this._disableControls();
		}

		viewport.setFullScreen(!isDisplayFullScreen);
		this._showOsd();
		zb.html.updateClassName(this.getContainer(), '_full-screen', !isDisplayFullScreen);
	}


	/**
	 * @private
	 */
	_rewind() {
		if (this._player.getViewport().isFullScreen()) {
			const step = 15 * 1000;
			let position = this._player.getPosition();
			position = position - step;

			if (position < 0) {
				position = 0;
			}

			this._player.setPosition(position);
		}
	}


	/**
	 * @protected
	 */
	_disableControls() {
		const exp = this._exported;

		exp.rew.disable();
		exp.ff.disable();
		this.setNavigationRule(exp.playPause, zb.std.plain.Direction.Value.RIGHT, exp.fullscreen, true);

		zb.html.updateClassName(exp.playerProgress.getContainer(), '_disabled', true);
		zb.html.updateClassName(exp.rew.getContainer(), '_disabled', true);
		zb.html.updateClassName(exp.ff.getContainer(), '_disabled', true);
	}


	/**
	 * @protected
	 */
	_enableControls() {
		const exp = this._exported;

		exp.rew.enable();
		exp.ff.enable();
		this.setNavigationRule(exp.playPause, zb.std.plain.Direction.Value.RIGHT, exp.ff, true);
		this.setNavigationRule(exp.fullscreen, zb.std.plain.Direction.Value.LEFT, exp.ff, true);
		zb.html.updateClassName(exp.playerProgress.getContainer(), '_disabled', false);
		zb.html.updateClassName(exp.rew.getContainer(), '_disabled', false);
		zb.html.updateClassName(exp.ff.getContainer(), '_disabled', false);
	}


	/**
	 * @private
	 */
	_createPlayer() {
		this._player = app.device.createVideo();
		const viewport = this._player.getViewport();
		viewport.setArea({
			x: demo.scenes.VideoPlayer.displayArea.x,
			y: demo.scenes.VideoPlayer.displayArea.y,
			width: demo.scenes.VideoPlayer.displayArea.width,
			height: demo.scenes.VideoPlayer.displayArea.height
		});

		if (app.isDeviceDune()) {
			app.device.setOSDOpacity(1);
		}

		this._player.on(this._player.EVENT_BUFFERING, this._onBuffering.bind(this));
		this._player.on(this._player.EVENT_PLAY, this._onPlay.bind(this));
		this._player.on(this._player.EVENT_PAUSE, this._onPause.bind(this));
		this._player.on(this._player.EVENT_ENDED, this._onEnded.bind(this));
		this._player.on(this._player.EVENT_ERROR, this._onError.bind(this));
		this._player.on(this._player.EVENT_STOP, this._onStop.bind(this));

		this._exported.playPause.setPlayer(this._player);
		this._exported.playerProgress.setPlayer(this._player);
	}


	/**
	 * @private
	 */
	_onBuffering() {
		this._showThrobber();
	}


	/**
	 * @private
	 */
	_showThrobber() {
		const trobberJob = new Promise((resolve) => {
			this._player.once(this._player.EVENT_STATE_CHANGE, resolve);
		});

		app.addTrobberJob(trobberJob);
	}


	/**
	 * @private
	 */
	_onPlay() {
		app.showVideo();
		this._showOsd();
		zb.html.show(this._exported.playerControls);

		this._toggleHelpBarButtonsState(true);
	}


	/**
	 * @private
	 */
	_onPause() {
		this._showOsd();
		this._toggleHelpBarButtonsState(false);
	}


	/**
	 * @param {boolean} status
	 * @private
	 */
	_toggleHelpBarButtonsState(status) {
		const pause = this._helpBar.getItem(zb.device.input.Keys.PAUSE);
		const play = this._helpBar.getItem(zb.device.input.Keys.PLAY);

		if (status) {
			play.hide();
			pause.show();
		} else {
			play.show();
			pause.hide();
		}

		if (play.isFocused() || pause.isFocused()) {
			const btn = status ? pause : play;
			this._helpBar.activateWidget(btn);
		}
	}


	/**
	 * @private
	 */
	_onEnded() {
		let url = this._urls[++this._playingIndex];

		if (!url) {
			this._playingIndex = 0;
			url = this._urls[this._playingIndex];
		}

		this._playURL(url);
	}


	/**
	 * @param {string} eventName
	 * @param {string} errorMessage
	 * @private
	 */
	_onError(eventName, errorMessage) {
		zb.console.error('Video error:' + errorMessage);
	}


	/**
	 * @private
	 */
	_onStop() {
		this._showOsd();
	}


	/**
	 * @private
	 */
	_showOsd() {
		const inactiveStates = [zb.device.IVideo.State.PAUSED, zb.device.IVideo.State.STOPPED];

		if (inactiveStates.includes(this._player.getState())) {
			this._osdTimer.stop();
		} else {
			this._osdTimer.restart();
		}

		this._setOsdVisible(true);
	}


	/**
	 * @param {boolean} isVisible
	 * @private
	 */
	_setOsdVisible(isVisible) {
		this._isOsdVisible = isVisible;
		zb.html.updateClassName(this._container, '_osd', isVisible);
	}


	/**
	 * @private
	 */
	_hideOsd() {
		this._osdTimer.stop();
		this._setOsdVisible(false);
	}
};


/**
 * @typedef {{
 *    x: number,
 *    y: number,
 *    width: number,
 *    height: number
 * }}
 */
demo.scenes.VideoPlayer.displayArea = {
	x: 411,
	y: 93,
	width: 786,
	height: 442
};


/**
 * @const {number}
 */
demo.scenes.VideoPlayer.OSD_SHOW_TIME = 3 * 1000;
