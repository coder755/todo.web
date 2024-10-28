import { getTodos } from '../todosApi';
import { GetTodosResponse, TODO_ERROR_CODES, TodoError } from '../../types/services/todos/todoTypes';

jest.mock('../../util/authUtils');
jest.mock('../../util/envConfig');

describe('getTodos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns todos on fetch success', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ([]),
    });

    const { todos, success } = await getTodos() as GetTodosResponse;
    expect(todos.length).toBe(0);
    expect(success).toBe(true);
  });

  it('returns expected error code on fetch failure', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    const { errorCode, success } = await getTodos() as TodoError;
    expect(errorCode).toBe(TODO_ERROR_CODES.UNKNOWN);
    expect(success).toBe(false);
  });

  it('returns expected error code on fetch throw', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error');
    });

    const { errorCode, success } = await getTodos() as TodoError;
    expect(errorCode).toBe(TODO_ERROR_CODES.UNKNOWN);
    expect(success).toBe(false);
  });
});
