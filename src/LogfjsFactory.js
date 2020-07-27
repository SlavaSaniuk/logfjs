import {Logfjs} from './Logfjs.js';
import {LogfjsConfig} from './LogfjsConfig.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';

/** 
 *  Common entry point to create logger object. 
 * Class designed with factory pattern. Use {getLogger()} static method 
 * to create new logger object for specified class. 
 */
export class LogfjsFactory {

	/** @type {SpecialLogfjs} [Special logger for {LogfjsFactory} class.] */
	static DEFAULT_LOGGER = new SpecialLogfjs("LogfjsFactory");

	/**  
	 * [constructor -  Construct new {LogfjsFactory} singleton instance.]
	 * @return {[LogfjsFactory]} [Return {LogfjsFactory} singleton instance.]
	 */
	constructor() {	
		// Singleton pattern
		if (LogfjsFactory.INSTANCE instanceof LogfjsFactory) {
			return LogfjsFactory.INSTANCE;
		}
		LogfjsFactory.INSTANCE = this;
	}

	/**  
	 * [getInstance - Return current singleton instance of {LogfjsFactory} class.]
	 * @return {[LogfjsFactory]} [Singleton instance of {LogfjsFactory} class.]
	 */
	static getInstance() {
		this.DEFAULT_LOGGER.trace("Return singleton instance of [LogfjsFactory] class.");
		return LogfjsFactory.INSTANCE;
	}

	/**
	 * [Create new {Logfjs} logger instance for specified class name]
	 * @param  {[String]} a_clazz_name [Class name for logger]
	 * @return {[Logfjs]}              [{Logfjs} logger object]
	 */
	static getLogger(a_clazz_name) {

		// Check if LogfjsConfig initialized:
		if (!LogfjsConfig.getInstance().isInitialized()) {
			// Check if initialized defaults:
			if (!LogfjsConfig.getInstance().isInitializedDefaults()) {
				// Intitalized defaults:
				this.DEFAULT_LOGGER.debug("Logfjs default configuration isn't initialized. Try to initialize it;");
				LogfjsConfig.getInstance().initializeDefaults();
			}
		}

		// Create logger for class
		return new Logfjs(a_clazz_name);
	}
}