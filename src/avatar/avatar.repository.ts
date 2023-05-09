import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Avatar } from './schema/avatar.schema';
import { AbstractRepository } from '../database/abstract.repository';

@Injectable()
export class AvatarsRepository extends AbstractRepository<Avatar> {
  protected readonly logger = new Logger(AvatarsRepository.name);

  constructor(
    @InjectModel(Avatar.name) avatarModel: Model<Avatar>,
    @InjectConnection() connection: Connection,
  ) {
    super(avatarModel, connection);
  }
}
