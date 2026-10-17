import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({ status: 201, description: 'Message has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'Return all messages.' })
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a message by id' })
  @ApiResponse({ status: 200, description: 'Return the message.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get all messages in a room' })
  @ApiResponse({ status: 200, description: 'Return all messages in the specified room.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  findByRoom(@Param('roomId') roomId: string) {
    return this.messageService.findByRoom(roomId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a message' })
  @ApiResponse({ status: 200, description: 'Message has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({ status: 200, description: 'Message has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
