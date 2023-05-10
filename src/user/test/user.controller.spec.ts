import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';
import { userStub } from './stubs/user.stub';

import { UserController } from '../user.controller';
import { UserService } from '../user.service';

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

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          first_name: userStub().first_name,
          last_name: userStub().last_name,
          email: userStub().email,
        };
        user = await controller.createUser(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(service.createUser).toBeCalledWith({
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
});
