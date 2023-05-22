import {BaseController} from '../common/base.controller.js';
import {LoggerService} from '../logger/logger.service.js';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../errors/http-error.class.js';

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
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