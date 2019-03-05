/**
 * @param {function()} callback
 * @param {{
 *     app: ZBApplication,
 *     buildDir: string,
 *     platformName: string,
 *     platform: ?ZBPlatform
 * }} data
 */
module.exports = function(callback, data) {
	console.log('PreBuild for %s in %s', data.platformName, data.buildDir);
	callback();
};
