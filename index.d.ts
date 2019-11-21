/**
 * Class that implements a common interface for logs, useful in test environments where you don't want to use the actual log instance, may it be a simple `console.log` or a full-fledged logger instance.
 * The provided logger object is iterable with the classic `for..of` syntax.
 */
declare class LoggerMock implements Iterable<LoggerMock.LogRecord> {
	/**
	 * Create a new empty logger instance.
	 */
	constructor();

	/**
	 * Readonly Set containing the supported log functions.
	 */
	static allowedLogFunctions: Set<string>;

	/**
	 * Readonly Set containing the supported log types.
	 * By default extends allowedLogFunctions by adding the 'add' type.
	 */
	static allowedLogTypes: Set<string>;

	/**
	 * Add a new log of tpye debug in the logs list.
	 * @param args Whatever arguments you want to be logged
	 */
	debug(...args: unknown[]): void;

	/**
	 * Add a new log of type error in the logs list.
	 * @param args Whatever arguments you want to be logged
	 */
	error(...args: unknown[]): void;

	/**
	 * Add a new log of type info in the logs list.
	 * @param args Whatever arguments you want to be logged
	 */
	info(...args: unknown[]): void;

	/**
	 * Add a new log of type log in the logs list.
	 * @param args Whatever arguments you want to be logged
	 */
	log(...args: unknown[]): void;

	/**
	 * Add a new log of type trace in the logs list.
	 * @param args Whatever arguments you want to be logged
	 */
	trace(...args: unknown[]): void;

	/**
	 * Add a new log of type warn in the logs list.
	 * @param args Whatever arguments you want to be logged
	 */
	warn(...args: unknown[]): void;

	/**
	 * Remove all log entries in the logs list of this instance.
	 */
	reset(): void;

	/**
	 * @returns `true` if this logger instance has log entries.
	 */
	hasLogs(): boolean;

	/**
	 * This function lets you query the logs list in order to find a particular log instance.
	 *
	 * You can specify the type of logs you want to query into. By default the function queries all log records, regardless of the type.
	 * For each log record, this function looks for `string` equality of each record's arguments.
	 * If an argument is an instance of `Error`, then the error message is compared instead.
	 *
	 * @param msg Specific message
	 * @param type Type of log records to look for. Default: `all`.
	 * @throws Error if the specified type is not known by the logger.
	 *
	 * @returns `true` if this logger instance has the specific log "message".
	 */
	hasSpecificLogMessage(msg: string, type?: LoggerMock.HasSpecificLogMessageOptions): boolean;

	[Symbol.iterator](): Iterator<LoggerMock.LogRecord>;
}

declare namespace LoggerMock {
	/**
	 * Log record saved by a LoggerMock instance.
	 */
	export interface LogRecord {
		/**
		 * Log type.
		 */
		type: LogType,
		/**
		 * Arguments passed to the log function.
		 */
		args: unknown[]
	}

	/**
	 * Options for the hasSpecificLogMessage function.
	 */
    export interface HasSpecificLogMessageOptions {
		/**
		 * Log type to look for.
		 */
        type: LogType | 'all';
	}

	/**
	 * Supported log types.
	 */
	export type LogType = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn'
}

export = LoggerMock;
