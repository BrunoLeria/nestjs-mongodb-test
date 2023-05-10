import { userStub } from '../../user/test/stubs/user.stub';
import { avatarStub } from '../../avatar/test/stubs/avatar.stub';

export const ExternalApiService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(userStub()),
  getAvatar: jest.fn().mockResolvedValue(avatarStub()),
  deleteAvatar: jest.fn().mockResolvedValue(avatarStub()),
});
