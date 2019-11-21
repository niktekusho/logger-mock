import {expectType} from 'tsd';
import LoggerMock = require('.');

const logger = new LoggerMock();

expectType<LoggerMock>(logger);

expectType<Set<string>>(LoggerMock.allowedLogFunctions);
expectType<Set<string>>(LoggerMock.allowedLogTypes);

expectType<void>(logger.debug('something'));
expectType<void>(logger.error(new Error('something')));
expectType<void>(logger.info({someObject: 'a'}));
expectType<void>(logger.log('something'));
expectType<void>(logger.trace('something'));
expectType<void>(logger.warn('something'));

expectType<boolean>(logger.hasLogs());
expectType<boolean>(logger.hasSpecificLogMessage('something'));
expectType<boolean>(logger.hasSpecificLogMessage('something', {type: 'error'}));
expectType<void>(logger.reset());
