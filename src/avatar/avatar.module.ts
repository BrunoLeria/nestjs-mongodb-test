import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './schema/avatar.schema';
import { HttpModule } from '@nestjs/axios';
import { AvatarRepository } from './avatar.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }]),
    HttpModule,
  ],
  providers: [AvatarService, AvatarRepository],
  exports: [AvatarService],
})
export class AvatarModule {}
