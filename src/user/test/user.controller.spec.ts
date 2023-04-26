import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';

import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';

jest.mock('../user.service');

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.getUserById(userStub().userId);
      });

      test('then it should call usersService', () => {
        expect(service.getUserById).toBeCalledWith(userStub().userId);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await controller.getUsers();
      });

      test('then it should call usersService', () => {
        expect(service.getUsers).toBeCalled();
      });

      test('then it should return a user', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          userId: userStub().userId,
          first_name: userStub().first_name,
          last_name: userStub().last_name,
          email: userStub().email,
        };
        user = await controller.createUser(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(service.createUser).toBeCalledWith({
          userId: createUserDto.userId,
          first_name: createUserDto.first_name,
          last_name: createUserDto.last_name,
          email: createUserDto.email,
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: CreateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          userId: userStub().userId,
          first_name: 'Holy',
          last_name: userStub().last_name,
          email: 'hl@email.com',
        };
        user = await controller.updateUser(userStub().userId, updateUserDto);
      });

      test('then it should call usersService', () => {
        expect(service.updateUser).toBeCalledWith(
          userStub().userId,
          updateUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
