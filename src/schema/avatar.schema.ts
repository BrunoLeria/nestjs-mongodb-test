import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Avatar {
  @Prop()
  UserId: string;
  @Prop()
  File: string;
}
export const AvatarSchema = SchemaFactory.createForClass(Avatar);
