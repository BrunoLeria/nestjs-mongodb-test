import { UserService } from '../user.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import EmailService from '../../email/email.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { EmailModule } from '../../email/email.module';
import { User } from '../schema/user.schema';
import { userStub } from './stubs/user.stub';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../user.repository');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let eventEmitter: EventEmitter2;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EmailModule, EventEmitterModule.forRoot()],
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    emailService = module.get<EmailService>(EmailService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await userService.getUsers();
      });

      it('should call userRepository.find()', () => {
        expect(userRepository.find).toBeCalled;
      });

      it('should return the array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await userService.getUserById(userStub().userId);
      });

      test('then it should call usersRepository', () => {
        expect(userRepository.findOne).toBeCalled();
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await userService.createUser(userStub());
      });

      it('should call userRepository.create()', () => {
        expect(userRepository.create).toBeCalled;
      });

      it('should return the created user', () => {
        expect(user).toEqual(userStub());
      });

      it('should call eventEmitter.emit()', () => {
        expect(eventEmitter.emit).toBeCalled;
      });

      it('should call emailService.sendMail()', () => {
        expect(emailService.sendEmail).toBeCalled;
      });
    });
  });
  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserRequest: UpdateUserDto;

      beforeEach(async () => {
        updateUserRequest = {
          email: 'test@email.com',
        };

        user = await userService.updateUser(
          userStub().userId,
          updateUserRequest,
        );
      });

      test('then it should call usersRepository', () => {
        expect(userRepository.findOneAndUpdate).toBeCalled();
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await userService.deleteUser(userStub().userId);
      });

      test('then it should call usersRepository', () => {
        expect(userRepository.findOneAndDelete).toBeCalled();
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
