import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'voice',
})
export class VoiceGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('joinVoiceRoom')
  async handleJoinVoiceRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    const { roomId, userId } = data;
    await this.roomService.addParticipant(roomId, userId);
    client.join(`voice-${roomId}`);
    
    // Notify others in the room
    client.broadcast
      .to(`voice-${roomId}`)
      .emit('userJoinedVoice', { userId, socketId: client.id });
    
    return { message: 'Joined voice room', participants: await this.roomService.findOne(roomId) };
  }

  @SubscribeMessage('leaveVoiceRoom')
  async handleLeaveVoiceRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    const { roomId, userId } = data;
    await this.roomService.removeParticipant(roomId, userId);
    client.leave(`voice-${roomId}`);
    
    // Notify others in the room
    client.broadcast
      .to(`voice-${roomId}`)
      .emit('userLeftVoice', { userId, socketId: client.id });
  }

  @SubscribeMessage('startScreenShare')
  async handleStartScreenShare(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    const { roomId } = data;
    client.broadcast
      .to(`voice-${roomId}`)
      .emit('userStartedScreenShare', { userId: data.userId, socketId: client.id });
  }

  @SubscribeMessage('stopScreenShare')
  async handleStopScreenShare(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    const { roomId } = data;
    client.broadcast
      .to(`voice-${roomId}`)
      .emit('userStoppedScreenShare', { userId: data.userId, socketId: client.id });
  }

  @SubscribeMessage('toggleMute')
  async handleToggleMute(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string; isMuted: boolean },
  ) {
    const { roomId } = data;
    client.broadcast
      .to(`voice-${roomId}`)
      .emit('userToggleMute', { userId: data.userId, isMuted: data.isMuted });
  }

  @SubscribeMessage('toggleVideo')
  async handleToggleVideo(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string; isVideoOn: boolean },
  ) {
    const { roomId } = data;
    client.broadcast
      .to(`voice-${roomId}`)
      .emit('userToggleVideo', { userId: data.userId, isVideoOn: data.isVideoOn });
  }
}
