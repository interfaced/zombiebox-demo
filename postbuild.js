const exec = require('child_process').exec;

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
