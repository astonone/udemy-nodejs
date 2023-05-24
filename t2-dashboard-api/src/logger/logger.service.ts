import { ILogObj, ISettingsParam, Logger } from 'tslog';
import { ILogger } from './logger.interface.js';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	logger: Logger<ILogObj>;

	constructor() {
		const loggerSettings = {
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		};
		this.logger = new Logger(loggerSettings as ISettingsParam<ILogObj>);
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
