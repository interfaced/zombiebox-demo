import app from 'generated/app';
import Keys from 'zb/device/input/keys';
import HelpBarItem from 'ui/widgets/help-bar/help-bar-item';


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const red = (label, opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_red',
		label,
		keys: [Keys.RED]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const green = (label, opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_green',
		label,
		keys: [Keys.GREEN]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const yellow = (label, opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_yellow',
		label,
		keys: [Keys.YELLOW]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const blue = (label, opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_blue',
		label,
		keys: [Keys.BLUE]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const play = (opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_play',
		label: 'Play',
		keys: [Keys.PLAY]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const pause = (opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_pause',
		label: 'Pause',
		keys: [Keys.PAUSE]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const rewind = (opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_rew',
		label: 'Backward',
		keys: [Keys.REW]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const forward = (opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_ff',
		label: 'Forward',
		keys: [Keys.FWD]
	});

	const callback = typeof opt_callback === 'function' ? opt_callback : () => {/* empty */};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const back = (opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_back',
		label: 'Back',
		keys: [Keys.BACK]
	});

	item.on(item.EVENT_CLICK, () => {
		if (opt_callback) {
			opt_callback();
		} else {
			app.back();
		}
	});

	return item;
};


/**
 * @param {function()=} opt_callback
 * @return {HelpBarItem}
 */
export const exit = (opt_callback) => {
	const item = new HelpBarItem({
		cssClass: '_exit',
		label: 'Выход',
		keys: [Keys.EXIT]
	});

	item.on(item.EVENT_CLICK, () => {
		if (opt_callback) {
			opt_callback();
		} else {
			app.exit();
		}
	});

	return item;
};
