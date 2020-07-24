import {LogfjsProperties as Properties} from './LogfjsProperties.js';
import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {Logfjs} from './Logfjs.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';

export class LogfjsConfig {

	//Class variables
	#CURRENT_PROPERTIES;
	/** @type {Boolean} [Flag thats indicate if config initialized;] */
	#isInitialized = false;
	/** @type {Array} [Array hold available log levels;] */
	#available_log_levels = [];
	/** @type {Logfjs} [Default logger for {LogfjsConfig class}] */
	static DEFAULT_LOGGER = new SpecialLogfjs("LogfjsConfig");
	/** @type {Boolean} [Flag indicate if logfjs debug mode enabled] */
	static #IS_DEBUG_ENABLED = false;

	constructor() {

		//Singleton pattern
		if (LogfjsConfig.INSTANSE instanceof LogfjsConfig)
			return LogfjsConfig.INSTANSE;
		LogfjsConfig.INSTANSE = this;

		this.#CURRENT_PROPERTIES = new Properties();

		//Freeze vars
		Object.freeze(LogfjsConfig.DEFAULT_LOGGER);

	}

	/**   
	 * [getInstance - Return singleton instance of {[LogfjsConfig]} class.]
	 * @return {[Logfjs]} [Return singleton instance of {[LogfjsConfig]} class.]
	 */
	static getInstance() {
		this.DEFAULT_LOGGER.trace("Return singleton instance of {[LogfjsConfig]} class;")
		return LogfjsConfig.INSTANSE;
	}

	/**  
	 * [getProperties - Return current configuration properties.]
	 * @return {[LogfjsProperties]} [Return current configuration properties.]
	 */
	getProperties() {
		LogfjsConfig.DEFAULT_LOGGER.trace("Return current configuration properties from {[LogfjsConfig]} class;")
		return this.#CURRENT_PROPERTIES;
	}

	initialize() {

		//Freeze current config
		Object.freeze(this.#CURRENT_PROPERTIES);

		//Set logger level
		if (this.#CURRENT_PROPERTIES.getLoggerLevel() != null)
			this.initAvailableLogLevels(this.#CURRENT_PROPERTIES.getLoggerLevel());
		else {
			LogfjsConfig.DEFAULT_LOGGER.warn("Logger level in not specified. Use default loggel level.");
			//Add default logger level
		}

		//Set initialized flag to true;
		this.#isInitialized = true;
	}

	/**   
	 * [isInitialized - Check if Logfjs configuration is initialized.]
	 * @return {Boolean} [Return 'true' - if configuration is initialized.]
	 */
	isInitialized() {		return this.#isInitialized;	}


		/**
	 * [initAvailableLogLevels - Set current logger for system. Method initialize {@ #available_log_leves} array.]
	 * @param {[LogfjsLoggerLevels]} a_level [{LogfjsLoggerLevels.LEVEL}
	 */
	initAvailableLogLevels(a_level) {
		
		//Initialize log-levels arrays
		switch(a_level) {
			case levels.TRACE: 
				this.#available_log_levels = this.#available_log_levels.concat(levels.LEVELS_ARRAY);
				break;
			case levels.DEBUG:
				this.#available_log_levels.push(levels.DEBUG, levels.INFO, levels.WARN, levels.ERROR);
				break;
			case levels.INFO:
				this.#available_log_levels.push(levels.INFO, levels.WARN, levels.ERROR);
				break;
			case levels.WARN:
				this.#available_log_levels.push(levels.WARN, levels. ERROR);
				break;
			case levels.ERROR:
				this.#available_log_levels.push(levels.ERROR);
				break;
		}
	}

	/**
	 * [getAvailableLoggerLevels - Return {@ #available_log_levels} array.]
	 * @return {[array]} [Return {@ #available_log_levels} array.]]
	 */
	getAvailableLoggerLevels() {		return this.#available_log_levels;	}

	/** [logfjsEnableDebug - Enable debug logging for logfjs library.] */
	static logfjsEnableDebug() {
		//Enable debug flag
		this.#IS_DEBUG_ENABLED = true;
	}

	/**  
	 * [logfjsIsDebugEnabled - Check if debug is enabled.]
	 * @return {[Boolean]} [Return 'true' - if debug enabled.]
	 */
	static logfjsIsDebugEnabled() {
		return this.#IS_DEBUG_ENABLED;
	}

}