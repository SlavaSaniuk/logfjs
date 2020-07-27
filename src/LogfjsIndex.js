import {Logfjs} from './Logfjs.js';
import {LogfjsLoggerLevels} from './LogfjsLoggerLevels.js';
import {LogfjsCustomizer} from './LogfjsCustomizer.js';
import {LogfjsConfig} from './LogfjsConfig.js';
import {LogfjsProperties} from './LogfjsProperties.js';
import {LogfjsFactory} from './LogfjsFactory.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';
import {LogfjsTimestamp} from './LogfjsTimestamp.js';
import {LogfjsTimestampMode} from './LogfjsTimestampMode.js';

// Create singleton instances
/** @type {LogfjsConfig} [Singleton instance of {Log4jsConfig} class;] */
const logfjsConfigSingleton = new LogfjsConfig();
/** @type {LogfjsFactory} [Singleton instace of {Log4jsFactory} class;] */
const logfjsFactorySingleton = new LogfjsFactory();
/** @type {LogfjsTimestamp} [Singleton instance of {LogfjsTimestamp} class;] */
const logfjsTimestampSingleton = new LogfjsTimestamp(logfjsConfigSingleton.getDefaultProperties().getTimestampMode());

// Export classes:
export {Logfjs, LogfjsLoggerLevels, LogfjsCustomizer, LogfjsConfig, LogfjsFactory, LogfjsTimestampMode};