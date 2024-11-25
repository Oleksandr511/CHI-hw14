import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from './auth-dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { name: loginDto.name },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const tokens = await this.generateTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(id: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id },
        { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '15m' },
      ),

      this.jwtService.signAsync(
        { sub: id },
        { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '30d' },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
