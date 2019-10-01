import UIScrollText from 'ui/widgets/scroll-text/scroll-text';
import ScrollBar from 'ui/widgets/scroll-bar/scroll-bar';


/**
 */
export default class ScrollText extends UIScrollText {
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
	 * @override
	 * @param {HTMLElement} slider
	 * @param {ScrollBar=} bar
	 * @param {HTMLElement=} shadow
	 */
	setNodes(slider, bar, shadow = null) {
		this._shadow = shadow;

		super.setNodes(slider, bar);
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
}
