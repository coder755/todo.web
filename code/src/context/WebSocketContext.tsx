import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { configureAmplify } from '../auth/amplifyConfig';
import WS, { getMessageType, MessageTypes } from '../api/WS';
import { getUserIdToken } from '../util/authUtils';

type CallbackRequest = {
  id: string,
  callback: (message?: string) => {}
};

interface IWebSocketContext {
  isLoading: boolean,
  isWebsocketOpen: boolean,
  registerListener: (type: MessageTypes, cbRequest: CallbackRequest) => void,
  removeListener: (type: MessageTypes, cbId: string) => void,
}

const defaultContext: IWebSocketContext = {
  isLoading: true,
  isWebsocketOpen: false,
  registerListener: () => {},
  removeListener: () => {},
};

type RegisteredListeners = {
  [key in keyof typeof MessageTypes]: CallbackRequest[];
};

interface IWebSocketState {
  registeredListeners: RegisteredListeners
  isLoading: boolean,
  webSocket: WS | null
}

const defaultState: IWebSocketState = {
  registeredListeners: {
    [MessageTypes.UserCreated]: [],
    [MessageTypes.TodoCreated]: [],
    [MessageTypes.TodoCompleted]: [],
    [MessageTypes.Unknown]: [],
  },
  isLoading: true,
  webSocket: null,
};

export const WebSocketContext = createContext<IWebSocketContext>(defaultContext);

type WebSocketContextProps = {
  children: React.ReactNode;
};

function WebSocketProvider({ children }: WebSocketContextProps) {
  const { user } = useAuthenticator((context) => [context.user]);
  const [registeredListeners, setRegisteredListeners] = useState(defaultState.registeredListeners);
  const [webSocket, setWebSocket] = useState(defaultState.webSocket);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebsocketOpen, setIsWebsocketOpen] = useState(false);

  const handleOpen = async () => {
    setIsWebsocketOpen(true);
    setIsLoading(false);
  };
  const handleClose = () => {
    setIsWebsocketOpen(false);
    setWebSocket(null);
  };
  const handleError = () => {
    console.log('handleError called');
  };

  const handleOnMessage = (e: MessageEvent<string>) => {
    const messageType = getMessageType(e.data);
    const listeners = registeredListeners[messageType];
    listeners.forEach(({ callback }) => {
      callback();
    });
  };

  const handleInitSocket = useCallback(() => {
    setIsLoading(true);
    const ws = new WS({
      onOpen: handleOpen,
      onClose: handleClose,
      onError: handleError,
      onMessage: handleOnMessage,
    });
    setWebSocket(ws);
    return ws;
  }, []);

  const handleRegisterListener = useCallback((type: MessageTypes, callback: CallbackRequest) => {
    registeredListeners[type].push(callback);
    setRegisteredListeners(registeredListeners);
  }, []);

  const handleRemoveListener = (type: MessageTypes, id: string) => {
    const index = registeredListeners[type].findIndex((item) => item.id === id);
    registeredListeners[type].splice(index, 1);
    setRegisteredListeners(registeredListeners);
  };

  useEffect(() => {
    const hasUser = !!user;
    if (hasUser) {
      const ws = handleInitSocket();
      return () => {
        ws.close();
      };
    }
    return () => {};
  }, [user]);

  const handleSendToken = async () => {
    if (webSocket) {
      const token = await getUserIdToken();
      webSocket.sendToken(token);
    }
  };

  useEffect(() => {
    if (isWebsocketOpen) {
      handleSendToken();
    }
  }, [isWebsocketOpen]);

  const contextValue = useMemo<IWebSocketContext>(
    () => ({
      isLoading,
      isWebsocketOpen,
      registerListener: handleRegisterListener,
      removeListener: handleRemoveListener,
    }),
    [isLoading],
  );

  return (
    <WebSocketContext.Provider
      value={contextValue}
    >
      {
        children
      }
    </WebSocketContext.Provider>
  );
}

type WrappedWebSocketProviderProps = {
  children: React.ReactNode,
};

function WrappedWebSocketProvider({ children }: WrappedWebSocketProviderProps) {
  configureAmplify();
  return (
    <Authenticator.Provider>
      <WebSocketProvider>
        {
          children
        }
      </WebSocketProvider>
    </Authenticator.Provider>
  );
}
export default WrappedWebSocketProvider;
