import { USER_ERROR_CODES } from './userTypes';

export const getUserErrorCode = (status: number) => {
  let errorCode = USER_ERROR_CODES.UNKNOWN;
  switch (status) {
    case 500:
      errorCode = USER_ERROR_CODES.POST_USER_FAILED;
      break;
    case 404:
      errorCode = USER_ERROR_CODES.DOES_NOT_EXIST;
      break;
    default:
      errorCode = USER_ERROR_CODES.UNKNOWN;
  }
  return errorCode;
};

export const NO_OP = () => {};
