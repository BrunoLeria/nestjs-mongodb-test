import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/schema/user.schema';
import { HttpModule } from '@nestjs/axios';
import { AvatarSchema } from './external-api/schema/avatar.schema';
import { UserModule } from './user/user.module';
import { ExternalApiModule } from './external-api/external-api.module';

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
    UserModule,
    ExternalApiModule,
  ],
})
export class AppModule {}
