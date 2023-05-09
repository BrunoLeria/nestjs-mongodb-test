import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  userId: string;
  @Prop()
  email: string;
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
