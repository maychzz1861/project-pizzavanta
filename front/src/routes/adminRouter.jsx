// adminRouter.jsx
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import AddForm from '../admin/AddForm';
import AdminHeader from '../admin/AdminHeader';

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <AdminHeader /> },
      { path: '/header', element: <Header /> },
    ],
  },
]);

export default adminRouter;
