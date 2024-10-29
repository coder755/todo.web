import { cleanup, render } from '@testing-library/react';
import AccountPage from '../AccountPage';
import { IUserContext, UserContext } from '../../../context/UserContext';
import { User } from '../../../models/User';

jest.mock('../../../context/UserContext');
jest.mock('../../Page/Page');
jest.mock('../../../displays/Todos/TodosDisplay');

const renderAccountPage = (contextValue: IUserContext) => render(
  <UserContext.Provider value={contextValue}>
    <AccountPage />
  </UserContext.Provider>,
);

describe('AccountPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  it('shows loading spinner when expected', () => {
    const value: IUserContext = {
      user: new User(),
      isLoading: true,
      signOut: () => {},
      errorMessage: '',
    };
    const { getByTestId } = renderAccountPage(value);
    const progress = getByTestId('AccountPage-Progress');
    expect(progress).toBeInTheDocument();
  });

  it('shows todos display when expected', () => {
    const value: IUserContext = {
      user: new User(),
      isLoading: false,
      signOut: () => {},
      errorMessage: '',
    };
    const { getByText } = renderAccountPage(value);
    const todosDisplay = getByText('TodosDisplay');
    expect(todosDisplay).toBeInTheDocument();
  });
});
