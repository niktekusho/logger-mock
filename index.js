'use strict';

const allowedLogFunctions = Object.freeze(new Set([
	'debug',
	'error',
	'info',
	'log',
	'trace',
	'warn'
]));

const allowedLogTypes = Object.freeze(new Set([
	'all',
	...allowedLogFunctions
]));

class LoggerMock {
	constructor() {
		this.logs = [];
	}

	debug(...args) {
		this.logs.push(Object.freeze({
			type: 'debug',
			args
		}));
	}

	error(...args) {
		this.logs.push(Object.freeze({
			type: 'error',
			args
		}));
	}

	info(...args) {
		this.logs.push(Object.freeze({
			type: 'info',
			args
		}));
	}

	log(...args) {
		this.logs.push(Object.freeze({
			type: 'log',
			args
		}));
	}

	trace(...args) {
		this.logs.push(Object.freeze({
			type: 'trace',
			args
		}));
	}

	warn(...args) {
		this.logs.push(Object.freeze({
			type: 'warn',
			args
		}));
	}

	reset() {
		// TODO: do not create a new array but clear the existing one
		this.logs = [];
	}

	hasLogs() {
		return this.logs.length > 0;
	}

	hasSpecificLogMessage(msg, {type} = {type: 'all'}) {
		if (!allowedLogTypes.has(type)) {
			throw new Error(`Unknown log type '${type}'.`);
		}

		for (const op of this.logs) {
			const typeMatch = type === 'all' || op.type === type;

			if (typeMatch) {
				for (const arg of op.args) {
					if (arg === msg) {
						return true;
					}

					if (arg instanceof Error && arg.message === msg) {
						return true;
					}
				}
			}
		}

		return false;
	}

	[Symbol.iterator]() {
		// TODO: Use values() when dropping support for Node 8
		return this.logs[Symbol.iterator]();
	}
}

LoggerMock.allowedLogTypes = allowedLogTypes;
LoggerMock.allowedLogFunctions = allowedLogFunctions;

module.exports = LoggerMock;
