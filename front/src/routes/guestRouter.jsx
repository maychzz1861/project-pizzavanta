import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import LoginForm from '../layout/LoginForm';
import RegisterForm from '../layout/RegisterForm';
import AboutUs from '../layout/AboutUs';
import ContactUs from '../layout/ContactUs';
import Pizzas from '../layout/Pizzas';




const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Header /> },
      { path: '/register', element: <RegisterForm /> },
      { path: '/login', element: <LoginForm /> },
      { path: '/header', element: <Header /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/pizzas', element: <Pizzas /> },

      
    ],
  },
]);

export default guestRouter;
