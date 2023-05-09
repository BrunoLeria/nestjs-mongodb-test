import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { AvatarService } from '../avatar/avatar.service';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
  ) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/user/:userId')
  async getUserById(@Param('userId') userId: string): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Get('/user/:userId/avatar')
  async getUserAvatar(@Param('userId') userId: string): Promise<any> {
    return await this.avatarService.getAvatar(userId);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete('/user/:userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string): Promise<User> {
    return await this.userService.deleteUser(userId);
  }
}
