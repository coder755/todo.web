import { Auth } from 'aws-amplify';

const getBaseAccessControlHeaders = () => new Headers(
  {
    'Access-Control-Allow-Origin': '*',
    Accept: '*/*',
    'Cache-Control': 'no-cache',
  },
);

const sanitizeString = (str: string) => str.replace(/['"]+/g, '');

export const getUserIdToken = async () => {
  const session = await Auth.currentSession();
  const jwt = session.getIdToken().getJwtToken();
  return jwt;
};

export const getAuthHeaders = async () => {
  const jwt = await getUserIdToken();
  const authString = sanitizeString(`Bearer ${jwt}`);
  const headers = getBaseAccessControlHeaders();
  headers.set('Authorization', authString);
  return headers;
};

export const getPostAuthHeader = async () => {
  const authHeaders = await getAuthHeaders();
  authHeaders.set('Content-Type', 'application/json');
  return authHeaders;
};
