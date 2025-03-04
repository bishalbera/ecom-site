import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    const { password, ...result } = user;
    return result;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
