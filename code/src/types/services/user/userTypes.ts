// eslint-disable-next-line @typescript-eslint/naming-convention
export enum USER_ERROR_CODES {
  DOES_NOT_EXIST = 'DOES_NOT_EXIST',
  POST_USER_FAILED = 'POST_USER_FAILED',
  UNKNOWN = 'UNKNOWN',
}

interface UserBaseResponse {
  success: boolean
}

export interface UserError extends UserBaseResponse {
  errorCode?: USER_ERROR_CODES,
  errorType?: string
}

export type UserDto = {
  externalId: string
  username?: string,
  firstName?: string,
  familyName?: string,
  email?: string
};

export interface GetUserResponse extends UserBaseResponse {
  user: UserDto
}

export interface PostUserRequest {
  id: string,
  username: string,
  firstName: string,
  familyName: string,
  email: string
}

export interface PostUserResponse extends UserBaseResponse {
  user: UserDto
}
