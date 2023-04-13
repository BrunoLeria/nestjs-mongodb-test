import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Avatar {
  @Prop()
  userId: string;
  @Prop()
  file: string;
}
export const AvatarSchema = SchemaFactory.createForClass(Avatar);
