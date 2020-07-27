import {LogfjsTimestampMode} from './LogfjsTimestampMode.js';

/** 
 * Common entrypoint to gets and configure timestamp functionality.
 * Class designed with singleton pattern. Use {get()} static method 
 * to get current timestamp.
 */
export class LogfjsTimestamp {

	/** @type {Char} [Separate data time character;] */
	static DATE_TIME_SEPARATOR = 'T';
	/** @type {[LogfjsTimestampMode]} [Default timestamp mode;] */
	#default_timestamp_mode = null;
	/** @type {[LogfjsTimestamp<ode]} [Current timestamp mode;] */
	#timestamp_mode = null;

	/**  
	 * [constructor - Construct new {LogfjsTimestamp} singleton instance.]
	 * @param  {[LogfjsTimestampMode]} a_timestamp_mode [Default timestamp mode.]
	 * @return {[LogfjsTimestamp]} [{LogfjsTimestamp} singleton instance.]
	 */
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
		// Return current instance
		return LogfjsTimestamp.INSTANSE;
	}

	/**
	 * [get - Get current timestamp.]
	 * @return {[String]} [Curent timestamp.]
	 */
	static get() {
		// Return current timestamp:
		return LogfjsTimestamp.getInstance()._get();
	}

	/**  
	 * [_get - Get current timestamp.]
	 * @return {[String]} [Current timestamp.]
	 */
	_get() {
		// Return current timestamp with specified mode:
		return this._getTimestampWithMode(new Date(), this._getTimestampModeOrDefault());
	}

	/**
	 * [_getTimestampWithMode - Return current timestamp with specified mode.]
	 * @param  {[Date]} a_date [Current data object.]
	 * @param  {[LogfjsTimestampMode]} a_mode [Timestamp mode.]
	 * @return {[String]}        [Current timestamp string with specified mode.]
	 */
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
		// Return only time string from specified date:
		return a_date.getHours() +":" +a_date.getMinutes() +":" +a_date.getSeconds() +":" +a_date.getMilliseconds();
	}

	/**
	 * [_getDate Return date staring of a_date parameter.]
	 * @param  {[Date]} a_date [JS date object.]
	 * @return {[String]}        [Date string of specifed date parameter.]
	 */
	_getDate(a_date) {
		// Return only date string from specified date:
		return a_date.getFullYear() +"-" +a_date.getMonth() +"-" +a_date.getDate();
	}

	/**  
	 * [_getTimestampModeOrDefault - Return current timestamp mode or default timestamp mode,
	 * if current timestamp mode is not set.]
	 * @return {[LogfjsTimestampMode]} [Timestamp mode.]
	 */
	_getTimestampModeOrDefault() {
		// Check if timestamp mode not null:
		if (this.#timestamp_mode == null)
			return this.#default_timestamp_mode;
		return this.#timestamp_mode;
	}

	/**  
	 * [_setTimestampMode - Set current timestamp mode.]
	 * @param {[LogfjsTimestampMode]} a_mode [Timestamp mode.]
	 */
	_setTimestampMode(a_mode) {
		// Map timestamp mode:
		this.#timestamp_mode = a_mode;
	}

}