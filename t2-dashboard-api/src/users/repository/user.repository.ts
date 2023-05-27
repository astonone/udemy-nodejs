import { IUserRepository } from './user.repository.interface';
import { User } from '../entity/user.entity';
import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async findByEmail(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	async findById(userId: number): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				id: userId,
			},
		});
	}
}
