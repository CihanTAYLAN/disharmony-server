import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('servers')
@Controller('servers')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new server' })
  @ApiResponse({ status: 201, description: 'Server has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createServerDto: CreateServerDto) {
    return this.serverService.create(createServerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all servers' })
  @ApiResponse({ status: 200, description: 'Return all servers.' })
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a server by id' })
  @ApiResponse({ status: 200, description: 'Return the server.' })
  @ApiResponse({ status: 404, description: 'Server not found.' })
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a server' })
  @ApiResponse({ status: 200, description: 'Server has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Server not found.' })
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(id, updateServerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a server' })
  @ApiResponse({ status: 200, description: 'Server has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Server not found.' })
  remove(@Param('id') id: string) {
    return this.serverService.remove(id);
  }

  @Post(':id/members/:userId')
  @ApiOperation({ summary: 'Add a member to a server' })
  @ApiResponse({ status: 201, description: 'Member has been successfully added to the server.' })
  @ApiResponse({ status: 404, description: 'Server or user not found.' })
  addMember(
    @Param('id') serverId: string,
    @Param('userId') userId: string,
    @Body('role') role?: string,
  ) {
    return this.serverService.addMember(serverId, userId, role);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove a member from a server' })
  @ApiResponse({ status: 200, description: 'Member has been successfully removed from the server.' })
  @ApiResponse({ status: 404, description: 'Server member not found.' })
  removeMember(
    @Param('id') serverId: string,
    @Param('userId') userId: string,
  ) {
    return this.serverService.removeMember(serverId, userId);
  }
}
