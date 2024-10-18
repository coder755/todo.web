import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { AmplifyUser, AuthEventData } from '@aws-amplify/ui';
// import { Box } from '@mui/material';
import { configureAmplify } from '../auth/amplifyConfig';
import { User } from '../models/User';
import { getUser, postUser } from '../api/userApi';
import {
  GetUserResponse, PostUserRequest, USER_ERROR_CODES, UserError,
} from '../types/services/user/userTypes';

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
  errorMessage: ''
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
      setErrorMessage("Error attempting to get user");
    }
  }, [setUser]);

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
      handleGetUser()
      setErrorMessage('');
    } else {
      setUser(null);
      setErrorMessage("Error attempting to post user");
    }
  }, [setUser]);

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
        handlePostUser(recievedUser);
      } else {
        setUser(null);
        setErrorMessage("Error attempting to init get user");
      }
    }
  }, [setUser, handlePostUser]);

  const handleSignOut = useCallback(() => {
    authSignOut();
    setUser(null);
  }, [authSignOut]);

  useEffect(() => {
    if (authUser) {
      handleInitGetUser(authUser as MyAmplifyUser);
    } else {
      setUser(null);
    }
  }, [authUser, handleInitGetUser]);

  const isLoading = !user && isPending;

  const contextValue = useMemo<IUserContext>(
    () => ({
      user,
      signOut: handleSignOut,
      isLoading,
      errorMessage
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
      {/* <Box sx={{ display: 'none' }}>
        <Authenticator signUpAttributes={['email', 'given_name', 'family_name', 'preferred_username']} loginMechanisms={['email']} />
      </Box> */}
      <UserProvider>
        {
          children
        }
      </UserProvider>
    </Authenticator.Provider>
  );
}

export default WrappedUserProvider;
