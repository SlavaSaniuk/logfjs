import {LogfjsProperties as Properties} from './LogfjsProperties.js';

export class LogfjsConfig {

	//Class variables
	#CURRENT_PROPERTIES;
	#isInitialized = false;

	constructor() {

		//Singleton pattern
		if (LogfjsConfig.INSTANSE instanceof LogfjsConfig)
			return LogfjsConfig.INSTANSE;
		LogfjsConfig.INSTANSE = this;

		this.#CURRENT_PROPERTIES = new Properties();

	}

	getProperties() {
		return this.#CURRENT_PROPERTIES;
	}

	isInitialized() {
		return this.#isInitialized;
	}



}