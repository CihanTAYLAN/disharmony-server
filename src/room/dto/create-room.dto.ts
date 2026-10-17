import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { RoomType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ description: 'Name of the room' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type of the room (TEXT/VOICE)', enum: RoomType })
  @IsEnum(RoomType)
  type: RoomType;

  @ApiProperty({ description: 'ID of the server this room belongs to' })
  @IsString()
  serverId: string;

  @ApiProperty({ description: 'Whether screen sharing is enabled', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  screenSharingEnabled?: boolean;

  @ApiProperty({ description: 'Whether video is enabled', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  videoEnabled?: boolean;
}
