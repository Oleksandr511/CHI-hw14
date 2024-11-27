import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.emit('notifications', 'Hello from gateway');
  }

  @SubscribeMessage('notifications')
  onNewNotification(client: Socket) {
    client.emit('notifications', 'new post created');
  }
}
