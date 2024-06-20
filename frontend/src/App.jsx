import { AuthRoute } from './util/route_util';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/nav/navbar';

import MainPage from './components/main/mainPage';
import LoginForm from './components/session/loginForm';
import SignupForm from './components/session/signupForm';
import Game from './components/game/game';
import Modal from './components/modals/modal';

const Layout = () => {
  return (
    <>
      <Modal />
      <NavBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "login",
        element: <AuthRoute component={LoginForm} />
      },
      {
        path: "signup",
        element: <AuthRoute component={SignupForm} />
      },
      {
        path: "game",
        element: <Game />
      },
      {
        path: "*",
        element: <Navigate to="game" replace={true} />
      }
    ]
  }
]);

function App () {
  return <RouterProvider router={router} />;
}

export default App;
