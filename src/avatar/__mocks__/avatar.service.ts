import { avatarStub } from '../test/stubs/avatar.stub';

export const AvatarService = jest.fn().mockReturnValue({
  getAvatar: jest.fn().mockResolvedValue(avatarStub()),
  deleteAvatar: jest.fn().mockResolvedValue(avatarStub()),
});
