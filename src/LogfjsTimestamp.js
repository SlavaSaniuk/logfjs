import {LogfjsTimestampMode} from './LogfjsTimestampMode.js';

/** 
 * //////////////////////
 * /// SINGLETON ////////
 * //////////////////////
 */
export class LogfjsTimestamp {

	/** @type {Char} [Separate data time character;] */
	static DATE_TIME_SEPARATOR = 'T';
	/** @type {[LogfjsTimestampMode]} [Default timestamp mode;] */
	#default_timestamp_mode = null;
	/** @type {[LogfjsTimestamp<ode]} [Current timestamp mode;] */
	#timestamp_mode = null;

	constructor(a_timestamp_mode) {

		// Singleton pattern
		if (LogfjsTimestamp.INSTANSE instanceof LogfjsTimestamp)
			return LogfjsTimestamp.INSTANSE;
		LogfjsTimestamp.INSTANSE = this;

		// Map default timestamp mode:
		this.#default_timestamp_mode = a_timestamp_mode;

		// Freeze vars:
		Object.freeze(this.DATE_TIME_SEPARATOR); //Freeze date/time separator;
	}

	/**  
	 * [getInstance - Return singleton instance of {LogfjsTimestamp} class.]
	 * @return {[LogfjsTimestamp]} [Singleton instance of {LogfjsTimestamp} class.]
	 */
	static getInstance() {
		return LogfjsTimestamp.INSTANSE;
	}

	/**
	 * [get - Get current timestamp.]
	 * @return {[String]} [Curent timestamp.]
	 */
	static get() {
		return LogfjsTimestamp.getInstance()._get();
	}

	/**  
	 * [_get - Get current timestamp.]
	 * @return {[String]} [Current timestamp.]
	 */
	_get() {
		return this._getTimestampWithMode(new Date(), this._getTimestampModeOrDefault());
	}

	_getTimestampWithMode(a_date, a_mode) {
		switch (a_mode) {
			case LogfjsTimestampMode.NONE:
				return "";
				break;
			case LogfjsTimestampMode.ONLY_DATE:
				return this._getDate(a_date);
				break;
			case LogfjsTimestampMode.ONLY_TIME:
				return this._getTime(a_date);
				break;
			case LogfjsTimestampMode.FULL:
				return this._getDate(a_date) +LogfjsTimestamp.DATE_TIME_SEPARATOR +this._getTime(a_date);
				break; 
		}
	}

	/**
	 * [_getTime - Return time string of a_date parameter.]
	 * @param  {[Date]} a_date [JS date object.]
	 * @return {[String]}        [Time string of specified date parameter.]
	 */
	_getTime(a_date) {
		return a_date.getHours() +":" +a_date.getMinutes() +":" +a_date.getSeconds() +":" +a_date.getMilliseconds();
	}

	/**
	 * [_getDate Return date staring of a_date parameter.]
	 * @param  {[Date]} a_date [JS date object.]
	 * @return {[String]}        [Date string of specifed date parameter.]
	 */
	_getDate(a_date) {
		return a_date.getFullYear() +"-" +a_date.getMonth() +"-" +a_date.getDate();
	}

	_getTimestampModeOrDefault() {
		// Check if timestamp mode not null:
		if (this.#timestamp_mode == null)
			return this.#default_timestamp_mode;
		return this.#timestamp_mode;
	}

	_setTimestampMode(a_mode) {
		// Map timestamp mode:
		this.#timestamp_mode = a_mode;
	}

}