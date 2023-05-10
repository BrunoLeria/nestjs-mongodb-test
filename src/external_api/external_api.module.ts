import { Module } from '@nestjs/common';
import { ExternalApiController } from './external_api.controller';
import { ExternalApiService } from './external_api.service';
import { AvatarModule } from '../avatar/avatar.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AvatarModule, HttpModule],
  controllers: [ExternalApiController],
  providers: [ExternalApiService],
})
export class ExternalApiModule {}
