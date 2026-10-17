import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface UserPresence {
  userId: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  customStatus?: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'presence',
})
export class PresenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private userPresence: Map<string, UserPresence> = new Map();

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.userPresence.set(userId, {
        userId,
        status: 'online',
      });
      this.broadcastUserPresence(userId);
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.userPresence.set(userId, {
        userId,
        status: 'offline',
      });
      this.broadcastUserPresence(userId);
    }
  }

  @SubscribeMessage('updateStatus')
  async handleUpdateStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { status: 'online' | 'idle' | 'dnd' | 'offline'; customStatus?: string },
  ) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.userPresence.set(userId, {
        userId,
        status: data.status,
        customStatus: data.customStatus,
      });
      this.broadcastUserPresence(userId);
    }
  }

  @SubscribeMessage('getOnlineUsers')
  async handleGetOnlineUsers() {
    return Array.from(this.userPresence.values());
  }

  private broadcastUserPresence(userId: string) {
    const presence = this.userPresence.get(userId);
    if (presence) {
      this.server.emit('presenceUpdate', presence);
    }
  }
}
