import { avatarStub } from '../test/stubs/avatar.stub';

export const AvatarRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(avatarStub()),
  find: jest.fn().mockResolvedValue([avatarStub()]),
  findOne: jest.fn().mockResolvedValue(avatarStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(avatarStub()),
  findOneAndDelete: jest.fn().mockResolvedValue(avatarStub()),
  startTransaction: jest.fn().mockResolvedValue({
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
  }),
});
