import { TodoDto } from '../types/services/todos/todoTypes';

export class Todo {
  externalId = '';

  name = '';

  isComplete = false;

  completeDate = '';

  constructor(todoDto?: TodoDto) {
    if (todoDto) {
      this.externalId = todoDto.externalId || '';
      this.name = todoDto.name || '';
      this.isComplete = todoDto.isComplete || false;
      this.completeDate = todoDto.completeDate || '';
    }
  }
}

export const NO_OP = () => {};
