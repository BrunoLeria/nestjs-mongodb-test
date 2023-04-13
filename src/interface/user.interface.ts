import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly avatar: string;
}
