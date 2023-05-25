import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'Password was not passed' })
	password: string;

	@IsString({ message: 'Name was not passed' })
	name: string;
}
