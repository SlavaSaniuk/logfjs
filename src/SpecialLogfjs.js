import {Logfjs} from './Logfjs.js'; 
import {LogfjsConfig} from './LogfjsConfig.js';

export class SpecialLogfjs extends Logfjs {

	constructor(a_clazz_name) {
		super(a_clazz_name);
	}

	_isLogEnabled() {
		return LogfjsConfig.logfjsIsDebugEnabled();
	}

}