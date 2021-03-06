import {LogfjsProperties as LogfjsProperties} from './LogfjsProperties.js';
import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {Logfjs} from './Logfjs.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';
import {LogfjsTimestamp} from './LogfjsTimestamp.js';
import {LogfjsTimestampMode} from './LogfjsTimestampMode.js';

/** 
 * Common configuration class for control/manage purposes. 
 * Class designed with singleton pattern. Comonly you don't need to use this class. 
 * You may call {logfjsEnableDebug()} static method to enable logfjs debugging. 
 */
export class LogfjsConfig {

	/** @type {LogfjsProperties} [Custom configuration properties instance;] */
	#CUSTOM_CONFIGURATION_PROPERTIES = new LogfjsProperties();
	/** @type {LogfjsProperties} [Default configuration properties instance;] */
	#DEFAULT_CONFIGURATION_PROPERTIES = new LogfjsProperties();
	/** @type {LogfjsProperties} [Current configuration properties instance;] */
	#CURRENT_CONFIGURATION_PROPERTIES = new LogfjsProperties();
	/** @type {Boolean} [Flag thats indicate if custom config initialized;] */
	#isInitialized = false;
	/** @type {Boolean} [Flag indicate if default config is initialized;] */
	#isInitializedDefaults = false;
	/** @type {Array} [Array hold available log levels;] */
	#available_log_levels = [];
	/** @type {[LogfjsTimestampMode]} [Current timestamp mode;] */
	#timestamp_mode = null;
	/** @type {Logfjs} [Default logger for {LogfjsConfig} class;] */
	static DEFAULT_LOGGER = new SpecialLogfjs("LogfjsConfig");
	/** @type {Boolean} [Flag indicate if logfjs debug mode enabled;] */
	static #IS_DEBUG_ENABLED = false;

