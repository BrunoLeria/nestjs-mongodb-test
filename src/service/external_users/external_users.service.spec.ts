import { Test, TestingModule } from '@nestjs/testing';
import { ExternalUsersService } from './external_users.service';

describe('ExternalUsersService', () => {
  let service: ExternalUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalUsersService],
    }).compile();

    service = module.get<ExternalUsersService>(ExternalUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
