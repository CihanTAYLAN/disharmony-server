import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ServerModule,
    RoomModule,
    MessageModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
