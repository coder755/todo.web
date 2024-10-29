import { RouteObject, createBrowserRouter } from 'react-router-dom';
import AccountPage from './Account/AccountPage';
import HomePage from './Home/HomePage';
import LoginPage from './Login/LoginPage';
import {
  AccountPagePath, HomePagePath, LoginPagePath,
} from './consts';

const pagesAsRoutes: RouteObject[] = [
  {
    path: AccountPagePath,
    element: <AccountPage />,
  },
  {
    path: HomePagePath,
    element: <HomePage />,
  },
  {
    path: LoginPagePath,
    element: <LoginPage />,
  },
];

export const getRouter = () => createBrowserRouter(pagesAsRoutes);

export const NO_OP = () => {};
