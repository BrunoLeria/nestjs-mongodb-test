import { Module } from '@nestjs/common';
import { ExternalApiController } from './controller/external-api.controller';
import { ExternalApiService } from './service/external-api.service';

@Module({
  controllers: [ExternalApiController],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
