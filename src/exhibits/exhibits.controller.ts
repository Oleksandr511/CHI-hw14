import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Exhibits')
@Controller('api/exhibits')
@UseGuards(JwtAuthGuard)
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createExhibitDto: CreateExhibitDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 2000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        exceptionFactory: (errors) => {
          console.log(errors);
          throw new BadRequestException('File validation failed');
        },
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ) {
    createExhibitDto.image = file.buffer.toString('base64');
    await this.exhibitsService.create(createExhibitDto, req.user.id);
    return { message: 'Exhibit created' };
  }

  @Get()
  findAllExhibits() {
    return this.exhibitsService.findAll();
  }

  @Get('post/:id')
  findOne(@Param('id') id: string) {
    return this.exhibitsService.findOne(id);
  }

  @Get('my-posts')
  findMyPosts(@Request() req) {
    return this.exhibitsService.findMyPosts(req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.exhibitsService.remove(id);
    return { message: 'Exhibit deleted' };
  }
}
