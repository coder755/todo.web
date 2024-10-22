// eslint-disable-next-line @typescript-eslint/naming-convention
export enum TODO_ERROR_CODES {
  POST_TODO_FAILED = 'POST_TODO_FAILED',
  UNKNOWN = 'UNKNOWN',
}

interface TodoBaseResponse {
  success: boolean
}

export interface TodoError extends TodoBaseResponse {
  errorCode?: TODO_ERROR_CODES,
  errorType?: string
}

export type TodoDto = {
  externalId: string,
  name: string,
  isComplete: boolean,
  completeDate: string
};

export interface GetTodosResponse extends TodoBaseResponse {
  todos: TodoDto[]
}

export interface PostTodoRequest {
  name: string,
  useQueue: boolean
}

export interface PostTodoResponse extends TodoBaseResponse {}

export interface PostTodoCompletedResponse extends TodoBaseResponse {}
