import { User } from 'src/user/schema/user.schema';

export const userStub = (): User => {
  return {
    userId: '1',
    email: 'bl@test.com',
    first_name: 'Bruno',
    last_name: 'Leria',
  };
};
