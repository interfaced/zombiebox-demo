goog.provide('demo.widgets.helpBarItemFactory');
goog.require('zb.device.input');
goog.require('zb.device.input.Keys');
goog.require('zb.ui.HelpBarItem');


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.red = (label, opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_red',
		label,
		keys: [zb.device.input.Keys.RED]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.green = (label, opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_green',
		label,
		keys: [zb.device.input.Keys.GREEN]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.yellow = (label, opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_yellow',
		label,
		keys: [zb.device.input.Keys.YELLOW]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.blue = (label, opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_blue',
		label,
		keys: [zb.device.input.Keys.BLUE]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.play = (opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_play',
		label: 'Play',
		keys: [zb.device.input.Keys.PLAY]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.pause = (opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_pause',
		label: 'Pause',
		keys: [zb.device.input.Keys.PAUSE]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.rewind = (opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_rew',
		label: 'Backward',
		keys: [zb.device.input.Keys.REW]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.forward = (opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_ff',
		label: 'Forward',
		keys: [zb.device.input.Keys.FWD]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.back = (opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_back',
		label: 'Back',
		keys: [zb.device.input.Keys.BACK]
	});

	item.on(item.EVENT_CLICK, () => {
		opt_callback ? opt_callback() : app.back();
	});

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
demo.widgets.helpBarItemFactory.exit = (opt_callback) => {
	const item = new zb.ui.HelpBarItem({
		cssClass: '_exit',
		label: 'Выход',
		keys: [zb.device.input.Keys.EXIT]
	});

	item.on(item.EVENT_CLICK, () => {
		opt_callback ? opt_callback() : app.exit();
	});

	return item;
};
