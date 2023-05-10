import { Test, TestingModule } from '@nestjs/testing';
import { AvatarService } from '../avatar.service';
import { Avatar } from '../schema/avatar.schema';
import { AvatarRepository } from '../avatar.repository';
import { avatarStub } from './stubs/avatar.stub';
import { UpdateAvatarDto } from '../dto/update-avatar.dto';
import { CreateAvatarDto } from '../dto/create-avatar.dto';
import { HttpModule } from '@nestjs/axios';

jest.mock('../avatar.repository');

describe('ExternalApiService', () => {
  let avatarService: AvatarService;
  let avatarRepository: AvatarRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AvatarService, AvatarRepository],
    }).compile();

    avatarService = module.get<AvatarService>(AvatarService);
    avatarRepository = module.get<AvatarRepository>(AvatarRepository);
  });

  it('should be defined', () => {
    expect(avatarService).toBeDefined();
  });

  describe('getAvatars', () => {
    describe('should return an array of avatars', () => {
      let avatars: Avatar[];

      beforeEach(async () => {
        avatars = await avatarService.getAvatars();
      });

      test('then it should call avatarsRepository', () => {
        expect(avatarRepository.find).toBeCalled();
      });

      test('then it should return a list of avatars', () => {
        expect(avatars).toEqual([avatarStub()]);
      });
    });
  });

  describe('getAvatar', () => {
    describe('when getAvatar is called', () => {
      let avatar: Avatar;

      beforeEach(async () => {
        avatar = await avatarService.getAvatar('1');
      });

      test('then it should call avatarsRepository', () => {
        expect(avatarRepository.findOne).toBeCalled();
      });

      test('should return the value', () => {
        expect(avatar).toEqual(avatarStub());
      });
    });
  });

  describe('updateAvatar', () => {
    describe('when updateAvatar is called', () => {
      let avatar: Avatar;
      let updateAvatarDto: UpdateAvatarDto;

      beforeEach(async () => {
        updateAvatarDto = {
          userId: '2',
        };

        avatar = await avatarService.updateAvatar(
          avatarStub().avatarId,
          updateAvatarDto,
        );
      });

      test('then it should call avatarsRepository', () => {
        expect(avatarRepository.findOneAndUpdate).toBeCalled();
      });

      test('then it should return a avatar', () => {
        expect(avatar).toEqual(avatarStub());
      });
    });
  });

  describe('createAvatar', () => {
    describe('when createAvatar is called', () => {
      let avatar: Avatar;
      let createAvatarDto: CreateAvatarDto;

      beforeEach(async () => {
        createAvatarDto = {
          userId: avatarStub().userId,
          file: avatarStub().file,
        };
        avatar = await avatarService.createAvatar(createAvatarDto);
      });

      test('then it should call avatarsRepository', () => {
        expect(avatarRepository.create).toBeCalled();
      });

      test('then it should return a avatar', () => {
        expect(avatar).toEqual(expect.objectContaining(createAvatarDto));
      });
    });
  });
});
