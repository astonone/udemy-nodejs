import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { IUserService } from './user.service.interface';
import { IUserRepository } from '../repository/user.repository.interface';
import { TYPES } from '../../types';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UserRepositoryMock: IUserRepository = {
	create: jest.fn(),
	findByEmail: jest.fn(),
	findById: jest.fn(),
};

const container = new Container();
let userService: IUserService;
let userRepository: IUserRepository;
let configService: IConfigService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);

	userService = container.get<IUserService>(TYPES.UserService);
	userRepository = container.get<IUserRepository>(TYPES.UserRepository);
	configService = container.get<IConfigService>(TYPES.ConfigService);
});

let createdUser: UserModel | null;

describe('UserService', () => {
	it('should createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				email: user.email,
				name: user.name,
				password: user.password,
				id: 1,
			}),
		);

		createdUser = await userService.createUser({
			email: 'a@a.com',
			name: 'vitya',
			password: '111',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('111');
	});

	it('should getUserById', async () => {
		userRepository.findById = jest.fn().mockImplementationOnce(
			(userId: number): UserModel => ({
				email: 'a@a.com',
				name: 'vitya',
				password: 'somehash',
				id: userId,
			}),
		);

		const userById = await userService.getUserById(1);

		expect(userById?.id).toEqual(1);
	});

	it('should not validate user because user does not exist', async () => {
		const result = await userService.validateUser({
			email: 'a1@a.com',
			password: 'password1',
		});

		expect(result).toBeFalsy();
	});

	it('should not validate user when password is incorrect', async () => {
		userRepository.findByEmail = jest.fn().mockImplementationOnce(
			(userId: number): UserModel => ({
				email: 'a@a.com',
				name: 'vitya',
				password: '$2a$12$fUTlE/rjkQjBRxp1E/6wEeuwiM0FsGwx9tZKhEZrixmYjK6NVOSR1',
				id: 1,
			}),
		);

		const result = await userService.validateUser({
			email: 'a1@a.com',
			password: 'password1',
		});

		expect(result).toBeFalsy();
	});

	it('should validate user', async () => {
		userRepository.findByEmail = jest.fn().mockImplementationOnce(
			(userId: number): UserModel => ({
				email: 'a@a.com',
				name: 'vitya',
				password: '$2a$12$fUTlE/rjkQjBRxp1E/6wEeuwiM0FsGwx9tZKhEZrixmYjK6NVOSRe',
				id: 1,
			}),
		);

		const result = await userService.validateUser({
			email: 'a1@a.com',
			password: 'password1',
		});

		expect(result).toBeTruthy();
	});
});
