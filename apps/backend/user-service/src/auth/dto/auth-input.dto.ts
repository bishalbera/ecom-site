import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthInputDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
