import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {LogfjsTimestamp} from './LogfjsTimestamp.js';

/** 
 * Common object for javascript logging. 
 * Construct new {Logfjs} logger object via {LogfjsFactofy.getLogger()} for JS class 
 * and use trace(), debug(), info(), warn(), error() methods to log messages 
 * on any logger notification levels. Default log message builds 
 * on special pattern "TIMESTAMP CLASS  [LEVEL]: MESSAGE", where:
 * TIMESTAMP - current timestamp; 
 * CLASS_NAME - Name of class for this logger; 
 * LEVEL - logger notification level; 
 * MESSAGE - message for log. 
 * For example: "2020-06-27T18:00:00:00 Index.js [TRACE]: Hello world!".
 */
export class Logfjs {

	/** @type {[String]} [Class name for this logger object;] */
	#clazz_name = null;

	/**  
	 * [constructor - Construct new {Logfjs} object for specified class name.]
	 * @param  {[String]} a_clazz_name [Class name for this logger object.]
	 * @return {[Logfjs]}              [Create new logger object.]
	 */
	constructor(a_clazz_name) {
		// Map class names
		this.#clazz_name = a_clazz_name;
	}

	/**  
	 * [_log - Log message to console. Method log specified message to console
	 * with specified logger notification level and timestamp.]
	 * @param  {[String]} message [Message to log.]
	 * @param  {[LogfjsLoggerLevel]} level   [Logger notification level for log.]
	 * @return {[UNDEFINED]}         [Nothing return.]
	 */
	_log(message, level) {
		
		// Appender string
		let appender = LogfjsTimestamp.get() +" " +this.#clazz_name +" [" +level +"]: ";
		
		// Print message to console
		console.log(appender + message);
	}

	/**  
	 * [trace - Log specified message with {LogfjsLoggerLevels.TRACE} logger notification level.]
	 * @param  {[String]} message [Message to log.]
	 * @return {[UNDEFINED]}         [Nothing return.]
	 */
	trace(message) {
		if (this._isLogEnabled(levels.TRACE))
			this._log(message, levels.TRACE);
	}

	/**  
	 * [debug - Log specified message with {LogfjsLoggerLevels.DEBUG} logger notification level.]
	 * @param  {[String]} message [Message to log.]
	 * @return {[UNDEFINED]}         [Nothing return.]
	 */
	debug(message) {
		if (this._isLogEnabled(levels.DEBUG))
			this._log(message, levels.DEBUG);
	}

	/**  
	 * [info - Log specified message with {LogfjsLoggerLevels.INFO} logger notification level.]
	 * @param  {[String]} message [Message to log.]
	 * @return {[UNDEFINED]}         [Nothing return.]
	 */
	info(message) {
		if (this._isLogEnabled(levels.INFO))
			this._log(message, levels.INFO);
	}

	/**  
	 * [warn - Log specified message with {LogfjsLoggerLevels.WARN} logger notification level.]
	 * @param  {[String]} message [Message to log.]
	 * @return {[UNDEFINED]}         [Nothing return.]
	 */
	warn(message) {
		if (this._isLogEnabled(levels.WARN))
			this._log(message, levels.WARN);
	}

	/**  
	 * [error - Log specified message with {LogfjsLoggerLevels.ERROR} logger notification level.]
	 * @param  {[String]} message [Message to log.]
	 * @return {[UNDEFINED]}         [Nothing return.]
	 */
	error(message) {
		if (this._isLogEnabled(levels.ERROR))
			this._log(message, levels.ERROR);
	}

	/**                   
	 * [_isLogEnabled - Check if log level available for logging.]
	 * @param  {[LogfjsLoggerLevels#level]}  a_level [LogfjsLoggerLevel level.]
	 * @return {Boolean}         [Return 'true' - if log level available.]
	 */
	_isLogEnabled(a_level) {
		// Check if log available:
		return LogfjsConfig.getInstance().getAvailableLoggerLevels().includes(a_level);
	}
}