import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../models/Todo';
import { getTodos, postTodo, postTodoCompleted } from '../api/todosApi';
import { GetTodosResponse, PostTodoRequest } from '../types/services/todos/todoTypes';

interface ITodosContext {
  isLoading: boolean,
  todos: Todo[],
  addTodo: (postTodoRequest: PostTodoRequest) => Promise<boolean>,
  completeTodo: (todoId: string) => Promise<boolean>,
}

const defaultState: ITodosContext = {
  isLoading: true,
  todos: [],
  addTodo: () => new Promise((res) => { res(false); }),
  completeTodo: () => new Promise((res) => { res(false); }),
};

export const TodosContext = createContext<ITodosContext>(defaultState);

type TodosContextProps = {
  children: React.ReactNode;
};

function TodosProvider({ children }: TodosContextProps) {
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);
  const [todos, setTodos] = useState(defaultState.todos);

  const handleGetTodos = useCallback(async () => {
    setIsLoading(true);
    const getTodosResponse = await getTodos();
    setIsLoading(false);

    if (getTodosResponse.success) {
      const res = getTodosResponse as GetTodosResponse;
      const newTodos: Todo[] = [];
      res.todos?.forEach((todoDto) => {
        newTodos.push(new Todo(todoDto));
      });
      setTodos(newTodos);
    } else {
      console.error('Handle getTodos error');
    }
  }, [setIsLoading, setTodos]);

  const handlePostTodo = useCallback(async (postTodoRequest: PostTodoRequest) => {
    setIsLoading(true);
    const postTodoResponse = await postTodo(postTodoRequest);
    setIsLoading(false);
    if (postTodoResponse.success) {
      await handleGetTodos();
    } else {
      console.error('Handle handlePostTodo error');
    }
    return postTodoResponse.success;
  }, [setIsLoading, handleGetTodos]);

  const handleCompleteTodo = useCallback(async (todoId: string) => {
    setIsLoading(true);
    const postTodoCompletedResponse = await postTodoCompleted(todoId);
    setIsLoading(false);
    if (postTodoCompletedResponse.success) {
      await handleGetTodos();
    } else {
      console.error('Handle handleCompleteTodo error');
    }
    return postTodoCompletedResponse.success;
  }, [setIsLoading, handleGetTodos]);

  useEffect(() => {
    handleGetTodos();
  }, [handleGetTodos]);

  const contextValue = useMemo<ITodosContext>(() => ({
    isLoading,
    todos,
    addTodo: handlePostTodo,
    completeTodo: handleCompleteTodo,
  }), [isLoading, todos, handlePostTodo]);

  return (
    <TodosContext.Provider
      value={contextValue}
    >
      {
        children
      }
    </TodosContext.Provider>
  );
}

export default TodosProvider;
