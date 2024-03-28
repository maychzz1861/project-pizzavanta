import React, { useContext, useEffect, useRef, useState } from 'react';
import '../user/Payment.css';
import { OrderContext } from '../contexts/OrderContext';
import { CartItem } from './CartItem';
import axios from 'axios';
import '../layout/styles.css';

export const Payment = () => {
    const [step, setStep] = useState(1);

    const promptpayphone = "0970687203";
    const promptpayQrcode = useRef(null);
    const { itemCart, totalAmount } = useContext(OrderContext);
    const total = totalAmount();
    const [pizzas, setPizzas] = useState([]);
    const prompray = "https://promptpay.io/" + promptpayphone + "/" + total + ".png";
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        province: '',
        district: '',
        subDistrict: '',
        isMainAddress: false,
        userId: parseInt(localStorage.getItem('userId')) // แนะนำให้ใช้ local storage หรือ context API เพื่อรับ userId
    });

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // เพิ่มตัวแปรสำหรับเก็บค่าการเลือกวิธีการชำระเงิน
    const [showQrCodeModal, setShowQrCodeModal] = useState(false); // เพิ่มตัวแปรสำหรับเก็บค่าการแสดงหรือซ่อน Modal ของ QR Code

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/shipping-addresses', input, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            // ส่งข้อมูลสำเร็จ
        } catch (error) {
            console.error('Error:', error);
            // เกิดข้อผิดพลาดในการส่งข้อมูล
        }
    };


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

    const pizzaItem = pizzas.map(pizza => ({
        id: pizza.id,
        image: pizza.image,
        name: pizza.name,
        description: pizza.description,
        crustType: pizza.crustType,
        size: pizza.size,
        price: pizza.price
    }));

    function checkSelectPaymentMethod(e) {
        setSelectedPaymentMethod(e.target.value); // เมื่อผู้ใช้เลือกแล้วให้ตั้งค่าตัวแปร selectedPaymentMethod เป็นค่าที่เลือก
        if (e.target.value === "QR-Code") {
            setShowQrCodeModal(true); // แสดง Modal ของ QR Code เมื่อเลือกคิวอาร์โค้ด
            promptpayQrcode.current.classList.remove('hidden'); // แสดงคิวอาร์โค้ด
        } else {
            setShowQrCodeModal(false); // ซ่อน Modal ของ QR Code เมื่อเลือกเงินสด
            promptpayQrcode.current.classList.add('hidden'); // ซ่อนคิวอาร์โค้ด
        }
    }
    

    return (
        <>
            <div className="background-containerP relative flex flex-col justify-center h-screen">
                <div className="parent">
                    <div className='flex flex-col items-center justify-center' id="div1">
                        <div className="logoG1" />
                        <p style={{ fontWeight: 'bold', fontSize: '25px', marginTop: '-190px', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }} className="text-white">การชำระเงิน</p>


                    </div>

                    <div className='' id="div2" style={{ marginTop: '-60px' }}>
                        <div className="p-4 bg-white rounded-lg" id="address_and_payment">
                            <legend className="text-lg font-semibold mb-2">กรอกที่อยู่</legend>


                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4" >
                                <div className="flex flex-row h-10">
                                    <div className="flex flex-col mr-4 ">
                                        <input type="text" name="firstName" placeholder="ชื่อ" value={input.firstName} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex flex-col mr-4">
                                        <input type="text" name="lastName" placeholder="นามสกุล" value={input.lastName} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex flex-col h-10">
                                        <input type="tel" name="phone" placeholder="เบอร์โทรศัพท์" value={input.phone} onChange={handleChange} className="input input-bordered w-full max-w-xs" />

                                    </div>
                                </div>
                                <div className="flex flex-row h-10">
                                    <div className="flex flex-col mr-4">
                                        <input type="email" name="email" placeholder="อีเมล" value={input.email} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex flex-col">
                                        <input type="text" name="address" placeholder="ที่อยู่" value={input.address} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-row h-10">
                                    <div className="flex flex-col mr-4  ">
                                        <input type="text" name="province" placeholder="จังหวัด" value={input.province} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex flex-col mr-4">
                                        <input type="text" name="district" placeholder="อำเภอ" value={input.district} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex flex-col">
                                        <input type="text" name="subDistrict" placeholder="ตำบล" value={input.subDistrict} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" name="isMainAddress" placeholder="" checked={input.isMainAddress} onChange={handleChange} />
                                    <label >ตั้งเป็นที่อยู่หลัก</label>
                                </div>
                                <button type="submit" className="btn btn-outline btn-success" style={{ width: '120px' }}>Submit</button>
                                <select onChange={(e) => checkSelectPaymentMethod(e)} className="select select-error">
                                    <option disabled selected>เลือกช่องทางการชำระเงิน</option>
                                    <option value="QR-Code">คิวอาร์โค้ด</option>
                                    <option value="Cash">เงินสด</option>
                                </select>

                                {selectedPaymentMethod === 'QR-Code' && (
                                    <>
                                        <p className="" onClick={() => setShowQrCodeModal(true)}></p>
                                        {showQrCodeModal && (
                                            <dialog id="my_modal_2" className="modal" open>
                                                <div className="modal-box">
                                                    <img src={prompray} alt="QR Code" className="qr-code" />
                                                    <button onClick={() => setShowQrCodeModal(false)}>ปิด</button>
                                                </div>
                                            </dialog>
                                        )}

                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center' id="div3" style={{ borderRadius: '10px', padding: '10px' }}>



                        <div className="w-96 h-96 " style={{ padding: '10px', marginTop: '-80px' }} id="listItem">
                            <div className="w-96 h-72 shadow-md " style={{ borderRadius: '10px', backgroundColor: 'rgba(242, 242, 242, 0.9)', padding: '10px' }} id="listItem">
                                <div className="flex justify-around border-b ">
                                    <p className='card-title'>สินค้า</p>
                                    <p className='card-title'>ราคา</p>
                                </div>
                                <div className="w-96 h-3/4 overflow-auto">
                                    {pizzaItem.map((pizza) => {
                                        if (itemCart[pizza.id] !== 0) {
                                            return (
                                                <div key={pizza.id} className="flex justify-between items-center border-b py-2 ">
                                                    <div className="flex items-center">
                                                        <img src={pizza.image} alt={pizza.name} className="w-24 h-20 rounded " />
                                                        <div>
                                                            <p className="text-sm" style={{ fontWeight: 'bold' }}>{pizza.name}</p>
                                                            <p style={{ width: '80px', textAlign: 'left', fontSize: '14px' }}>x{itemCart[pizza.id]}</p>
                                                        </div>
                                                    </div>
                                                    <p style={{ fontWeight: 'bold' }}>{pizza.price}฿</p>

                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="w-96 h-16  flex justify-around items-center mt-4 shadow-md" style={{ borderRadius: '10px', marginTop: '-70px', marginLeft: '30px', fontWeight: 'bold', backgroundColor: 'rgba(242, 242, 242, 0.9)' }}>
                            <p className="text-lg" >รวม</p>
                            <p className="text-lg" style={{ color: 'red' }}>{total}฿</p>

                        </div>
                        <div className="flex justify-center shadow-md "  >
                            <button className="btn btn-success" style={{ marginTop: '20px' }} >Success</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};