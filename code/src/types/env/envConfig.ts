export enum EnvTypes {
  PROD = 'PROD',
  DEV = 'DEV',
  TEST = 'TEST'
}

export interface EnvConfig {
  env: EnvTypes;
  userServiceBaseUrl: string;
  todoServiceBaseUrl: string;
  webSocketBaseUrl: string;
}
