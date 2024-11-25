import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDto } from './user-dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        exhibits: {
          select: {
            id: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });
    return user;
  }

  async registerUser(registerDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        password: hashedPassword,
      },
    });
    const tokens = await this.authService.generateTokens(user.id);
    // const tokens = await this.generateTokens(user.id);
    await this.authService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getUser(getUserDto: { id?: string; name?: string }) {
    if (getUserDto.id) {
      return await this.findById(getUserDto.id);
    } else if (getUserDto.name) {
      return await this.prisma.user.findFirst({
        where: { name: getUserDto.name },
      });
    }
  }
}
