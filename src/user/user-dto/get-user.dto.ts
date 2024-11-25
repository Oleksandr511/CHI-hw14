import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  @IsString()
  @IsOptional()
  id: string;
}
