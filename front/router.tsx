import { createBrowserRouter } from 'react-router-dom';
import App from './layouts/App';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';

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
