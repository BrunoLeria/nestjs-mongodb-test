import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user/user.service';
import { UserController } from './controller/user/user.controller';
import { HttpModule } from '@nestjs/axios';
import { ExternalUsersService } from './service/external_users/external_users.service';
import { ExternalUsersController } from './controller/external_users/external_users.controller';
import { AvatarSchema } from './schema/avatar.schema';

// eslint-disable-next-line prettier/prettier
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'userdb',
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Avatar', schema: AvatarSchema },
    ]),
    HttpModule,
  ],
  controllers: [AppController, UserController, ExternalUsersController],
  providers: [AppService, UserService, ExternalUsersService],
})
export class AppModule {}
