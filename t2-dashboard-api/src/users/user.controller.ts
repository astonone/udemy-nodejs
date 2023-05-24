import {BaseController} from "../common/base.controller.js";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error.class.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types.js";
import {ILogger} from "../logger/logger.interface.js";
import "reflect-metadata";
import {IUserController} from "./user.controller.interface.js";

@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login}
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        //this.ok(res, {user: 'test'});
        next(new HttpError(401, 'Auth error', 'login'));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, {username: 'superuser', email: 'test@gmail.com'});
    }
}