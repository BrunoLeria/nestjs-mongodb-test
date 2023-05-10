import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AvatarModule } from './avatar/avatar.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { ExternalApiModule } from './external_api/external_api.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AvatarModule,
    EmailModule,
    ExternalApiModule,
  ],
})
export class AppModule {}
