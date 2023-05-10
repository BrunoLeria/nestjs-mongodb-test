import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiService } from '../external_api.service';
import { HttpModule } from '@nestjs/axios';
import { AvatarService } from '../../avatar/avatar.service';
import { externalUserStub } from './stubs/external_user.stub';
import { Avatar } from '../../avatar/schema/avatar.schema';
import { userStub } from '../../user/test/stubs/user.stub';
import { avatarStub } from '../../avatar/test/stubs/avatar.stub';

jest.mock('../../avatar/avatar.service');

describe('ExternalApiService', () => {
  let externalApiService: ExternalApiService;
  let avatarService: AvatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExternalApiService, AvatarService],
    }).compile();

    externalApiService = module.get<ExternalApiService>(ExternalApiService);
    avatarService = module.get<AvatarService>(AvatarService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(externalApiService).toBeDefined();
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: any;

      beforeEach(async () => {
        user = await externalApiService.getUserById(`${externalUserStub().id}`);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(externalUserStub());
      });
    });
  });

  describe('getUserAvatar', () => {
    describe('when getUserAvatar is called', () => {
      let avatar: Avatar;

      beforeEach(async () => {
        avatar = await externalApiService.getAvatar(userStub().userId);
      });

      test('then it should return an avatar', () => {
        expect(avatar).toEqual(avatarStub());
      });
    });
  });

  describe('deleteAvatar', () => {
    describe('when deleteAvatar is called', () => {
      let avatar: Avatar;

      beforeEach(async () => {
        avatar = await externalApiService.deleteAvatar(userStub().userId);
      });

      test('then it should call avatarService', () => {
        expect(avatarService.deleteAvatar).toBeCalledWith(userStub().userId);
      });

      test('then it should return an avatar', () => {
        expect(avatar).toEqual(avatarStub());
      });
    });
  });
});