	/**
	 * [constructor - Construct new {LogfjsConfig} singleton instance.]
	 * @return {[LogfsConfig]} [Return singleton instance.]
	 */
	constructor() {

		//Singleton pattern
		if (LogfjsConfig.INSTANSE instanceof LogfjsConfig)
			return LogfjsConfig.INSTANSE;
		LogfjsConfig.INSTANSE = this;

		//Initialize default properties:
		this.#DEFAULT_CONFIGURATION_PROPERTIES.setLoggerLevel(levels.DEBUG); // Default logger level - DEBUG;
		this.#DEFAULT_CONFIGURATION_PROPERTIES.setTimestampMode(LogfjsTimestampMode.FULL); //Default timestamp mode - FULL;

		//Freeze vars
		Object.freeze(LogfjsConfig.DEFAULT_LOGGER); //Freeze logger
		Object.freeze(this.#DEFAULT_CONFIGURATION_PROPERTIES); //Freeze default configuration properties;
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
	 * [getCustomProperties - Return custom configuration properties.]
	 * @return {[LogfjsProperties]} [Return current configuration properties.]
	 */
	getCustomProperties() {
		LogfjsConfig.DEFAULT_LOGGER.trace("Return custom configuration properties from {[LogfjsConfig]} class;")
		return this.#CUSTOM_CONFIGURATION_PROPERTIES;
	}

	/**  
	 * [getDefaultProperties - Return default confgiration properties.]
	 * @return {[LogfjsProperties]} [Default configuration properties.]
	 */
	getDefaultProperties() {
		// Return default configuration properties:
		return this.#DEFAULT_CONFIGURATION_PROPERTIES;
	}

	/**  
	 * [getCurrentProperties - Return current configuration properties.]
	 * @return {[LogfjsProperties]} [Current confgiration properties.]
	 */
	getCurrentProperties() {
		LogfjsConfig.DEFAULT_LOGGER.trace("Return current configuration properties;");
		return this.#CURRENT_CONFIGURATION_PROPERTIES;
	}

	/**  
	 * [_initialize - Initialize configuration properties: Method set logger level, 
	 * set timestamp mode, map specified config with {#CURRENT_CONFIGURATION_PROPERTIES} object.]
	 * @param  {[type]} a_config [Configuration properties for intialization.]
	 */
	_initialize(a_config) {

		LogfjsConfig.DEFAULT_LOGGER.trace("Initialize current configuration properties;");

		// Try to set logger level:
		if (a_config.getLoggerLevel() != null)
			this.initAvailableLogLevels(a_config.getLoggerLevel());
		else {
			LogfjsConfig.DEFAULT_LOGGER.warn("Logger level in not specified. Use default loggel level;");
			this.initAvailableLogLevels(this.#DEFAULT_CONFIGURATION_PROPERTIES.getLoggerLevel());
		}

		//Try to set timestamp mode:
		if (LogfjsTimestampMode.TimestampModes.includes(a_config.getTimestampMode())) {
				LogfjsConfig.DEFAULT_LOGGER.trace("Try to set timestamp mode to " +a_config.getTimestampMode() +" mode;");
				this._setTimestampMode(a_config.getTimestampMode());
		}else {
			LogfjsConfig.DEFAULT_LOGGER.warn("Timestamp mode is not setted. Use default timestamp mode;");
			this._setTimestampMode(this.#DEFAULT_CONFIGURATION_PROPERTIES.getTimestampMode());
		}
		
		// Map current config with specified a_config
		this.#CURRENT_CONFIGURATION_PROPERTIES = a_config; 
	}

	/**  
	 * [initializeDefaults - Initialize defaults configuration properties. 
	 * Method use {_initialize} method with {#DEFAULTS_CONFIGURATION_PROPERTIES} parameter value.]
	 * @return {[UNDEFINED]} [Nothing return.]
	 */
	initializeDefaults() {
		LogfjsConfig.DEFAULT_LOGGER.debug("Try to initialize default configuration properties;");

		//Try to initialize defaults configuration properties:
		this._initialize(this.#DEFAULT_CONFIGURATION_PROPERTIES);

		//Set initialized default flag to true
		this.#isInitializedDefaults = true;
	}

	/**  
	 * [initializeCustom - Initialize custom configuration properties. 
	 * Method use {_initialize} method with {#CUSTOM_CONFIGURATION_PROPERTIES} parameter value.]
	 * @return {[UNDEFINED]} [Nothing return.]
	 */
	initializeCustom() {
		LogfjsConfig.DEFAULT_LOGGER.debug("Try to initialize custom configuration properties;");

		//Freeze current config
		Object.freeze(this.#CUSTOM_CONFIGURATION_PROPERTIES);

		//Initialize custom properties
		this._initialize(this.#CUSTOM_CONFIGURATION_PROPERTIES);

		//Set initialized flag to true:
		this.#isInitialized = true;
	}

	/**   
	 * [isInitialized - Check if Logfjs configuration is initialized.]
	 * @return {Boolean} [Return 'true' - if configuration is initialized.]
	 */
	isInitialized() {	
		// Return initialized flag:
		return this.#isInitialized;
	}

	/**
	 * [isInitializedDefaults - Check if Logfjs default configuration is initialized.]
	 * @return {Boolean} [Return 'true' - if default configuration is initialized.]
	 */
	isInitializedDefaults() {
		// Return initialized deffault flag;
		return this.#isInitializedDefaults;
	}

		/**
	 * [initAvailableLogLevels - Set current logger for system. Method initialize {@ #available_log_leves} array.]
	 * @param {[LogfjsLoggerLevels]} a_level [{LogfjsLoggerLevels.LEVEL}
	 */
	initAvailableLogLevels(a_level) {

		LogfjsConfig.DEFAULT_LOGGER.trace(
			"Initialize available logger levels with " +a_level.toString() +" value;");
		
		// Initialize log levels arrays:
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
	getAvailableLoggerLevels() {		
		// Return availble logger levels:
		return this.#available_log_levels;	
	}

	/**  
	 * [_setTimestampMode - Set current timestamp mode in {LogfjsTimestamp} singletn instance.]
	 * @param {[LogfjsTimestampMode]} a_mode [Mode for timestamp.]
	 */
	_setTimestampMode(a_mode) {
		LogfjsConfig.DEFAULT_LOGGER.trace("Set current timestamp mode to " +a_mode.toString() +" mode;");

		// Set timestamp mode in LogfjsTimestamp:
		LogfjsTimestamp.getInstance()._setTimestampMode(a_mode);

		// Map timestamp mode with specified parameter:
		this.#timestamp_mode = a_mode;
	}

	/**  
	 * [getTimestampMode - Return current timestamp mode.]
	 * @return {[LogfjsTimestampMode]} [Current timestamp mode.]
	 */
	getTimestampMode() {
		LogfjsConfig.DEFAULT_LOGGER.trace("Return current timestamp mode;");
		return this.#timestamp_mode;
	}

	/**
	 * [logfjsEnableDebug - Enable debug logging for logfjs library.] 
	 * @return {[UNDEFINED]} [Nothing return.]
	 */
	static logfjsEnableDebug() {
		// Enable debug flag:
		this.#IS_DEBUG_ENABLED = true;
	}

	/**  
	 * [logfjsIsDebugEnabled - Check if debug is enabled.]
	 * @return {[Boolean]} [Return 'true' - if debug enabled.]
	 */
	static logfjsIsDebugEnabled() {
		// Return debug flag:
		return this.#IS_DEBUG_ENABLED;
	}

}