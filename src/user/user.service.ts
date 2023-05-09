import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';
import { HttpService } from '@nestjs/axios';
import EmailService from '../email/email.service';
@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly httpService: HttpService,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.httpService.axiosRef.get(
      `https://reqres.in/api/users/${id}`,
    );
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      const newUser = { userId: v4(), ...createUserDto };
      const result = await this.usersRepository.create(newUser);
      await this.emailService.sendMail({
        from: '${process.env.EMAIL_USER}',
        to: newUser.email,
        subject: 'Welcome to NestJS',
        text: 'Welcome to NestJS',
      });
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId: id }, updateUserDto);
  }

  async deleteUser(id: string): Promise<User> {
    return this.usersRepository.findOneAndDelete({ userId: id });
  }
}
