import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'messages',
})
export class MessageGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.join(`room-${roomId}`);
    const messages = await this.messageService.findByRoom(roomId);
    return messages;
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.leave(`room-${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const message = await this.messageService.create(createMessageDto);
    this.server.to(`room-${createMessageDto.roomId}`).emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; username: string },
  ) {
    client.broadcast
      .to(`room-${data.roomId}`)
      .emit('userTyping', { username: data.username });
  }

  @SubscribeMessage('stopTyping')
  async handleStopTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; username: string },
  ) {
    client.broadcast
      .to(`room-${data.roomId}`)
      .emit('userStoppedTyping', { username: data.username });
  }
}
