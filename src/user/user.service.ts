import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from './schema/user.schema';
import { UsersRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private mailerService: MailerService,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ id }, updateUserDto);
  }

  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: 'brunovolpatol@hotmail.com',
      subject: subject,
      html: `<h3 style="color: red">${message}</h3>`,
    });
  }
}
