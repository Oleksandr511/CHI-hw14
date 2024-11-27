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
  FileTypeValidator,
  BadRequestException,
  UseInterceptors,
  Request,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from 'src/file/file.service';

@ApiTags('Exhibits')
@Controller('api/exhibits')
@UseGuards(JwtAuthGuard)
export class ExhibitsController {
  constructor(
    private readonly exhibitsService: ExhibitsService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createExhibitDto: CreateExhibitDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50000 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg)/ }),
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
    const url = await this.fileService.uploadFile(
      file.buffer,
      file.originalname,
    );
    createExhibitDto.image = url;
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
