import { User } from 'src/user/schema/user.schema';
import { Types } from 'mongoose';

export const userStub = (): User => {
  return {
    _id: new Types.ObjectId('5f9d4a3d9d6c2c1f1c9d4408'),
    userId: '1',
    email: 'bl@test.com',
    first_name: 'Bruno',
    last_name: 'Leria',
  };
};
