/**
 * @param {Object} baseConfig
 * @return {Object}
 */
module.exports = (baseConfig) => {
	config = require('./../config')(baseConfig); // eslint-disable-line global-require

	config.compilation = {
		flags: {
			'checks_only': true
		}
	};

	return config;
};
