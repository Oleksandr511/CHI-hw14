import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitDto {
  @ApiProperty({
    description: 'Exhibit name',
    example: 'The Mona Lisa',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Exhibit image file',
  })
  image: string;
}
