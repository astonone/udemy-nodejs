import { User } from '../user.entity';
import { UserModel } from '@prisma/client';

export interface IUserRepository {
	create: (user: User) => Promise<UserModel>;
	findByEmail: (email: string) => Promise<UserModel | null>;
	findById: (userId: number) => Promise<UserModel | null>;
}
