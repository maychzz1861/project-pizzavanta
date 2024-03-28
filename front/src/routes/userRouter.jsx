import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import UserHeader from '../user/UserHeader';
import LoginForm from '../layout/LoginForm';
import About from '../user/About';
import Contact from '../user/Contact';
import Pizzas from '../user/Pizzas';
import { Payment } from '../user/Payment';
// import GuestHeader from '../Guest/GuestHeader';
// import Logout from '../user/logout';


const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>

<Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHeader /> },
      { path: '/login', element: <LoginForm /> },
      { path: '/header', element: <Header /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/pizzas', element: <Pizzas /> },
      { path: '/payment', element: <Payment /> },
      // { path: '/guest', element: <GuestHeader /> },
      // { path: '/logout', element: <Logout /> },
    ],
  },
]);

export default userRouter;
