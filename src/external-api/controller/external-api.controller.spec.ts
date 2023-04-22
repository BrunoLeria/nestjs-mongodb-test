import { Test, TestingModule } from '@nestjs/testing';
import { ExternalUsersController } from './externalApi.controller';

describe('ExternalUsersController', () => {
  let controller: ExternalUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalUsersController],
    }).compile();

    controller = module.get<ExternalUsersController>(ExternalUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
