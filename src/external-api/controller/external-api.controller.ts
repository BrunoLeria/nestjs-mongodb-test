import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ExternalApiService } from '../service/external-api.service';

@Controller('api/user')
export class ExternalApiController {
  constructor(private readonly ExternalApiService: ExternalApiService) {}

  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.ExternalApiService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        user: existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id/avatar')
  async getUserAvatar(@Res() response, @Param('id') userId: string) {
    try {
      const avatar = await this.ExternalApiService.getUserAvatar(userId);
      return response.status(HttpStatus.OK).json({
        avatar: avatar.file,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id/avatar')
  async deleteUserAvatar(@Res() response, @Param('id') userId: string) {
    try {
      await this.ExternalApiService.deleteUserAvatar(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Avatar deleted successfully',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
