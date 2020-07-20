import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';

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
		let appender = this.#clazz_name +" [" +level +"]: ";

		//Print message to console
		console.log(appender + message);
	}

	trace(message) {
		this._log(message, levels.TRACE);
	}

	debug(message) {
		this._log(message, levels.DEBUG);
	}

	info(message) {
		this._log(message, levels.INFO);
	}

	warn(message) {
		this._log(message, levels.WARN);
	}

	error(message) {
		this._log(message, levels.ERROR);
	}
}