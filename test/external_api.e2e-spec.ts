import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { externalUserStub } from '../src/external_api/test/stubs/external_user.stub';
import { avatarStub } from '../src/avatar/test/stubs/avatar.stub';

describe('ExternalApiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('it should get a user by id', () => {
    it('/user/:id (GET)', async () => {
      return request(app.getHttpServer())
        .get(`/user/2`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(externalUserStub());
        });
    });
  });

  describe('it should get a user avatar', () => {
    it('/user/:id/avatar (GET)', async () => {
      return request(app.getHttpServer())
        .get(`/user/2/avatar`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('file', avatarStub().file);
        });
    });
  });

  describe('it should delete a user avatar', () => {
    it('/user/:id/avatar (DELETE)', async () => {
      return request(app.getHttpServer())
        .delete(`/user/2/avatar`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('file', avatarStub().file);
        });
    });
  });
});
