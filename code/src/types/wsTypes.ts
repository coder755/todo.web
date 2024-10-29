import { getEnvConfig } from '../util/envConfig';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum SocketMessageType {
  AddTokenRequest = 'AddTokenRequest',
}

export type SendTokenRequest = {
  type: SocketMessageType,
  token: string
};

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

const { webSocketBaseUrl } = getEnvConfig();
const apiUrl = 'api/notification/v1/';
export const WEB_SOCKET_URL = `${webSocketBaseUrl}/${apiUrl}`;
