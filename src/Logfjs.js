import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {LogfjsTimestamp} from './LogfjsTimestamp.js';

export class Logfjs {

	//Class variables:
	//Private vars:
	#clazz_name;
	#current_appender;

	//Constructor
	constructor(a_clazz_name) {
		//Map class names
		this.#clazz_name = a_clazz_name;
	}

	//Class methods
	_log(message, level) {

		//Appender string
		let appender = LogfjsTimestamp.get() +" " +this.#clazz_name +" [" +level +"]: ";

		//Print message to console
		console.log(appender + message);
	}

	trace(message) {
		if (this._isLogEnabled(levels.TRACE))
			this._log(message, levels.TRACE);
	}

	debug(message) {
		if (this._isLogEnabled(levels.DEBUG))
			this._log(message, levels.DEBUG);
	}

	info(message) {
		if (this._isLogEnabled(levels.INFO))
			this._log(message, levels.INFO);
	}

	warn(message) {
		if (this._isLogEnabled(levels.WARN))
			this._log(message, levels.WARN);
	}

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
		//Check if log available:
		return LogfjsConfig.getInstance().getAvailableLoggerLevels().includes(a_level);
	}
}