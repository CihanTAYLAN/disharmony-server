import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Return all rooms.' })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by id' })
  @ApiResponse({ status: 200, description: 'Return the room.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a room' })
  @ApiResponse({ status: 200, description: 'Room has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiResponse({ status: 200, description: 'Room has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Post(':id/participants/:userId')
  @ApiOperation({ summary: 'Add a participant to a room' })
  @ApiResponse({ status: 201, description: 'Participant has been successfully added to the room.' })
  @ApiResponse({ status: 404, description: 'Room or user not found.' })
  addParticipant(
    @Param('id') roomId: string,
    @Param('userId') userId: string,
  ) {
    return this.roomService.addParticipant(roomId, userId);
  }

  @Delete(':id/participants/:userId')
  @ApiOperation({ summary: 'Remove a participant from a room' })
  @ApiResponse({ status: 200, description: 'Participant has been successfully removed from the room.' })
  @ApiResponse({ status: 404, description: 'Room participant not found.' })
  removeParticipant(
    @Param('id') roomId: string,
    @Param('userId') userId: string,
  ) {
    return this.roomService.removeParticipant(roomId, userId);
  }
}
