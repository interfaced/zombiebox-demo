const path = require('path');
const {PARTIAL} = require('zombiebox-extension-dependency-injection').types.ImportType;
const klaw = require('klaw-sync');


const listStatic = (dir) => {
	const staticRoot = path.resolve(__dirname, 'static', dir);
	const staticFiles = {};
	for (const file of klaw(staticRoot, {nodir: true})) {
		const absolutePath = file.path;
		staticFiles[path.relative(staticRoot, absolutePath)] = absolutePath;
	}
	return staticFiles;
};


/**
 * @return {Object}
 */
module.exports = function() {
	return {
		project: {
			name: 'demo',
			entry: path.resolve(__dirname, 'app/application.js'),
			src: path.resolve(__dirname, 'app')
		},
		generatedCode: path.resolve(__dirname, '.generated'),
		include: [
			{
				name: 'Images',
				static: listStatic('img')
			}
		],
		devServer: {
			backdoor: path.resolve(__dirname, 'app/dev.js')
		},
		extensions: {
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
		}
	};
};
