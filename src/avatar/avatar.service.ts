import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Avatar } from './schema/avatar.schema';
import { AvatarRepository } from './avatar.repository';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { v4 } from 'uuid';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Injectable()
export class AvatarService {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async getAvatars(): Promise<Avatar[]> {
    return this.avatarRepository.find({});
  }

  async getAvatar(userId: string): Promise<Avatar> {
    return this.avatarRepository.findOne({ userId: userId });
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
