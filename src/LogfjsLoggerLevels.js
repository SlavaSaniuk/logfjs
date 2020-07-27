/** 
 *  LogfjsLoggerLevels hold all available logger notification 
 * levels as it's static fields. Enum class.
 */
export class LogfjsLoggerLevels {

	/** @type {String} [Trace logger notification level;] */
	static TRACE = "TRACE";
	/** @type {String} [Debug logger notification level;] */
	static DEBUG = "DEBUG";
	/** @type {String} [Info logger notification level;] */
	static INFO = "INFO";
	/** @type {String} [Warn logger notification level;] */
	static WARN = "WARN";
	/** @type {String} [Error logger notification level;] */
	static ERROR = "ERROR";

	/** @type {Array} [Array that hoal all supported logger notification levels;] */
	static LEVELS_ARRAY = [this.TRACE, this.DEBUG, this.INFO, this.WARN, this.ERROR];
}