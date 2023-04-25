import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
