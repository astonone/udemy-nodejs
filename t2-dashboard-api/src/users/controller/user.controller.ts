import { BaseController } from '../../common/controller/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { IUserService } from '../service/user.service.interface';
import { ValidateMiddleware } from '../../common/middleware/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../../config/config.service.interface';
import { AuthGuard } from '../../common/middleware/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/:userId',
				method: 'get',
				func: this.getById,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HttpError(401, 'Auth error, email or password are incorrect', 'User login'));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpError(422, 'User already exists', 'User registration'));
		}
		this.ok(res, { id: result.id, email: result.email, name: result.name });
	}

	async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userId = req.params['userId'];
		const result = await this.userService.getUserById(Number(userId));
		if (!result) {
			return next(new HttpError(404, `User with id=${userId} was not found`, 'User getById'));
		}
		this.ok(res, { id: result.id, email: result.email, name: result.name });
	}
}
