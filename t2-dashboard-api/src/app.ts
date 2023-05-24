import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types.js';
import { ILogger } from './logger/logger.interface.js';
import { IExceptionFilter } from './errors/exception.filter.interface.js';
import 'reflect-metadata';
import { IUserController } from './users/user.controller.interface.js';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}
}
