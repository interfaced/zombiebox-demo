/**
 * @param {Object} config
 * @return {Object}
 */
module.exports = (config) => {
	return {
		compilation: {
			flags: {
				'checks_only': true
			}
		}
	};
};
