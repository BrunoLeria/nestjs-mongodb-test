import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { UserModel } from './support/user.model';
import { Connection, FilterQuery, QueryOptions } from 'mongoose';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { userStub } from './stubs/user.stub';

describe('UserRepository', () => {
  let repository: UserRepository;
  describe('find operations', () => {
    let model: UserModel;

    let filterQuery: FilterQuery<User>;
    let queryOptions: QueryOptions<User>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
          { provide: getConnectionToken(), useClass: Connection },
        ],
      }).compile();

      repository = module.get<UserRepository>(UserRepository);
      model = module.get<UserModel>(getModelToken(User.name));
      filterQuery = { userId: userStub().userId };
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
        let users: User[];

        beforeEach(async () => {
          jest.spyOn(model, 'find');

          users = await repository.find(filterQuery);
        });

        test('then it should call model', () => {
          expect(model.find).toBeCalledWith(
            filterQuery,
            { _id: 0, __v: 0 },
            queryOptions,
          );
        });

        test('then it should return a list of users', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(model, 'findOne');

          user = await repository.findOne(filterQuery);
        });

        test('then it should call model', () => {
          expect(model.findOne).toBeCalledWith(
            filterQuery,
            { __v: 0 },
            queryOptions,
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(model, 'findOneAndUpdate');

          user = await repository.findOneAndUpdate(filterQuery, userStub());
        });

        test('then it should call model', () => {
          expect(model.findOneAndUpdate).toBeCalledWith(
            filterQuery,
            userStub(),
            {
              new: true,
              ...queryOptions,
            },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
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

        test('then it should return the number of deleted users', () => {
          expect(result).toEqual({ deletedCount: 1 });
        });
      });
    });
  });

  describe('create operatios', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
          { provide: getConnectionToken(), useValue: Connection },
        ],
      }).compile();

      repository = module.get<UserRepository>(UserRepository);

      jest.clearAllMocks();
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');

          user = await repository.create(userStub());
        });

        test('then it should call the model save method', () => {
          expect(saveSpy).toBeCalled();
          expect(constructorSpy).toBeCalled();
        });

        test('then it should return a user', () => {
          expect(user).toEqual(
            expect.objectContaining({
              first_name: userStub().first_name,
              last_name: userStub().last_name,
              email: userStub().email,
              userId: userStub().userId,
            }),
          );
        });
      });
    });
  });
});
