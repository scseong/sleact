import { createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import App from './layouts/App';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
]);
