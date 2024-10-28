import { cleanup, fireEvent, render } from '@testing-library/react';
import TodoThumbnail from '../TodoThumbnail';
import { Todo } from '../../../models/Todo';

afterEach(cleanup);

describe('TodoThumbnail', () => {
  it('fires onCompletedClick with expected id', () => {
    const externalId = '123';
    const todo:Todo = {
      name: 'bestTodo',
      externalId,
      isComplete: false,
      completeDate: Date.now.toString(),
    };
    const completeCallback = jest.fn();
    const { getByText } = render(<TodoThumbnail todo={todo} onCompletedClick={completeCallback} />);
    const button = getByText('Complete');
    fireEvent.click(button);
    expect(completeCallback).toHaveBeenCalledTimes(1);
    expect(completeCallback).toHaveBeenCalledWith(externalId);
  });
});
