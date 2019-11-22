# logger-mock

![](https://img.shields.io/github/license/niktekusho/logger-mock.svg) [![](https://img.shields.io/npm/v/logger-mock.svg)](https://www.npmjs.com/package/logger-mock) [![](https://github.com/niktekusho/logger-mock/workflows/Build%20Status/badge.svg)](https://github.com/niktekusho/logger-mock/actions) [![](https://img.shields.io/node/v/logger-mock.svg)](https://www.npmjs.com/package/logger-mock) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![](https://img.shields.io/bundlephobia/minzip/logger-mock.svg)](https://bundlephobia.com/result?p=logger-mock)

> Basic logger mock for testing purposes

## Installation

**Note:** this library needs [Node.js](https://nodejs.org/) and a console you can type in commands (PowerShell on Windows, Terminal on macOS and your favorite terminal emulator on every other OS). The **minimum required version** of Node.js is: [8 - codename "Carbon"](https://github.com/nodejs/Release#release-schedule).

In your console, run the following command:

```sh
$ npm install logger-mock
```

You can also use `yarn` (like we do in this project):

```sh
$ yarn add logger-mock
```

## Usage

The library exports the LoggerMock class. Each instance of LoggerMock is independent of each other.

```js
const LoggerMock = require('logger-mock');

const logger = new LoggerMock();

logger.info('some info');
logger.warn('a warning');

// Check if the logger has log records
logger.hasLogs(); // returns true
// Is a log record with message 'a' of any type present? no
logger.hasSpecificLogMessage('a'); // returns false
// Is a log record with message 'a warning' of any type present? yes
logger.hasSpecificLogMessage('a warning'); // returns true
// Is a log record with message 'a warning' of type 'info' present? no
logger.hasSpecificLogMessage('a warning', {type: 'info'}); // returns false
// Is a log record with message 'a warning' of type 'warn' present? yes
logger.hasSpecificLogMessage('a warning', {type: 'warn'}); // returns true

// Loop all over the records
for (const log of logger) {
    // Do something with log...
}

// Clear all log records
logger.reset();
logger.hasLogs(); // returns false

```

Each log record has a type which matches the function name that called it.

|Function           |Log record type|
|`logger.debug(...)`|debug          |
|`logger.error(...)`|error          |
|`logger.info(...)` |info           |
|`logger.log(...)`  |log            |
|`logger.warn(...)` |warn           |
|`logger.trace(...)`|trace          |

## API

### LoggerMock

#### constructor()

Create a new empty logger instance.

#### LoggerMock.allowedLogFunctions

Type: `Set<string>`;

Readonly Set containing the supported log functions.

#### LoggerMock.allowedLogTypes

Type: `Set<string>`;

Readonly Set containing the supported log types.
By default extends allowedLogFunctions by adding the `all` type.

#### debug(...args: unknown[])

Param: `args` Whatever arguments you want to be logged

Add a new log of tpye `debug` in the logs list.

#### error(...args: unknown[])

Param: `args` Whatever arguments you want to be logged

Add a new log of type `error` in the logs list.

#### info(...args: unknown[])

Param: `args` Whatever arguments you want to be logged

Add a new log of type `info` in the logs list.

#### log(...args: unknown[])

Param: `args` Whatever arguments you want to be logged

Add a new log of type `log` in the logs list.

#### trace(...args: unknown[])

Param: `args` Whatever arguments you want to be logged

Add a new log of type `trace` in the logs list.

#### warn(...args: unknown[])

Param: `args` Whatever arguments you want to be logged

Add a new log of type `warn` in the logs list.

#### reset()

Remove all log entries in the logs list of this instance.

#### hasLogs()

Returns: `boolean`

Returns `true` if this logger instance has log entries, `false` otherwise.

#### hasSpecificLogMessage(msg, opts?)

Param: `msg` Specific message to search
Param: `opts` Optional object that restricts log types. Default: `{type: 'all'}`.
Throws: `Error` if the specified type is not known by the logger.
Returns: `boolean`

This function lets you query the logs list in order to find a particular log instance.
You can specify the type of logs you want to query into. By default the function queries all log records, regardless of the type.
For each log record, this function looks for `string` equality of each record's arguments.
If an argument is an instance of `Error`, then the error message is compared instead.
