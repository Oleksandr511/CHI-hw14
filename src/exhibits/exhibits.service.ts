import { Injectable } from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExhibitsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createExhibitDto: CreateExhibitDto, userId: string) {
    await this.prisma.exhibits.create({
      data: {
        ...createExhibitDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.exhibits.findMany();
  }

  findOne(id: string) {
    return this.prisma.exhibits.findUnique({
      where: {
        id,
      },
    });
  }

  findMyPosts(userId: string) {
    return this.prisma.exhibits.findMany({
      where: {
        userId,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.exhibits.delete({
      where: {
        id,
      },
    });
  }
}
