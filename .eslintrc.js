const path = require('path');

module.exports = {
	extends: 'interfaced',
	overrides: [
		{
			files: ['app/**/*.js'],
			extends: 'interfaced/esm',
			settings: {
				'import/resolver': 'zombiebox'
			}
		},
		{
			files: ['config.js', 'postbuild.js', 'prebuild.js', 'configs/*.js'],
			extends: 'interfaced/node'
		}
	]
};
