import Key from 'zb/device/input/key';
import HelpBarItem from 'ui/widgets/help-bar/help-bar-item';
import app from 'generated/app';


/**
 * @param {string} label
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const red = (label, callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_red',
		label,
		keys: [Key.RED]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const green = (label, callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_green',
		label,
		keys: [Key.GREEN]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const yellow = (label, callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_yellow',
		label,
		keys: [Key.YELLOW]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const blue = (label, callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_blue',
		label,
		keys: [Key.BLUE]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const play = (callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_play',
		label: 'Play',
		keys: [Key.PLAY]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const pause = (callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_pause',
		label: 'Pause',
		keys: [Key.PAUSE]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const rewind = (callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_rew',
		label: 'Backward',
		keys: [Key.REW]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const forward = (callback = () => {/* blank */}) => {
	const item = new HelpBarItem({
		cssClass: '_ff',
		label: 'Forward',
		keys: [Key.FWD]
	});

	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const back = (callback) => {
	const item = new HelpBarItem({
		cssClass: '_back',
		label: 'Back',
		keys: [Key.BACK]
	});

	item.on(item.EVENT_CLICK, () => {
		if (callback) {
			callback();
		} else {
			app.back();
		}
	});

	return item;
};


/**
 * @param {function()=} callback
 * @return {HelpBarItem}
 */
export const exit = (callback) => {
	const item = new HelpBarItem({
		cssClass: '_exit',
		label: 'Выход',
		keys: [Key.EXIT]
	});

	item.on(item.EVENT_CLICK, () => {
		if (callback) {
			callback();
		} else {
			app.exit();
		}
	});

	return item;
};
