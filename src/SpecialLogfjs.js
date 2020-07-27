import {Logfjs} from './Logfjs.js'; 
import {LogfjsConfig} from './LogfjsConfig.js';

/** 
 * SpecialLogjs logger object extends {Logfjs} base logger
 * and override it's {_isLogEnabled()} method. That logger used by special configuration 
 * logfjs classes and you don't need to create this logger.
 * Note: Use {Logfjs} loggers instead of this logger.
 */
export class SpecialLogfjs extends Logfjs {

	/**
	 * [constructor - Construct new {SpecialLogfjs} logger object.]
	 * @param  {[String]} a_clazz_name [Name of class for this logger.]
	 * @return {[SpeciamLogfjs]}              [new logger object.]
	 */
	constructor(a_clazz_name) {
		super(a_clazz_name);
	}

	/** OVERRIDE */
	_isLogEnabled() {
		return LogfjsConfig.logfjsIsDebugEnabled();
	}

}