import {Logfjs} from './Logfjs.js';
import {LogfjsLoggerLevels} from './LogfjsLoggerLevels.js';
import {LogfjsCustomizer} from './LogfjsCustomizer.js';
import {LogfjsConfig} from './LogfjsConfig.js';
import {LogfjsProperties} from './LogfjsProperties.js';
import {LogfjsFactory} from './LogfjsFactory.js';
import {SpecialLogfjs} from './SpecialLogfjs.js';

//Create singleton instances
/** @type {LogfjsConfig} [Singleton instance of {Log4jsConfig} class;] */
const logfjsConfig = new LogfjsConfig();
/** @type {LogfjsFactory} [Singleton instace of {Log4jsFactory} class;] */
const logfjsFactory = new LogfjsFactory();

export {Logfjs, LogfjsLoggerLevels, LogfjsCustomizer, LogfjsConfig, LogfjsProperties, LogfjsFactory};