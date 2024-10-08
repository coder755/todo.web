export enum EnvTypes {
  PROD = 'PROD',
  DEV = 'DEV',
}

export interface EnvConfig {
  env: EnvTypes;
  userServiceBaseUrl: string;
  todoServiceBaseUrl: string;
}
