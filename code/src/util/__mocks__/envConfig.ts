import { EnvConfig, EnvTypes } from "../../types/env/envConfig";

export const getEnvConfig = jest.fn((): EnvConfig => {
  return {
    env: EnvTypes.TEST,
    userServiceBaseUrl: 'userServiceBaseUrl',
    todoServiceBaseUrl: 'todoServiceBaseUrl',
    webSocketBaseUrl: 'webSocketBaseUrl',
  };
});
