import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  async create(createServerDto: CreateServerDto) {
    return this.prisma.server.create({
      data: createServerDto,
    });
  }

  async findAll() {
    return this.prisma.server.findMany({
      include: {
        owner: true,
        rooms: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.server.findUnique({
      where: { id },
      include: {
        owner: true,
        rooms: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: string, updateServerDto: UpdateServerDto) {
    return this.prisma.server.update({
      where: { id },
      data: updateServerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.server.delete({
      where: { id },
    });
  }

  async addMember(serverId: string, userId: string, role: string = 'member') {
    return this.prisma.serverMember.create({
      data: {
        serverId,
        userId,
        role,
      },
    });
  }

  async removeMember(serverId: string, userId: string) {
    return this.prisma.serverMember.delete({
      where: {
        id: `${serverId}_${userId}`,
      },
    });
  }
}
