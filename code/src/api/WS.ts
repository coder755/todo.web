import { SendTokenRequest, SocketMessageType } from '../types/wsTypes';
import { getEnvConfig } from '../util/envConfig';

const { webSocketBaseUrl } = getEnvConfig();
const apiUrl = 'api/notification/v1/';
const WEB_SOCKET_URL = `${webSocketBaseUrl}/${apiUrl}`;

export enum MessageTypes {
  UserCreated = 'UserCreated',
  TodoCreated = 'TodoCreated',
  TodoCompleted = 'TodoCompleted',
  Unknown = 'Unknown',
}

export const getMessageType = (colorName: string): MessageTypes => {
  const messageType = MessageTypes[colorName as keyof typeof MessageTypes];
  if (!messageType) return MessageTypes.Unknown;
  return messageType;
};

export const waitForOpenConnection = (socket: WebSocket) => new Promise((resolve, reject) => {
  const maxNumberOfAttempts = 10;
  const intervalTime = 200; // ms

  let currentAttempt = 0;
  const interval = setInterval(() => {
    if (currentAttempt > maxNumberOfAttempts - 1) {
      clearInterval(interval);
      reject(new Error('Maximum number of attempts exceeded'));
    } else if (socket.readyState === socket.OPEN) {
      clearInterval(interval);
      resolve(true);
    }
    currentAttempt += 1;
  }, intervalTime);
});

export type WebSocketEventCallbacks = {
  onOpen: (e: WebSocketEventMap['open']) => void,
  onClose: (e: WebSocketEventMap['close']) => void,
  onError: (e: WebSocketEventMap['error']) => void,
  onMessage: (e: WebSocketEventMap['message']) => void,
};

class WS extends WebSocket {
  constructor(eventCallbacks: WebSocketEventCallbacks) {
    super(WEB_SOCKET_URL);
    this.onopen = eventCallbacks.onOpen;
    this.onclose = (e) => {
      eventCallbacks.onClose(e);
      this.close();
    };
    this.onerror = eventCallbacks.onError;
    this.onmessage = eventCallbacks.onMessage;
  }

  async sendToken(token: string) {
    const data: SendTokenRequest = {
      type: SocketMessageType.AddTokenRequest,
      token,
    };
    const dataJson = JSON.stringify(data);
    if (this.readyState !== this.OPEN) {
      try {
        await waitForOpenConnection(this);
        this.send(dataJson);
      } catch (err) { console.error(err); }
    } else {
      this.send(dataJson);
    }
  }
}

export default WS;
