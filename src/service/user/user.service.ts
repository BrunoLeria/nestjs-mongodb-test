import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interface/user.interface';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async getUser(studentId: string): Promise<IUser> {
    const response = await fetch(`https://reqres.in/api/users/${studentId}`);
    const jsonData = await response.json();
    const existingStudent = jsonData.data;
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }
}
