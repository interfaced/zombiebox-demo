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
			files: ['config.js', 'postbuild.js', 'prebuild.js', 'configs/*.js', '.eslintrc.js'],
			extends: 'interfaced/node'
		}
	]
};
