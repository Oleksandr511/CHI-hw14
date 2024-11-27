import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';

@ApiTags('Comments')
@Controller('api/exhibits/:exhibitId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() text: { text: string },
    @Param('exhibitId') exhibitId: string,
    @Request() req,
  ) {
    console.log('text', text);
    console.log('exhibitId', exhibitId);
    console.log('req', req.user.id);
    return this.commentsService.create(text, exhibitId, req.user.id);
  }

  @Get()
  findAllExhibitComments(@Param('exhibitId') exhibitId: string) {
    return this.commentsService.findExhibitComments(exhibitId);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('exhibitId') exhibitId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.remove(exhibitId, commentId);
  }
}
