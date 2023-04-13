import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { IAvatar } from 'src/interface/avatar.interface';
import { Model } from 'mongoose';

@Injectable()
export class ExternalUsersService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('User') private avatarModel: Model<IAvatar>,
  ) {}

  async getUser(userId: string): Promise<string> {
    const response = this.httpService.axiosRef.get(
      `https://reqres.in/api/users/${userId}`,
    );
    return (await response).data.data;
  }

  async getUserAvatar(userId: string): Promise<IAvatar> {
    this.avatarModel.findOne({ userId: userId }).then((avatar) => {
      if (avatar) {
        return avatar;
      }
    });
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
        console.log(error);
      });
    const newAvatar = await new this.avatarModel({
      userId: userId,
      file: avatar,
    });
    return newAvatar.save();
  }

  async deleteUserAvatar(userId: string): Promise<IAvatar> {
    return this.avatarModel.findOneAndDelete({ userId: userId });
  }
}
