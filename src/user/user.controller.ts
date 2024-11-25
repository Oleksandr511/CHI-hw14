import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './user-dto/register-user.dto';
import { Response } from 'express';
import { GetUserDto } from './user-dto/get-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async createUser(@Body() registerDto: RegisterUserDto, @Res() res: Response) {
    const tokens = await this.userService.registerUser(registerDto);
    res.send(tokens);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserByIdOrName(@Body() getUserDto: GetUserDto) {
    if (!getUserDto.id && !getUserDto.name)
      throw new Error('Provide id or name');
    return this.userService.getUser(getUserDto);
  }
}
