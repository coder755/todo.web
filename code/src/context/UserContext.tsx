import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { AmplifyUser, AuthEventData } from '@aws-amplify/ui';
import { User } from '../models/User';
import { getUser, postUser } from '../api/userApi';
import {
  GetUserResponse, PostUserRequest, USER_ERROR_CODES, UserError,
} from '../types/services/user/userTypes';
import { WebSocketContext } from './WebSocketContext';
import { MessageTypes } from '../api/WS';

interface IUserContext {
  user: User | null,
  signOut: (data?: AuthEventData | undefined) => void,
  isLoading: boolean,
  errorMessage: string,
}

const defaultState: IUserContext = {
  user: null,
  signOut: () => {},
  isLoading: true,
  errorMessage: '',
};

export const UserContext = createContext<IUserContext>(defaultState);

type UserContextProps = {
  children: React.ReactNode;
};

type MyCognitoAttributes = {
  username: string,
  email: string,
  given_name: string,
  family_name: string,
  sub: string,
};

type MyAmplifyUser = AmplifyUser & { attributes: MyCognitoAttributes; };

const UserCreatedListenerId = 'UserCTXUserCreatedListenerId';

function UserProvider({ children }: UserContextProps) {
  const { isWebsocketOpen, registerListener, removeListener } = useContext(WebSocketContext);
  const {
    user: authUser, signOut: authSignOut, isPending,
  } = useAuthenticator((context) => [context.user]);
  const [user, setUser] = useState(defaultState.user);
  const [errorMessage, setErrorMessage] = useState(defaultState.errorMessage);

  const handleGetUser = useCallback(async () => {
    const getUserResponse = await getUser();
    if (getUserResponse.success) {
      const res = getUserResponse as GetUserResponse;
      const fetchedUser = new User(res);
      setUser(fetchedUser);
      setErrorMessage('');
    } else {
      setUser(null);
      removeListener(MessageTypes.UserCreated, UserCreatedListenerId);
      setErrorMessage('Error attempting to get user');
    }
  }, [setUser]);

  const handlePostUser = useCallback(async (recievedUser: MyAmplifyUser) => {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      preferred_username, email, given_name, family_name, sub,
    } = recievedUser.attributes;
    const requestBody: PostUserRequest = {
      useQueue: true,
      id: sub,
      username: preferred_username,
      firstName: given_name,
      familyName: family_name,
      email,
    };
    const postUserResponse = await postUser(requestBody);
    if (postUserResponse.success) {
      setErrorMessage('');
    } else {
      setErrorMessage('Error attempting to post user');
    }
  }, []);

  const handleInitGetUser = useCallback(async (recievedUser: MyAmplifyUser) => {
    const getUserResponse = await getUser();
    if (getUserResponse.success) {
      const res = getUserResponse as GetUserResponse;
      const fetchedUser = new User(res);
      setUser(fetchedUser);
      setErrorMessage('');
    } else {
      const res = getUserResponse as UserError;
      if (res.errorCode === USER_ERROR_CODES.DOES_NOT_EXIST) {
        const registerRequest = {
          id: UserCreatedListenerId,
          callback: handleGetUser,
        };
        registerListener(MessageTypes.UserCreated, registerRequest);
        handlePostUser(recievedUser);
      } else {
        setUser(null);
        setErrorMessage('Error attempting to init get user');
      }
    }
  }, [setUser, handlePostUser]);

  const handleSignOut = useCallback(() => {
    authSignOut();
    setUser(null);
  }, [authSignOut]);

  useEffect(() => {
    if (authUser && isWebsocketOpen) {
      handleInitGetUser(authUser as MyAmplifyUser);
    } else {
      setUser(null);
    }
  }, [authUser, isWebsocketOpen]);

  const isLoading = !user && isPending;

  const contextValue = useMemo<IUserContext>(
    () => ({
      user,
      signOut: handleSignOut,
      isLoading,
      errorMessage,
    }),
    [user, handleSignOut],
  );

  return (
    <UserContext.Provider
      value={contextValue}
    >
      {
        children
      }
    </UserContext.Provider>
  );
}

export default UserProvider;
