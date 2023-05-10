import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ExternalApiService } from './external_api.service';
import { Avatar } from 'src/avatar/schema/avatar.schema';

@Controller('user')
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<any> {
    return await this.externalApiService.getUserById(userId);
  }

  @Get(':userId/avatar')
  async getUserAvatar(@Param('userId') userId: string): Promise<Avatar> {
    return await this.externalApiService.getAvatar(userId);
  }

  @Delete(':userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string): Promise<Avatar> {
    return await this.externalApiService.deleteAvatar(userId);
  }
}
