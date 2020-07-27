export class LogfjsTimestampMode {
	/** @type {ENUM} ['NONE' mode - Disable timestamp functionality;] */	
	static NONE = "NONE";
	/** @type {ENUM} ['ONLY_TIME' mode - Only print time (without date) in timestamp log message;] */
	static ONLY_TIME = "ONLY_TIME";
	/** @type {ENUM} ['ONLY_DATE' mode - Only print date (without time) in timestamp log message;] */
	static ONLY_DATE = "ONLY_DATE";
	/** @type {ENUM} ['FULL' mode - Print date and time in timestamp log message;] */
	static FULL = "FULL";

	/** @type {Array} [Array holds all available timestamp modes;] */
	static TimestampModes = [this.NONE, this.ONLY_TIME, this.ONLY_DATE, this.FULL];
}