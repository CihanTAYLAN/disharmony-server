import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PresenceGateway } from './presence.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PresenceGateway, PrismaService],
  exports: [UserService],
})
export class UserModule {}
