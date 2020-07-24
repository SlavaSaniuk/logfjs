import {Logfjs} from './Logfjs.js';

export class LogfjsFactory {

	//Class variables

	//Constructor
	constructor() {
		if (LogfjsFactory.INSTANCE instanceof LogfjsFactory) {
			return LogfjsFactory.INSTANCE;
		}

		LogfjsFactory.INSTANCE = this;
	}

	//Class methods
	/**
	 * [Create new {Logfjs} logger instance for specified class name]
	 * @param  {[String]} a_clazz_name [Class name for logger]
	 * @return {[Logfjs]}              [{Logfjs} logger object]
	 */
	static getLogger(a_clazz_name) {
		//Create logger for class
		let logger = new Logfjs(a_clazz_name);

		return logger;
	}
}