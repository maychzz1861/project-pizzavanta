// guestHeader.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import videoBackground from '../photos/gg.mp4';


function GuestHeader() {
  return (
    <div className="navbar-container">
      <div className="navbar bg-gradient-to-r from-orange-200 via-red-300 to-red-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <div className="flex-1">
          <NavLink to="/" className="mx-16" activeClassName="text-red-600">
            <div className="logoG" />
          </NavLink>
          <NavLink exact to="/header" className="mx-6 font-semibold" style={{ color: '#dc2626' }}>หน้าหลัก</NavLink>
          <NavLink to="/about" className="mx-6 font-semibold" activeClassName="text-red-600 ">เกี่ยวกับเรา</NavLink>
          <NavLink to="/pizzas" className="mx-6 font-semibold" activeClassName="text-red-600 ">เมนู</NavLink>
          <NavLink to="/contact" className="mx-6 font-semibold" activeClassName="text-red-600 ">ติดต่อเรา</NavLink>
        </div>
        <div className="indicator mr-1">
          <NavLink to="/login" className="flex items-center mx-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="red" />
            </svg>
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <NavLink to="/login" className="green-button mx-2">เข้าสู่ระบบ</NavLink>
            </li>
            <li>
              <NavLink to="/register" className="green-button mx-3">สร้างบัญชี</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <video autoPlay muted loop style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, filter: 'brightness(34%)' }}>
        <source src={videoBackground} type="video/mp4" />
      </video>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <p className="text-6xl font-semibold mb-6 text-animation" style={{ backgroundImage: 'linear-gradient(to top, #FFC0CB, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', letterSpacing: '-0.02em' }}>ยินดีต้อนรับเข้าสู่!</p>
        <p className="text-6xl font-semibold mb-6 text-animation" style={{ backgroundImage: 'linear-gradient(90deg, #dc2626, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '5rem' }}>Vanta Pizza</p>
        <p className="text-white text-1xl font-semibold mb-6 text-animation" style={{ textShadow: '2px 2px #000000', fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
          Ordering your fave Pizza is quick and easy with our app or on our website.
        </p>
      </div>
    </div>
  );
}


    export default GuestHeader;