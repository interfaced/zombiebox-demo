const path = require('path');

/**
 * Reads package.json of the given package and resolves path to the directory with modules
 * @param {string} packageName
 * @return {string}
 */
const resolveModulePath = (packageName) => {
	const packageInfoPath = require.resolve(`${packageName}/package.json`);

	// eslint-disable-next-line global-require
	return path.join(path.dirname(packageInfoPath), require(packageInfoPath).module);
};

module.exports = {
	extends: 'interfaced',
	overrides: [
		{
			files: ['app/**/*.js'],
			settings: {
				'import/resolver': {
					alias: [
						['generated', './.generated'],
						['demo', './app'],
						['zb', resolveModulePath('zombiebox')],
						['cutejs', resolveModulePath('zombiebox-extension-cutejs')],
						['ui', resolveModulePath('zombiebox-extension-ui')],
						['about', resolveModulePath('zombiebox-extension-about')],
						['pc', resolveModulePath('zombiebox-platform-pc')],
					]
				}
			},
			...require('eslint-config-interfaced/overrides/esm')
		},
		{
			files: ['config.js', 'postbuild.js', 'prebuild.js', 'configs/*.js'],
			...require('eslint-config-interfaced/overrides/node')
		}
	]
};
