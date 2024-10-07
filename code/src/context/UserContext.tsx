import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { AmplifyUser, AuthEventData } from '@aws-amplify/ui';
import { configureAmplify } from '../auth/amplifyConfig';
import { User } from '../models/User';
import { getUser, postUser } from '../api/userApi';
import {
  GetUserResponse, PostUserRequest, PostUserResponse, USER_ERROR_CODES, UserError,
} from '../types/services/user/userTypes';

interface IUserContext {
  user: User | null,
  signOut: (data?: AuthEventData | undefined) => void,
  isLoading: boolean,
}

const defaultState: IUserContext = {
  user: null,
  signOut: () => {},
  isLoading: true,
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

function UserProvider({ children }: UserContextProps) {
  const {
    user: authUser, signOut: authSignOut, isPending,
  } = useAuthenticator((context) => [context.user]);
  const [user, setUser] = useState(defaultState.user);

  const handlePostUser = useCallback(async (recievedUser: MyAmplifyUser) => {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      preferred_username, email, given_name, family_name, sub,
    } = recievedUser.attributes;
    const requestBody: PostUserRequest = {
      id: sub,
      username: preferred_username,
      firstName: given_name,
      familyName: family_name,
      email,
    };
    const postUserResponse = await postUser(requestBody);
    if (postUserResponse.success) {
      const res = postUserResponse as PostUserResponse;
      const postedUser = new User(res);
      setUser(postedUser);
    } else {
      setUser(null);
    }
  }, [setUser]);

  const handleGetUser = useCallback(async (recievedUser: MyAmplifyUser) => {
    const getUserResponse = await getUser();
    if (getUserResponse.success) {
      const res = getUserResponse as GetUserResponse;
      const fetchedUser = new User(res);
      setUser(fetchedUser);
    } else {
      const res = getUserResponse as UserError;
      if (res.errorCode === USER_ERROR_CODES.DOES_NOT_EXIST) {
        handlePostUser(recievedUser);
      } else {
        setUser(null);
      }
    }
  }, [setUser, handlePostUser]);

  const handleSignOut = useCallback(() => {
    authSignOut();
    setUser(null);
  }, [authSignOut]);

  useEffect(() => {
    if (authUser) {
      handleGetUser(authUser as MyAmplifyUser);
    } else {
      setUser(null);
    }
  }, [authUser, handleGetUser]);

  const contextValue = useMemo<IUserContext>(
    () => ({
      user,
      signOut: handleSignOut,
      isLoading: isPending,
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

type WrappedUserProviderProps = {
  children: React.ReactNode,
};

function WrappedUserProvider({ children }: WrappedUserProviderProps) {
  configureAmplify();
  return (
    <Authenticator.Provider>
      <UserProvider>
        {
          children
        }
      </UserProvider>
    </Authenticator.Provider>
  );
}

export default WrappedUserProvider;
