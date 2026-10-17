import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
