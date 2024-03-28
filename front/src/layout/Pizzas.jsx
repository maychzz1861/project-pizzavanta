import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { OrderContext } from "../contexts/OrderContext";

export default function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [crustType, setCrustType] = useState('');
  const [size, setSize] = useState('');
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pizzas');
        setPizzas(response.data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []);

  useEffect(() => {
    // Filter pizzas based on search query, crust type, and size
    const filtered = pizzas.filter(pizza =>
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (crustType === '' || pizza.crustType === crustType) &&
      (size === '' || pizza.size === size)
    );
    setFilteredPizzas(filtered);
    setTotalPages(Math.ceil(filtered.length / 6)); // คำนวณ totalPages และกำหนดค่าให้กับตัวแปร state
  }, [searchQuery, crustType, size, pizzas]);

  // ตรวจสอบเงื่อนไขใน nextPage() เพื่อให้ไม่สามารถกดหน้าถัดไปเมื่อไม่มีเนื้อหาในหน้าถัดไปแล้ว
  const nextPage = () => {
    const totalPages = Math.ceil(filteredPizzas.length / 6); // สมมติว่ามีรายการ 6 รายการต่อหน้า
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const currentPizzas = filteredPizzas.slice(startIndex, endIndex);



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCrustChange = (e) => {
    setCrustType(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div>
      <div className="navbar-container">
        <div className="navbar bg-gradient-to-r from-orange-200 via-red-300 to-red-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>

          <div className="flex-1">
            <NavLink to="/" className="mx-16" activeClassName="text-red-600">
              <div className="logoG" />
            </NavLink>
            <NavLink exact to="/header" className="mx-6 font-semibold">หน้าหลัก</NavLink>
            <NavLink to="/about" className="mx-6 font-semibold" activeClassName="text-red-600 ">เกี่ยวกับเรา</NavLink>
            <NavLink to="/pizzas" className="mx-6 font-semibold" activeClassName="text-red-600 " style={{ color: '#dc2626' }}>เมนู</NavLink>
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
      </div>
      <div className="background-containerMenu flex flex-col h-screen"></div>
      <div className="botIcon">
        <h1 className="btn btn-outline btn-error">Pizza Vanta</h1>
      </div>


      <div className="background-containerMenu2 relative flex flex-col justify-center" style={{ minHeight: '100vh' }}>
        <div className="searchBox" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input type="text" placeholder="ค้นหา..." onChange={handleSearchChange} style={{ padding: '8px', borderRadius: '20px', border: '1px solid #ccc', marginRight: '5px' }} />
          <select onChange={handleCrustChange} style={{ padding: '8px', borderRadius: '20px', border: '1px solid #ccc', marginRight: '5px' }}>
            <option value="">เลือกขอบแป้ง</option>
            <option value="THIN_CRISPY">แป้งบางกรอบ</option>
            <option value="THICK_SOFT">แป้งหนานุ่ม</option>
          </select>
          <select onChange={handleSizeChange} style={{ padding: '8px', borderRadius: '20px', border: '1px solid #ccc', marginRight: '5px' }}>
            <option value="">เลือกไซส์</option>
            <option value="SMALL">ถาดเล็ก</option>
            <option value="MEDIUM">ถาดกลาง</option>
            <option value="LARGE">ถาดใหญ่</option>
          </select>
          <button className="searchButton" style={{ backgroundColor: '#dc2626', color: '#fff', padding: '8px 15px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}>
            ค้นหา
          </button>
        </div>
    
        <div style={{ marginTop: '88px' }}>
          <div className="grid grid-cols-3 gap-20" style={{ padding: '50px', marginLeft: '40px' }}>
            {currentPizzas.length === 0 ? (
              <div className="grid-item bg-base-100 shadow-xl" style={{ marginTop: '-280px', borderRadius: '80px' }}>
                <h3 className="text-2xl font-semibold text-center">ไม่พบรายการพิซซ่า</h3>
              </div>
            ) : (
              currentPizzas.map(pizza => (
                <div key={pizza.id} className="grid-item bg-base-100 shadow-xl" style={{ width: '380px', height: '380px', borderRadius: '30px' }}>
                  <div className="card-body" >
                    <img src={pizza.image} alt={pizza.name} className="mb-2" style={{ position: 'relative', top: '-130px', height: '230px', minWidth: '100%' }} />

                    <h3 className="text-xl font-semibold" style={{ position: 'relative', top: '-140px', textAlign: 'center' }}>{pizza.name}</h3>
                    <p style={{ position: 'relative', top: '-135px', textAlign: 'center' }}>{pizza.description}</p>
                    <p style={{ position: 'relative', top: '-140px', color: 'green', fontWeight: 'bold', fontSize: '1.2em', textShadow: '1px 2px 5px rgba(0, 0, 0, 0.5)', textAlign: 'center', margin: '0 auto' }}>
                      {pizza.crustType === 'THIN_CRISPY' ? 'แป้งบางกรอบ' : (pizza.crustType === 'THICK_SOFT' ? 'แป้งหนานุ่ม' : pizza.crustType)} {' '}
                      {pizza.size === 'SMALL' ? 'ถาดเล็ก' : (pizza.size === 'MEDIUM' ? 'ถาดกลาง' : (pizza.size === 'LARGE' ? 'ถาดใหญ่' : pizza.size))}
                    </p>

                    <p style={{ position: 'relative', top: '-100px', fontSize: '1.3em', fontWeight: 'bold', color: '#dc2626' }}>{pizza.price} <span style={{ fontSize: '1em' }}>฿</span></p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-success" onClick={() => document.getElementById('my_modal_3').showModal()} style={{ position: 'relative', top: '-150px' }}>+ เพิ่มสินค้า</button>
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                          </form>
                          <h3 className="font-bold text-lg">กรุณาเข้าสู่ระบบค่ะ</h3>
                          <p className="py-4">กรุณาเข้าสู่ระบบเพื่อทำการสั่งซื้อ</p>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="join" style={{ position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)' }}>
          <button className="join-item btn" onClick={prevPage}>«</button>
          <button className="join-item btn">หน้า {currentPage}</button>
          <button className="join-item btn" onClick={nextPage}>»</button>
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