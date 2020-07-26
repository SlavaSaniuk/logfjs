export class LogfjsProperties {

	//Class variables
	/** @type {LogfjsLoggerLevel} [Logger level] */
	#logger_level = null;

	setLoggerLevel(a_level) {
		this.#logger_level = a_level;
	}

	getLoggerLevel() {
		return this.#logger_level;
	}
}