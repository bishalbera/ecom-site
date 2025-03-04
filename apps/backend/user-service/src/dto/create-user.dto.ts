import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
