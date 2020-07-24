import {LogfjsLoggerLevels as levels} from './LogfjsLoggerLevels.js';
import {Logfjs} from './Logfjs.js';
import {LogfjsConfig as config} from './LogfjsConfig.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';

export class LogfjsCustomizer {

	//Class variables
	static #DEFAULT_LOGGER = new SpecialLogfjs("LogfjsCustomizer");

	//Class methods
	static initialize() {

		//Call initialize() method in LogfjsConfig singleton
		LogfjsConfig.getInstance().initialize();
	}

	static setLoggerLevel(a_level) {

		//Check if specified logger level is supported:
		if (!levels.LEVELS_ARRAY.includes(a_level)) {
			this.#DEFAULT_LOGGER.warn("Specified logger level [" +a_level +"] is not supported."  
				+"Please, use following logger levels " +levels.LEVELS_ARRAY.toString() +";");
			return;
		}

		//Try to set logger level:
		this.#DEFAULT_LOGGER.info("Set logger level to [" +a_level +"] level;");
		new config().getProperties().setLoggerLevel(a_level);
	}

}