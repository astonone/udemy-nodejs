import {App} from './app.js';
import {LoggerService} from './logger/logger.service.js';
import {UsersController} from './users/users.controller.js';
import {ExceptionFilter} from './errors/exception.filter.js';

async function bootstrap() {
    const loggerService = new LoggerService();
    const app = new App(
        loggerService,
        new UsersController(loggerService),
        new ExceptionFilter(loggerService));
    await app.init();
}

bootstrap();