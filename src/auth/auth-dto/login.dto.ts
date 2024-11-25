import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongpassword123',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  password: string;
}
