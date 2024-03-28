import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { OrderContext } from '../contexts/OrderContext';

function About() {
    const { user, logout } = useAuth();
    const {totalItemsInCart} = useContext(OrderContext)

  const handleLogoutClick = () => {
    logout();  
  };

    return (
      <div className="navbar-container">
        <div className="navbar bg-gradient-to-r from-orange-200 via-red-300 to-red-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <div className="flex-1">
          <NavLink to="/" className="mx-16" activeClassName="text-red-600">
            <div className="logoG" />
          </NavLink>
          <NavLink exact to="/header" className="mx-6 font-semibold">หน้าหลัก</NavLink>
          <NavLink to="/about" className="mx-6 font-semibold" activeClassName="text-red-600 " style={{ color: '#dc2626' }}>เกี่ยวกับเรา</NavLink>
          <NavLink to="/pizzas" className="mx-6 font-semibold" activeClassName="text-red-600 ">เมนู</NavLink>
          <NavLink to="/contact" className="mx-6 font-semibold" activeClassName="text-red-600 ">ติดต่อเรา</NavLink>
        </div>
        <div className="indicator mr-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="badge badge-sm indicator-item text-red-600">{totalItemsInCart}</span>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 ">
            <div className="flex-1 d-flex">
              {user && (
                <a className="btn btn-ghost">สวัสดี {user.firstName}</a>
              )}
            </div>
            <li>
              <button className="green-button mx-3" onClick={handleLogoutClick} style={{ fontWeight: 'bold', cursor: 'pointer' }}>ออกจากระบบ</button>
            </li>
          </ul>
        </div>
      </div>
          <div className="background-containerA relative flex flex-col justify-center h-screen">
          <div className="text-animation-container">
  <p className="text-white text-6xl font-semibold ml-20 mb-6 text-animation" style={{ color: '#dc2626', marginTop: '40px' }}>เกี่ยวกับเรา</p>
  <p className="text-white text-1xl font-semibold ml-20 mb-3 text-animation">
    เรานำเสนอพิซซ่าที่ไม่เหมือนใคร! ด้วยแบรนด์ที่เป็นเอกลักษณ์และความเชี่ยวชาญในวงการอาหาร
  </p>
  <p className="text-white text-1xl font-semibold ml-20 mb-3 text-animation">  
    เราใส่ใจทุกความต้องการของลูกค้าเพื่อให้ได้รสชาติที่เฉพาะเจาะจง ด้วยคุณภาพที่ดี สดใหม่ และราคาที่เป็นไปได้
  </p>
  <p className="text-white text-1xl font-semibold ml-20 mb-6 text-animation">  
    พบเราได้ทุกที่ สั่งง่ายผ่านระบบออนไลน์ เราใส่ใจถึงคุณ เพราะคุณทำให้เราพิเศษ!
  </p>
</div>

      <div className="custom-image-container">
  <div className="custom-image image1"></div>
  <div className="custom-image image2"></div>
  <div className="custom-image image3"></div>
</div>

    </div>
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded" >
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-6">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    
    </div>
      );
    }   

export default About;
