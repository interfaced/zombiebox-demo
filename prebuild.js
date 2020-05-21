const {AbstractPlatform, Application} = require('zombiebox');

/**
 * @param {function()} callback
 * @param {{
 *     app: Application,
 *     buildDir: string,
 *     platformName: string,
 *     platform: ?AbstractPlatform
 * }} data
 */
module.exports = function(callback, data) {
	console.log('PreBuild for %s in %s', data.platformName, data.buildDir);
	callback();
};
