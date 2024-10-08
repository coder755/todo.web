import { EnvConfig, EnvTypes } from '../types/env/envConfig';

const BASE_URL = 'huckandrose.com';

const HUCK_AND_ROSE_URL = `https://${BASE_URL}`;

const prodConfig: EnvConfig = {
  env: EnvTypes.PROD,
  userServiceBaseUrl: HUCK_AND_ROSE_URL,
  todoServiceBaseUrl: HUCK_AND_ROSE_URL,
};

const devConfig: EnvConfig = {
  env: EnvTypes.DEV,
  userServiceBaseUrl: 'http://localhost:5224',
  todoServiceBaseUrl: 'http://localhost:5224',
};

export const getEnvConfig = (): EnvConfig => {
  const env = import.meta.env.VITE_ENV;
  switch (env) {
    case EnvTypes.PROD:
      return prodConfig;
    case EnvTypes.DEV:
    default:
      return devConfig;
  }
};

export const NO_OP = () => {};
