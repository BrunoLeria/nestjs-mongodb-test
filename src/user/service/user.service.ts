import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interface/user.interface';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private mailerService: MailerService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    newUser.save();
    const message = `Hi ${newUser.first_name}, welcome to our platform!`;
    await this.mailerService.sendMail({
      to: newUser.email,
      from: 'wesley.gado@treinaweb.com.br',
      subject: 'Enviando Email com NestJS',
      html: `<h3 style="color: red">${message}</h3>`,
    });

    return newUser;
  }
}
