import {
  GetTodosResponse, PostTodoCompletedResponse,
  PostTodoRequest, PostTodoResponse, TODO_ERROR_CODES, TodoDto, TodoError,
} from '../types/services/todos/todoTypes';
import { getAuthHeaders, getPostAuthHeader } from '../util/authUtils';
import { getEnvConfig } from '../util/envConfig';

const { todoServiceBaseUrl } = getEnvConfig();
const apiUrl = '/api/todo/v1';

export const getTodos = async (): Promise<GetTodosResponse | TodoError> => {
  const url = `${todoServiceBaseUrl}${apiUrl}`;
  const headers = await getAuthHeaders();
  const requestInit: RequestInit = {
    method: 'get',
    headers,
  };
  try {
    const response = await fetch(url, requestInit);
    if (response.ok) {
      const todos = await response.json() as TodoDto[];
      const result: GetTodosResponse = {
        todos,
        success: true,
      };
      return result;
    }
    return {
      success: false,
      errorCode: TODO_ERROR_CODES.UNKNOWN,
    };
  } catch (e) {
    return {
      success: false,
      errorCode: TODO_ERROR_CODES.UNKNOWN,
    };
  }
};

export const postTodo = async (
  todoToPost: PostTodoRequest,
): Promise<PostTodoResponse | TodoError> => {
  const url = `${todoServiceBaseUrl}${apiUrl}`;
  const requestInit = {
    method: 'post',
    headers: await getPostAuthHeader(),
    body: JSON.stringify(todoToPost),
  };
  try {
    await fetch(url, requestInit);
    return {
      success: true,
    } as PostTodoResponse;
  } catch (e) {
    const errorResponse: TodoError = {
      success: false,
    };
    return errorResponse;
  }
};

export const postTodoCompleted = async (
  todoId: string,
): Promise<PostTodoCompletedResponse | TodoError> => {
  const url = `${todoServiceBaseUrl}${apiUrl}/${todoId}/completed`;
  const requestInit = {
    method: 'post',
    headers: await getPostAuthHeader(),
  };
  try {
    await fetch(url, requestInit);
    return {
      success: true,
    } as PostTodoCompletedResponse;
  } catch (e) {
    const errorResponse: TodoError = {
      success: false,
    };
    return errorResponse;
  }
};

export const NO_OP = () => {};
