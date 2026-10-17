import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { VoiceGateway } from './voice.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, VoiceGateway, PrismaService],
  exports: [RoomService],
})
export class RoomModule {}
