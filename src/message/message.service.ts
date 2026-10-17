import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: createMessageDto,
      include: {
        sender: true,
        room: true,
      },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      include: {
        sender: true,
        room: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: true,
        room: true,
      },
    });
  }

  async findByRoom(roomId: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      include: {
        sender: true,
        room: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
      include: {
        sender: true,
        room: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
