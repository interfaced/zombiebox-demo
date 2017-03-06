goog.provide('demo.popups.Base');
goog.require('demo.popups.templates.BaseTemplateOut');
goog.require('demo.popups.templates.baseTemplate');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.layers.CutePopup');


/**
 * @abstract
 */
demo.popups.Base = class extends zb.layers.CutePopup {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {demo.popups.templates.BaseTemplateOut}
		 * @protected
		 */
		this._baseExported;

		const result = demo.popups.templates.baseTemplate();

		const nodes = Array.prototype.slice.call(this._container.childNodes, 0);
		zb.html.empty(this._container);
		this._container.appendChild(result.root);
		nodes.forEach((node) => {
			result.baseContainer.appendChild(node);
		});

		this._baseExported = result;
	}


	/**
	 * @param {demo.popups.Base.StatusHandler=} opt_statusHandler
	 * @return {IThenable}
	 */
	toPromise(opt_statusHandler) {
		return new Promise((resolve, reject) => {
			this.once(this.EVENT_CLOSE, (eventName, status) => {
				const handler = opt_statusHandler || this._statusHandler;

				handler(status, resolve, reject);
			});
		});
	}


	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		if (zbKey === zb.device.input.Keys.BACK) {
			this.close(demo.popups.Base.Status.CANCELLED);

			return true;
		}

		return super._processKey(zbKey, e);
	}


	/**
	 * @param {*} status
	 * @param {function(*)} resolve
	 * @param {function(*)} reject
	 * @protected
	 */
	_statusHandler(status, resolve, reject) {
		switch (status) {
			case demo.popups.Base.Status.FAILED:
			case demo.popups.Base.Status.CANCELLED:
				reject(status);
				break;
			default:
				resolve(status);
				break;
		}
	}
};


/**
 * @typedef {function(*, function(*), function(*))}
 */
demo.popups.Base.StatusHandler;


/**
 * @enum {string}
 */
demo.popups.Base.Status = {
	SUCCEEDED: 'succeeded',
	FAILED: 'failed',
	CANCELLED: 'cancelled'
};
