import { GetUserResponse } from '../types/services/user/userTypes';

export class User {
  externalId = '';

  username = '';

  firstName = '';

  familyName = '';

  email = '';

  constructor(fetchedUser?: GetUserResponse) {
    if (fetchedUser?.user) {
      const { user } = fetchedUser;

      this.externalId = user.externalId || '';
      this.username = user.username || '';
      this.firstName = user.firstName || '';
      this.familyName = user.familyName || '';
      this.email = user.email || '';
    }
  }
}

export const NO_OP = () => {};
