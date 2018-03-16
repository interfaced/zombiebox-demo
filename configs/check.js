/**
 * @param {Object} config
 * @return {Object}
 */
module.exports = (config) => {
	config = require('./../config')(config);

	config.compilation = {
		flags: {
			'checks_only': true
		}
	};

	return config;
};
