import React, { useContext } from 'react'
import { OrderContext } from '../contexts/OrderContext'

export const CartItem = (props) => {
    const {id, image, name, description, crustType, size, price} = props.data
    const {itemCart, addToCart, removeFromCart, totalAmount, updateCart} = useContext(OrderContext)

    return (
        <li className='mt-3'>
            <div className="flex w-72 h-20 bg-white rounded-sm shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 border relative">
                <div className="flex-col items-center">
                    <figure className="w-28 h-20">
                        <img src={image} alt="" className="rounded-sm" />
                    </figure>
                </div>
                <div className="flex-col justify-center items-center h-full w-full">
                    <p style={{ whiteSpace: 'nowrap', fontSize: '0.9rem', fontWeight: 'bold', color: '#333', marginTop: '10px' }}>{name}</p>
                    <div className="flex justify-center items-center w-full" style={{ marginTop: '0.5rem' }}>
                        <div className="flex items-center justify-center">
                            <button className="btn-secondary w-5 hover:bg-orange-700 text-black font-bold py-1 px-2 rounded" onClick={() => { addToCart(id) }}>+</button>
                            <input className="w-5 text-center text-red-500" type="text" value={itemCart[id]} onChange={(e) => { updateCart(Number(e.target.value)) }} />
                            <button className="btn-secondary w-5 hover:bg-orange-700 text-black font-bold py-1 px-2 rounded" onClick={() => { removeFromCart(id) }}>-</button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-full w-full" style={{ fontSize: '0.8rem', marginTop: '-40px', marginLeft: '-75px' }}>
                        <div className="px-2 py-1 rounded text-red-500" style={{ fontWeight: 'bold' }}>{price}฿</div>


                    </div>
                </div>
            </div>
        </li>
    )
}
