import {
  GetUserResponse, PostUserRequest, PostUserResponse, USER_ERROR_CODES, UserDto, UserError,
} from '../types/services/user/userTypes';
import { getEnvConfig } from '../util/envConfig';
import { getAuthHeaders, getPostAuthHeader } from '../util/authUtils';
import { getUserErrorCode } from '../types/services/user/errorUtils';

const { userServiceBaseUrl } = getEnvConfig();
const apiUrl = '/api/user/v1';

export const getUser = async (): Promise<GetUserResponse | UserError> => {
  const url = `${userServiceBaseUrl}${apiUrl}`;
  const headers = await getAuthHeaders();
  const requestInit: RequestInit = {
    method: 'get',
    headers,
  };
  try {
    const response = await fetch(url, requestInit);
    if (response.status === 200) {
      const user = await response.json() as UserDto;
      const result: GetUserResponse = {
        user,
        success: true,
      };
      return result;
    } if (response.status === 204) {
      return {
        success: false,
        errorCode: USER_ERROR_CODES.DOES_NOT_EXIST,
      };
    }
    return {
      success: false,
      errorCode: USER_ERROR_CODES.UNKNOWN,
    };
  } catch (e) {
    const errorResponse: UserError = {
      success: false,
      errorCode: USER_ERROR_CODES.UNKNOWN,
    };
    return errorResponse;
  }
};

export const postUser = async (
  userToPost: PostUserRequest,
): Promise<PostUserResponse | UserError> => {
  const url = `${userServiceBaseUrl}${apiUrl}`;
  const authHeader = await getPostAuthHeader();
  const requestInit: RequestInit = {
    method: 'post',
    headers: authHeader,
    body: JSON.stringify(userToPost),
  };
  try {
    const response = await fetch(url, requestInit);
    if (response.ok) {
      const result = await response.json();
      result.success = true;
      return result;
    }
    const errorCode = getUserErrorCode(response.status);
    const errorResponse: UserError = {
      success: false,
      errorCode,
    };
    return errorResponse;
  } catch (e) {
    const errorResponse: UserError = {
      success: false,
      errorCode: USER_ERROR_CODES.UNKNOWN,
    };
    return errorResponse;
  }
};
