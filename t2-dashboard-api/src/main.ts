import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service.js";
import {UserController} from "./users/user.controller.js";
import {ExceptionFilter} from "./errors/exception.filter.js";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/logger.interface.js";
import {TYPES} from "./types.js";
import {IExceptionFilter} from "./errors/exception.filter.interface.js";
import {IUserController} from "./users/user.controller.interface.js";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<IUserController>(TYPES.UserController).to(UserController);
    bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return {app, appContainer};
}

export const {app, appContainer} = bootstrap();