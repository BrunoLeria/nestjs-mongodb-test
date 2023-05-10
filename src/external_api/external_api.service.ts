import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user/schema/user.schema';
import { Avatar } from 'src/avatar/schema/avatar.schema';
import { AvatarService } from '../avatar/avatar.service';
import * as fs from 'fs';

@Injectable()
export class ExternalApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly avatarService: AvatarService,
  ) {}

  private readonly logger = new Logger(ExternalApiService.name);

  async getUserById(id: string): Promise<any> {
    const result = await this.httpService.axiosRef
      .get(`https://reqres.in/api/users/${id}`)
      .then((response) => response.data.data)
      .catch((error) => {
        this.logger.warn(error);
      });
    return result;
  }

  async getAvatar(userId: string): Promise<Avatar> {
    const search = await this.avatarService.getAvatar(userId);
    if ((await search) === null) {
      const response = this.httpService.axiosRef.get(
        `https://reqres.in/api/users/${userId}`,
      );
      const avatarURL = (await response).data.data.avatar;
      const avatar = await this.httpService.axiosRef
        .get(avatarURL, {
          responseType: 'arraybuffer',
        })
        .then((response) =>
          Buffer.from(response.data, 'binary').toString('base64'),
        )
        .catch((error) => {
          this.logger.warn(error);
        });
      if (!avatar) {
        throw new Error('Avatar not found');
      }
      try {
        fs.writeFileSync(`files/${userId}_avatar.jpg`, avatar, {
          encoding: 'base64',
        });
        this.logger.log('File created');
      } catch (err) {
        this.logger.warn(err);
      }
      return await this.avatarService.createAvatar({
        userId: userId,
        file: avatar,
      });
    }
    return search;
  }

  async deleteAvatar(userId: string): Promise<Avatar> {
    try {
      fs.unlink(`files/${userId}_avatar.jpg`, () => {
        this.logger.log('File deleted');
      });
    } catch (error) {
      this.logger.warn(error);
    }
    return await this.avatarService.deleteAvatar(userId);
  }
}
