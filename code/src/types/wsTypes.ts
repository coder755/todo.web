// eslint-disable-next-line @typescript-eslint/naming-convention
export enum SocketMessageType {
  AddTokenRequest = 'AddTokenRequest',
}

export type SendTokenRequest = {
  type: SocketMessageType,
  token: string
};
