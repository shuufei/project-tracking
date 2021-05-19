import { MockReturnValues } from '@bison/types/testing';
import { IListMembersService } from './list-members.service.interface';

export const mockListMembersServiceReturnValues: MockReturnValues<IListMembersService> = {
  handle: {
    users: [
      {
        id: `user0001`,
        name: `user name 0001`,
        icon: `user description 0001`,
      },
      {
        id: `user0002`,
        name: `user name 0002`,
        icon: `user icon 0002`,
      },
      {
        id: `user0003`,
        name: `user name 0003`,
        icon: `user icon 0003`,
      },
    ],
  },
};

export class MockListMembersService implements IListMembersService {
  async handle() {
    return mockListMembersServiceReturnValues.handle;
  }
}
