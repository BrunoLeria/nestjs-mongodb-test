import { Test, TestingModule } from '@nestjs/testing';
import { AvatarRepository } from '../avatar.repository';
import { AvatarModel } from './support/avatar.model';
import { Connection, FilterQuery, QueryOptions } from 'mongoose';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Avatar } from '../schema/avatar.schema';
import { avatarStub } from './stubs/avatar.stub';

describe('AvatarRepository', () => {
  let repository: AvatarRepository;
  describe('find operations', () => {
    let model: AvatarModel;

    let filterQuery: FilterQuery<Avatar>;
    let queryOptions: QueryOptions<Avatar>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AvatarRepository,
          {
            provide: getModelToken(Avatar.name),
            useClass: AvatarModel,
          },
          { provide: getConnectionToken(), useClass: Connection },
        ],
      }).compile();

      repository = module.get<AvatarRepository>(AvatarRepository);
      model = module.get<AvatarModel>(getModelToken(Avatar.name));
      filterQuery = { avatarId: avatarStub().avatarId };
      queryOptions = { lean: true };

      jest.clearAllMocks();
    });

    it('should be defined', () => {
      expect(repository).toBeDefined();
    });

    it('model should be defined', () => {
      expect(model).toBeDefined();
    });

    describe('find', () => {
      describe('when find is called', () => {
        let avatars: Avatar[];

        beforeEach(async () => {
          jest.spyOn(model, 'find');

          avatars = await repository.find(filterQuery);
        });

        test('then it should call model', () => {
          expect(model.find).toBeCalledWith(
            filterQuery,
            { _id: 0, __v: 0 },
            queryOptions,
          );
        });

        test('then it should return a list of avatars', () => {
          expect(avatars).toEqual([avatarStub()]);
        });
      });
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let avatar: Avatar;

        beforeEach(async () => {
          jest.spyOn(model, 'findOne');

          avatar = await repository.findOne(filterQuery);
        });

        test('then it should call model', () => {
          expect(model.findOne).toBeCalledWith(
            filterQuery,
            { __v: 0 },
            queryOptions,
          );
        });

        test('then it should return a avatar', () => {
          expect(avatar).toEqual(avatarStub());
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let avatar: Avatar;

        beforeEach(async () => {
          jest.spyOn(model, 'findOneAndUpdate');

          avatar = await repository.findOneAndUpdate(filterQuery, avatarStub());
        });

        test('then it should call model', () => {
          expect(model.findOneAndUpdate).toBeCalledWith(
            filterQuery,
            avatarStub(),
            {
              new: true,
              ...queryOptions,
            },
          );
        });

        test('then it should return a avatar', () => {
          expect(avatar).toEqual(avatarStub());
        });
      });
    });

    describe('findOneAndDelete', () => {
      describe('when findOneAndDelete is called', () => {
        let result: any;

        beforeEach(async () => {
          jest.spyOn(model, 'findOneAndDelete');

          result = await repository.findOneAndDelete(filterQuery);
        });

        test('then it should call model', () => {
          expect(model.findOneAndDelete).toBeCalledWith(filterQuery);
        });

        test('then it should return the number of deleted avatars', () => {
          expect(result).toEqual({ deletedCount: 1 });
        });
      });
    });
  });

  describe('create operatios', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AvatarRepository,
          {
            provide: getModelToken(Avatar.name),
            useValue: AvatarModel,
          },
          { provide: getConnectionToken(), useValue: Connection },
        ],
      }).compile();

      repository = module.get<AvatarRepository>(AvatarRepository);

      jest.clearAllMocks();
    });

    describe('create', () => {
      describe('when create is called', () => {
        let avatar: Avatar;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(AvatarModel.prototype, 'save');
          constructorSpy = jest.spyOn(AvatarModel.prototype, 'constructorSpy');

          avatar = await repository.create(avatarStub());
        });

        test('then it should call the model save method', () => {
          expect(saveSpy).toBeCalled();
          expect(constructorSpy).toBeCalled();
        });

        test('then it should return a avatar', () => {
          expect(avatar).toEqual(
            expect.objectContaining({
              avatarId: avatarStub().avatarId,
              userId: avatarStub().userId,
              file: avatarStub().file,
            }),
          );
        });
      });
    });
  });
});
