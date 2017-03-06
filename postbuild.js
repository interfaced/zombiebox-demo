/**
 * @param {function()} callback
 * @param {{
 *      app: ZBApplication,
 *      buildDir: string,
 *      platformName: string,
 *      platform: ?ZBPlatform
 * }} data
 */
module.exports = function(callback, data) {
	console.log('PostBuild for %s in %s', data.platformName, data.buildDir);

	require('child_process').exec('ls -al ' + data.buildDir,
		function(error, stdout, stderr) {
			console.log('Result: ', stdout);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			callback();
		});
};
