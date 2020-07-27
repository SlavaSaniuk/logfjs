import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {Logfjs} from './Logfjs.js';
import {LogfjsConfig} from './LogfjsConfig.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';
import {LogfjsTimestampMode} from './LogfjsTimestampMode.js';

/** 
 * Common entry point for logging configuration. 
 * Use this static methods to configure logging. 
 * You need to call {initialize()} method to apply custom configurations.
 */
export class LogfjsCustomizer {

	/** @type {SpecialLogfjs} [Special logger for this class;] */
	static #DEFAULT_LOGGER = new SpecialLogfjs("LogfjsCustomizer");
	/** @type {String} [Logger notification for initialize() method use;] */
	static #INTITIALIZE_NOTE = " You must call initialize() method to apply changes;";

	/**  
	 * [initialize - Start initialization of custom config.]
	 * @return {[UNDEFINED]} [Nothing return.]
	 */
	static initialize() {

		// Call initializeCustom() method in LogfjsConfig singleton:
		LogfjsConfig.getInstance().initializeCustom();
	}

	/**  
	 * [setTimestampMode - Set timestamp mode for logging.]
	 * @param {[LogfjsTimestampMode]} a_mode [Mode for timestamp.]
	 * @return {[UNDEFINED]} [Nothing return.]
	 */
	static setTimestampMode(a_mode) {

		// Check if specified mode in supported
		if (LogfjsTimestampMode.TimestampModes.includes(a_mode)) {
			this.#DEFAULT_LOGGER.debug("Set timestamp mode to [" +a_mode +"] mode." +this.#INTITIALIZE_NOTE);
			LogfjsConfig.getInstance().getCustomProperties().setTimestampMode(a_mode);
		} else {
			this.#DEFAULT_LOGGER.warn("Specified timestamp mode is not supported;" 
				+" Please, use following timestamp modes: " +LogfjsTimestampMode.TimestampModes.toString() +";");
			return;
		}
	}

	/**      
	 * [setLoggerLevel - Set lower logger notification level for log. Logs with lowest level will be ignored.]
	 * @param {[LogfjsLoggerLevels]} a_level [Lower level for logger.]
	 * @return {[UNDEFINED]} [Nothing return.]
	 */
	static setLoggerLevel(a_level) {

		// Check if specified logger level is supported:
		if (!levels.LEVELS_ARRAY.includes(a_level)) {
			this.#DEFAULT_LOGGER.warn("Specified logger level [" +a_level +"] is not supported."  
				+"Please, use following logger levels " +levels.LEVELS_ARRAY.toString() +";");
			return;
		}

		// Try to set logger level:
		this.#DEFAULT_LOGGER.info("Set logger level to [" +a_level +"] level;" +this.#INTITIALIZE_NOTE);
		new LogfjsConfig.getInstance().getCustomProperties().setLoggerLevel(a_level);
	}

}