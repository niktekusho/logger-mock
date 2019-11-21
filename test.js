'use strict';

const LoggerMock = require('.');

describe('General features', () => {
	const logger = new LoggerMock();

	afterEach(() => {
		logger.reset();
	});

	test('new logger should be empty', () => {
		expect(new LoggerMock().logs).toHaveLength(0);
		expect(new LoggerMock().hasLogs()).toBeFalsy();
	});

	test('should log whatever we pass in', () => {
		for (const fnName of LoggerMock.allowedLogFunctions) {
			logger[fnName]('Some log message', 1);

			expect(logger.logs[0]).toStrictEqual({type: fnName, args: ['Some log message', 1]});
			expect(logger.hasLogs()).toBeTruthy();
			logger.reset();
		}
	});

	test('should be resettable', () => {
		logger.log('Some log', 1);

		expect(logger.hasLogs()).toBeTruthy();
		logger.reset();
		expect(logger.hasLogs()).toBeFalsy();
	});

	test('should be iterable with for..of and each log object should be immutable', () => {
		logger.log('Some log');
		logger.log('Some log');
		logger.log('Some log');

		for (const log of logger) {
			expect(log.type).toStrictEqual('log');

			expect(() => {
				log.type = 'a';
			}).toThrowError('Cannot assign to read only property \'type\' of object \'#<Object>\'');
		}
	});
});

describe('Query features', () => {
	const logger = new LoggerMock();

	beforeAll(() => {
		logger.log('Some log', 1);
		logger.warn('Some warn');
		logger.error(new Error('An error'));
		logger.info(1, 'Some info');
	});

	test('should be able to find log with the specific message, regardless of the type', () => {
		expect(logger.hasSpecificLogMessage('Some log')).toBeTruthy();
		expect(logger.hasSpecificLogMessage('Some warn')).toBeTruthy();
		expect(logger.hasSpecificLogMessage('An error')).toBeTruthy();
		expect(logger.hasSpecificLogMessage('Some info')).toBeTruthy();
		expect(logger.hasSpecificLogMessage('this should not be logged')).toBeFalsy();
	});

	test('should throw if the specified type is not known', () => {
		expect(() => logger.hasSpecificLogMessage('a', {type: 'a'})).toThrowError('Unknown log type \'a\'.');
	});

	test('should be able to find log with the specific message only of the specific type', () => {
		expect(logger.hasSpecificLogMessage('Some warn', {type: 'warn'})).toBeTruthy();
		expect(logger.hasSpecificLogMessage('Some warn', {type: 'log'})).toBeFalsy();
	});
});
