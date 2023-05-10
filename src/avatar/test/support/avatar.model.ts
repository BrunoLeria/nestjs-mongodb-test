import { MockModel } from '../../../database/support/mock.model';
import { Avatar } from '../../schema/avatar.schema';
import { avatarStub } from '../stubs/avatar.stub';

export class AvatarModel extends MockModel<Avatar> {
  protected abstractStub: Avatar = avatarStub();
}
