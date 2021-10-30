import path from 'path';
import klaw from 'klaw-sync';
import {utils} from 'zombiebox';


const listStatic = (dir) => {
	const staticRoot = utils.resolve(import.meta.url, path.join('static', dir));
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
export default () => {
	return {
		project: {
			name: 'demo',
			entry: utils.resolve(import.meta.url, 'app/application.js'),
			src: utils.resolve(import.meta.url, 'app')
		},
		generatedCode: utils.resolve(import.meta.url, '.generated'),
		include: [
			{
				name: 'Images',
				static: listStatic('img')
			}
		],
		devServer: {
			backdoor: utils.resolve(import.meta.url, 'app/dev.js')
		}
	};
};
