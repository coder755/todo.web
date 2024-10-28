import { EnvConfig, EnvTypes } from '../../types/env/envConfig';

export const getEnvConfig = jest.fn((): EnvConfig => ({
  env: EnvTypes.TEST,
  userServiceBaseUrl: 'userServiceBaseUrl',
  todoServiceBaseUrl: 'todoServiceBaseUrl',
  webSocketBaseUrl: 'webSocketBaseUrl',
}));

export const NO_OP = () => {};
