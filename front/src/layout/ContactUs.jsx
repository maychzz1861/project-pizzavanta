import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'; // เพิ่ม import axios

function ContactUs() {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const hdlChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const hdlSubmit = async (e) => {
        e.preventDefault();
        try {
            // ส่งข้อมูลไปยังแบ็กเอนด์
            const response = await axios.post('http://localhost:8000/contact', input);
            console.log(response.data); // แสดงข้อมูลที่ส่งกลับมาจากแบ็กเอนด์
            alert('ข้อความถูกส่งเรียบร้อยแล้ว!');
            setInput({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล!');
        }
    }


    return (
        <div className="navbar-container">
        <div className="navbar bg-gradient-to-r from-orange-200 via-red-300 to-red-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        
       <div className="flex-1">
          <NavLink to="/" className="mx-16" activeClassName="text-red-600">
            <div className="logoG" />
          </NavLink>
          <NavLink exact to="/header" className="mx-6 font-semibold">หน้าหลัก</NavLink>
          <NavLink to="/about" className="mx-6 font-semibold" activeClassName="text-red-600 ">เกี่ยวกับเรา</NavLink>
          <NavLink to="/pizzas" className="mx-6 font-semibold" activeClassName="text-red-600 ">เมนู</NavLink>
          <NavLink to="/contact" className="mx-6 font-semibold" activeClassName="text-red-600 " style={{ color: '#dc2626' }}>ติดต่อเรา</NavLink>
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
            <div className="background-containerC relative flex flex-col justify-center h-screen p-8">
    <h1 className="text-white text-6xl font-semibold text-center mb-6" style={ { color: '#dc2626', marginTop: '50px' }}>ติดต่อเรา</h1>
    <p className="text-white text-lg font-semibold text-center mb-3">
    อย่าลังเลที่จะติดต่อเราเมื่อไรก็ตามที่คุณต้องการ
                </p>
                <p className="text-white text-lg font-semibold text-center mb-8">
                    ความช่วยเหลือเราจะตอบกลับคำถามของคุณโดยเร็วที่สุด
                </p>
                <form className="mx-auto max-w-lg" onSubmit={hdlSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                name="firstName"
                                placeholder="ชื่อ"
                                value={input.firstName}
                                onChange={hdlChange}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                name="lastName"
                                placeholder="นามสกุล"
                                value={input.lastName}
                                onChange={hdlChange}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            name="email"
                            placeholder="อีเมล์"
                            value={input.email}
                            onChange={hdlChange}
                        />
                    </div>
                    <div className="mt-4">
                        <textarea
                            id="message"
                            className="textarea textarea-bordered w-full"
                            name="message"
                            rows="4"
                            placeholder="กรอกข้อความที่ต้องการส่ง"
                            value={input.message}
                            onChange={hdlChange}
                        ></textarea>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="btn btn-success px-2 py-1">ส่งข้อความ</button>
                    </div>
                </form>
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

export default ContactUs;