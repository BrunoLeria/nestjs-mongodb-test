import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  getUsers: jest.fn().mockResolvedValue([userStub()]),
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
});
