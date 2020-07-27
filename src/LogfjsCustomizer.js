import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {Logfjs} from './Logfjs.js';
import {LogfjsConfig} from './LogfjsConfig.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';
import {LogfjsTimestampMode} from './LogfjsTimestampMode.js';

export class LogfjsCustomizer {

	//Class variables
	static #DEFAULT_LOGGER = new SpecialLogfjs("LogfjsCustomizer");
	static #INTITIALIZE_NOTE = " You must call initialize() method to apply changes;";

	//Class methods
	static initialize() {

		// Call initializeCustom() method in LogfjsConfig singleton:
		LogfjsConfig.getInstance().initializeCustom();
	}

	static setTimestampMode(a_mode) {

		// Check if specified mode in supported
		if (LogfjsTimestampMode.TimestampModes.includes(a_mode)) {
			this.#DEFAULT_LOGGER.debug("Set timestamp mode to [" +a_mode +"] mode." +this.#INTITIALIZE_NOTE);
			LogfjsConfig.getInstance().getCustomProperties().setTimestampMode(a_mode);
		} else 
			this.#DEFAULT_LOGGER.warn("Specified timestamp mode is not supported;" 
				+" Please, use following timestamp modes: " +LogfjsTimestampMode.TimestampModes.toString() +";");
	}

	static setLoggerLevel(a_level) {

		//Check if specified logger level is supported:
		if (!levels.LEVELS_ARRAY.includes(a_level)) {
			this.#DEFAULT_LOGGER.warn("Specified logger level [" +a_level +"] is not supported."  
				+"Please, use following logger levels " +levels.LEVELS_ARRAY.toString() +";");
			return;
		}

		//Try to set logger level:
		this.#DEFAULT_LOGGER.info("Set logger level to [" +a_level +"] level;" +this.#INTITIALIZE_NOTE);
		new LogfjsConfig().getCustomProperties().setLoggerLevel(a_level);
	}

}