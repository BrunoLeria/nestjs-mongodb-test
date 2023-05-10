import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiController } from '../external_api.controller';
import { ExternalApiService } from '../external_api.service';
import { User } from '../../user/schema/user.schema';
import { userStub } from '../../user/test/stubs/user.stub';
import { Avatar } from '../../avatar/schema/avatar.schema';
import { avatarStub } from '../../avatar/test/stubs/avatar.stub';

jest.mock('../external_api.service');

describe('ExternalApiController', () => {
  let externalApiController: ExternalApiController;
  let externalApiService: ExternalApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalApiController],
      providers: [ExternalApiService],
    }).compile();

    externalApiController = module.get<ExternalApiController>(
      ExternalApiController,
    );
    externalApiService = module.get<ExternalApiService>(ExternalApiService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(externalApiController).toBeDefined();
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await externalApiController.getUserById(userStub().userId);
      });

      test('then it should call usersService', () => {
        expect(externalApiService.getUserById).toBeCalledWith(
          userStub().userId,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUserAvatar', () => {
    describe('when getUserAvatar is called', () => {
      let avatar: Avatar;

      beforeEach(async () => {
        avatar = await externalApiController.getUserAvatar(userStub().userId);
      });

      test('then it should call avatarService', () => {
        expect(externalApiService.getAvatar).toBeCalledWith(userStub().userId);
      });

      test('then it should return an avatar', () => {
        expect(avatar).toEqual(avatarStub());
      });
    });
  });

  describe('deleteUserAvatar', () => {
    describe('when deleteUserAvatar is called', () => {
      let avatar: Avatar;

      beforeEach(async () => {
        avatar = await externalApiController.deleteUserAvatar(
          userStub().userId,
        );
      });

      test('then it should call avatarService', () => {
        expect(externalApiService.deleteAvatar).toBeCalledWith(
          userStub().userId,
        );
      });

      test('then it should return an avatar', () => {
        expect(avatar).toEqual(avatarStub());
      });
    });
  });
});
