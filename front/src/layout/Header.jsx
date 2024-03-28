import React from 'react';
import useAuth from '../hooks/useAuth';
import UserHeader from '../user/UserHeader';
import AdminHeader from '../admin/AdminHeader';
import GuestHeader from '../Guest/GuestHeader';


function Header() {
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    logout(); 
  };

  if (user?.role === 'ADMIN') {
    return <AdminHeader user={user} handleLogoutClick={handleLogoutClick} />;
  }

  return user?.id ? (
    <>
      <UserHeader user={user} handleLogoutClick={handleLogoutClick} />,
    
    </>
  ) : (
    <GuestHeader />
  );
}

export default Header;