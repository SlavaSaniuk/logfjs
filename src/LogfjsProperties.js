export class LogfjsProperties {

	/** @type {LogfjsLoggerLevel} [Logger level] */
	#logger_level = null;
	/** @type {LogfjsTimestampMode} [Mode for timestamp functionality] */
	#timestamp_mode = null;

	setLoggerLevel(a_level) {
		this.#logger_level = a_level;
	}

	getLoggerLevel() {
		return this.#logger_level;
	}

	/**  
	 * [setTimestampMode - Set timestamp mode for this object.]
	 * @param {[LogfjsTimestampMode]} a_mode [Mode for timestamp functionality.]
	 */
	setTimestampMode(a_mode) {
		this.#timestamp_mode = a_mode;
	}

	/**  
	 * [getTimestampMode Return current timestamp mode for this object.]
	 * @return {[LogfjsTimestampMode]} [Current timestamp mode.]
	 */
	getTimestampMode() {
		return this.#timestamp_mode;
	}
}