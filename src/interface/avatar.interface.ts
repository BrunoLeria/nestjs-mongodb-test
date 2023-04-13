import { Document } from 'mongoose';
export interface IAvatar extends Document {
  readonly userId: string;
  readonly file: string;
}
