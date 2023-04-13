import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ExternalUsersService } from 'src/service/external_users/external_users.service';

@Controller('api/user')
export class ExternalUsersController {
  constructor(private readonly externalUsersService: ExternalUsersService) {}

  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.externalUsersService.getUser(userId);
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
      const avatar = await this.externalUsersService.getUserAvatar(userId);
      return response.status(HttpStatus.OK).json({
        avatar: avatar,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id/avatar')
  async deleteUserAvatar(@Res() response, @Param('id') userId: string) {
    try {
      const deletedAvatar = await this.externalUsersService.deleteUserAvatar(
        userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Avatar deleted successfully',
        deletedAvatar,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
