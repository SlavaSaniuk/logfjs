export class LogfjsProperties {

	#logger_level = null; //Property identified logger_level;

	setLoggerLevel(a_level) {
		this.#logger_level = a_level;
	}

	getLoggerLevel() {
		return this.#logger_level;
	}
}