const path = require('path');
const {PARTIAL} = require('zombiebox-extension-dependency-injection').types.ImportType;
const walkSync = require('walk-sync');


const staticRoot = path.resolve(__dirname, 'static');
const staticFiles = {};
for (const file of walkSync(staticRoot, {directories: false})) {
	staticFiles['/' + file] = path.join(staticRoot, file);
}


/**
 * @return {Object}
 */
module.exports = function() {
	return {
		project: {
			name: 'demo',
			main: path.resolve(__dirname, 'app/application.js'),
			module: path.resolve(__dirname, 'app')
		},
		devModule: path.resolve(__dirname, 'app/dev.js'),
		generatedDirectory: path.resolve(__dirname, '.code-cache'),
		build: {
			directory: path.resolve(__dirname, 'dist'),
			include: staticFiles
		},
		styles: {
			inlineResources: false
		},
		di: {
			services: {
				scenesNativeInput: {
					_import: PARTIAL
				},
				scenesVideoPlayer: {
					_import: PARTIAL
				}
			},
			servicesAutodetect: [
				{
					group: 'scenes',
					directory: path.resolve(__dirname, 'app/scenes')
				},
				{
					group: 'service',
					directory: path.resolve(__dirname, 'app/service')
				}
			]
		}
	};
};
