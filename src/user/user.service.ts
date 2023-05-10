import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';
import { HttpService } from '@nestjs/axios';
import EmailService from '../email/email.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';
@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId: userId });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      const newUser = { userId: v4(), ...createUserDto };
      const result = await this.usersRepository.create(newUser);
      this.eventEmitter.emit(
        'user.created',
        new UserCreatedEvent(newUser.userId, newUser.email),
      );

      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      const result = await this.usersRepository.findOneAndUpdate(
        { userId: id },
        updateUserDto,
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async deleteUser(id: string): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      const result = await this.usersRepository.findOneAndDelete({
        userId: id,
      });
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    this.logger.log(`User created: ${JSON.stringify(event)}`);
    try {
      await this.emailService.sendEmail({
        from: '${process.env.EMAIL_USER}',
        to: event.email,
        subject: 'Welcome to NestJS',
        text: 'Welcome to NestJS',
      });
    } catch (error) {
      this.logger.error(`Error sending email to ${event.email}`);
    }
  }
}
