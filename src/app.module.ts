import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// eslint-disable-next-line prettier/prettier
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'userdb',
    }),
  ],
})
export class AppModule {}
