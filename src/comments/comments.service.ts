import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(text: { text: string }, exhibitId: string, userId: string) {
    console.log('mytext', text.text);
    return this.prisma.comment.create({
      data: {
        text: text.text,
        exhibitId: exhibitId,
        userId: userId,
      },
    });
  }

  findExhibitComments(exhibitId: string) {
    return this.prisma.exhibits.findMany({
      where: {
        id: exhibitId,
      },
      select: {
        Comment: true,
      },
    });
  }

  async remove(exhibitId: string, commentId: string) {
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return { message: 'Comment deleted' };
  }
}
