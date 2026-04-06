'use strict';

const levels = {
	silly: 0,
	verbose: 1,
	info: 2,
	http: 2,
	warn: 3,
	error: 4,
};

class Logger {
	constructor() {
		this.level = levels.info;
		this.heading = 'node-pre-gyp';
	}

	setLevel(levelName) {
		if (typeof levelName === 'number') {
			this.level = levelName;
		} else if (levelName in levels) {
			this.level = levels[levelName];
		}
	}

	shouldLog(levelName) {
		return levels[levelName] !== undefined && levels[levelName] >= this.level;
	}

	_format(levelName, prefix, message, ...args) {
		const timestamp = new Date().toISOString();
		const parts = [timestamp];

		if (levelName === 'error') {
			parts.push(`${levelName.toUpperCase()}`);
		}

		if (prefix) {
			parts.push(`${prefix}`);
		}

		let msg = message;
		if (args.length > 0) {
			// Simple sprintf-like replacement
			let argIndex = 0;
			msg = message.replace(/%s/g, () => {
				return argIndex < args.length ? args[argIndex++] : '%s';
			});
			if (argIndex < args.length) {
				msg += ' ' + args.slice(argIndex).join(' ');
			}
		}

		parts.push(msg);
		return parts.join(' ');
	}

	silly(prefix, message, ...args) {
		if (this.shouldLog('silly')) {
			console.error(this._format('silly', prefix, message, ...args));
		}
	}

	verbose(prefix, message, ...args) {
		if (this.shouldLog('verbose')) {
			console.error(this._format('verbose', prefix, message, ...args));
		}
	}

	info(prefix, message, ...args) {
		if (this.shouldLog('info')) {
			if (typeof prefix === 'string' && message === undefined) {
				// info(message) form
				console.log(prefix);
			} else {
				// info(prefix, message) form
				console.log(this._format('info', prefix, message, ...args));
			}
		}
	}

	http(prefix, message, ...args) {
		if (this.shouldLog('http')) {
			console.log(this._format('http', prefix, message, ...args));
		}
	}

	warn(prefix, message, ...args) {
		if (this.shouldLog('warn')) {
			if (typeof message === 'undefined') {
				// warn(message) form
				console.warn(prefix);
			} else {
				// warn(prefix, message) form
				console.warn(this._format('warn', prefix, message, ...args));
			}
		}
	}

	error(prefix, message, ...args) {
		if (typeof message === 'undefined') {
			// error(message) form
			console.error(prefix);
		} else {
			// error(prefix, message) form
			console.error(this._format('error', prefix, message, ...args));
		}
	}

	// Aliases for compatibility
	disableColor() {
		// no-op for compatibility
	}

	disableProgress() {
		// no-op for compatibility
	}

	resume() {
		// no-op for compatibility
	}
}

module.exports = new Logger();
