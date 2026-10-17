import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServerDto {
  @ApiProperty({ description: 'Name of the server' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the server', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID of the server owner' })
  @IsString()
  ownerId: string;
}
