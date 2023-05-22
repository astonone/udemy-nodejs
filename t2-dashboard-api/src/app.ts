import express, {Express} from 'express';
import {Server} from 'http';
import {LoggerService} from './logger/logger.service.js';
import {UsersController} from './users/users.controller.js';
import {ExceptionFilter} from './errors/exception.filter.js';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    usersController: UsersController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: LoggerService, usersController: UsersController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.usersController = usersController;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.usersController.router);
    }

    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started on http://localhost:${this.port}`);
    }
}