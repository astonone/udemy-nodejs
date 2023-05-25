import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.loggerService.error('Error while reading .env or file is absent');
		} else {
			this.loggerService.log('Configuration from .env was loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T>(key: string): T {
		return this.config[key] as T;
	}
}
