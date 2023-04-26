import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly userId: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
}
