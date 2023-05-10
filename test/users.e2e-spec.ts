import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from '../src/user/schema/user.schema';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let createUserDto: CreateUserDto;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    createUserDto = {
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Lindsay',
      last_name: 'Ferguson',
    };
    await app.init();
  });

  describe('it should create a user', () => {
    it('/users (POST)', async () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          user = res.body;
          expect(user).toHaveProperty('userId');
          expect(user).toHaveProperty('email', createUserDto.email);
          expect(user).toHaveProperty('first_name', createUserDto.first_name);
          expect(user).toHaveProperty('last_name', createUserDto.last_name);
        });
    });
  });
});
