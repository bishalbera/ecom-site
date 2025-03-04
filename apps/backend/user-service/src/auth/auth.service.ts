import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthResult } from 'src/types/authResult';
import * as bcrypt from 'bcryptjs';
import { SignInData } from 'src/types/signInData';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  async validateUser(authInputDto: AuthInputDto): Promise<SignInData> {
    const user = await this.userService.findByEmail(authInputDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatched = await bcrypt.compare(
      authInputDto.password,
      user.password,
    );
    if (passwordMatched) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async signPayload(user: SignInData): Promise<AuthResult> {
    const payload = { sub: user.id, name: user.name, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken, name: user.name, email: user.email, id: user.id,
    }
    
  }
  async login(authInputDto: AuthInputDto): Promise<AuthResult> {
    const user = await this.validateUser(authInputDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return this.signPayload(user);
  }
}
