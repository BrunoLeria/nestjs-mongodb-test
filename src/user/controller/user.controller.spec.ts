import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn().mockImplementation((createUserDto) => {
      Promise.resolve({
        id: Date.now,
        ...createUserDto,
      });
    }),
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      first_name: 'Wesley',
      last_name: 'Gado',
      email: 'wg@mail.com',
    };
    expect(await controller.createUser(mockResponse, createUserDto)).toEqual(
      mockResponse.status(201).json({
        id: expect.any(Number),
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
      }),
    );

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should not create a user', async () => {
    const createUserDto = {
      first_name: 'Wesley',
      last_name: 'Gado',
      email: '',
    };
    expect(await controller.createUser(mockResponse, createUserDto)).toEqual(
      mockResponse.status(400).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      }),
    );

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
  });
});
