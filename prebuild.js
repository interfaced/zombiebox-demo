import {AbstractPlatform, Application} from 'zombiebox';

/**
 * @param {function()} callback
 * @param {{
 *     app: Application,
 *     buildDir: string,
 *     platformName: string,
 *     platform: ?AbstractPlatform
 * }} data
 */
export default (callback, data) => {
	console.log('PreBuild for %s in %s', data.platformName, data.buildDir);
	callback();
};
