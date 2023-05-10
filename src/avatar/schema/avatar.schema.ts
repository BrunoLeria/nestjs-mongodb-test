import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema()
export class Avatar extends AbstractDocument {
  @Prop()
  avatarId: string;
  @Prop()
  userId: string;
  @Prop()
  file: string;
}
export const AvatarSchema = SchemaFactory.createForClass(Avatar);
