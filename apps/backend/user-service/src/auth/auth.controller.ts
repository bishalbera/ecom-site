import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthInputDto } from './dto/auth-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  login(@Body() authInputDto: AuthInputDto) {
    return this.authService.login(authInputDto);
  }
}
