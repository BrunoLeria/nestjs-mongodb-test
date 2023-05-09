import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar } from './schema/avatar.schema';
import { AvatarsRepository } from './avatar.repository';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { v4 } from 'uuid';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Injectable()
export class AvatarService {
  constructor(
    private readonly avatarRepository: AvatarsRepository,
    private readonly httpService: HttpService,
  ) {}

  async getAvatars(): Promise<Avatar[]> {
    return this.avatarRepository.find({});
  }

  async getAvatar(userId: string): Promise<Avatar> {
    const search = this.avatarRepository.findOne({ userId: userId });
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
          console.log(error);
        });
      if (!avatar) {
        throw new Error('Avatar not found');
      }
      return await this.createAvatar({ userId: userId, file: avatar });
    }
    return search;
  }

  async createAvatar(createAvatarDto: CreateAvatarDto): Promise<Avatar> {
    const session = await this.avatarRepository.startTransaction();
    try {
      const newAvatar = { avatarId: v4(), ...createAvatarDto };
      const result = await this.avatarRepository.create(newAvatar);
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updateAvatar(
    id: string,
    updateAvatarRequest: UpdateAvatarDto,
  ): Promise<Avatar> {
    const session = await this.avatarRepository.startTransaction();
    try {
      const result = await this.avatarRepository.findOneAndUpdate(
        { userId: id },
        updateAvatarRequest,
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async deleteAvatar(userId: string): Promise<Avatar> {
    return this.avatarRepository.findOneAndDelete({ userId: userId });
  }
}
