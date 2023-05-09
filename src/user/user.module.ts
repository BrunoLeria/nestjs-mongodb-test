import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { EmailModule } from '../email/email.module';
import { UserRepository } from './user.repository';
import { HttpModule } from '@nestjs/axios';
import { AvatarModule } from '../avatar/avatar.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmailModule,
    HttpModule,
    AvatarModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
