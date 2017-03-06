goog.provide('demo.widgets.ScrollText');
goog.require('zb.ui.ScrollText');


demo.widgets.ScrollText = class extends zb.ui.ScrollText {
	/**
	 * @param {HTMLElement} container
	 */
	constructor(container) {
		super(container);


		/**
		 * @type {?HTMLElement}
		 * @protected
		 */
		this._shadow;
	}


	/**
	 * @param {HTMLElement} slider
	 * @param {zb.ui.ScrollBar=} opt_bar
	 * @param {HTMLElement=} opt_shadow
	 * @override
	 */
	setNodes(slider, opt_bar, opt_shadow) {
		this._shadow = opt_shadow || null;

		super.setNodes(slider, opt_bar);
	}


	/**
	 * @override
	 */
	_setPosition(position) {
		super._setPosition(position);

		const opacity = 1 - (position / this._diff);
		this._updateShadowOpacity(opacity);
	}


	/**
	 * @param {number} opacity
	 * @protected
	 */
	_updateShadowOpacity(opacity) {
		if (!isNaN(opacity)) {
			if (opacity > 0.5) {
				this._shadow.style.opacity = 1;
			} else if (opacity < 0.5 && opacity > 0.1) {
				this._shadow.style.opacity = opacity + 0.5;
			} else {
				this._shadow.style.opacity = 0;
			}
		}
	}
};
