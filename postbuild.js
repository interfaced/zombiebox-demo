const exec = require('child_process').exec;
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
	console.log('PostBuild for %s in %s', data.platformName, data.buildDir);

	exec('ls -al ' + data.buildDir,
		(error, stdout) => {
			console.log('Result: ', stdout);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			callback();
		});
};
