import { Context, createContext } from 'react';
import { IUserContext } from '../UserContext';

const defaultState: IUserContext = {
  user: null,
  signOut: () => {},
  isLoading: true,
  errorMessage: '',
};

const temp = createContext<IUserContext>(defaultState);
export const UserContext = temp as jest.Mocked<Context<IUserContext>>;
export default UserContext.Provider;
