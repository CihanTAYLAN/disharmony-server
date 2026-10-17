import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Content of the message' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID of the room where the message is sent' })
  @IsString()
  roomId: string;

  @ApiProperty({ description: 'ID of the user who sent the message' })
  @IsString()
  senderId: string;
}
