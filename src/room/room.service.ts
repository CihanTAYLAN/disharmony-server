import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: createRoomDto,
    });
  }

  async findAll() {
    return this.prisma.room.findMany({
      include: {
        server: true,
        messages: {
          include: {
            sender: true,
          },
        },
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        server: true,
        messages: {
          include: {
            sender: true,
          },
        },
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }

  async addParticipant(roomId: string, userId: string) {
    return this.prisma.roomParticipant.create({
      data: {
        roomId,
        userId,
      },
    });
  }

  async removeParticipant(roomId: string, userId: string) {
    return this.prisma.roomParticipant.update({
      where: {
        id: `${roomId}_${userId}`,
      },
      data: {
        leftAt: new Date(),
      },
    });
  }
}
