import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const OrderContext = createContext(null)
export const OrderContextProvider = (props) => {
    const [pizzas, setPizzas] = useState([]);
    const [itemCart, setItemCart] = useState([])
    const [totalItemsInCart, setTotalItemsInCart] = useState(0);
    // "จำนวนเริ่มแรกของตระกร้า  ทุกไอเท็มมีค่าเท่ากับ 0"
const defaultCart = () => {
    let cart = {}
    for (let i = 1; i <  pizzaItem.length + 1; i++) {
        cart[i] = 0;
    }
    return cart;
  }
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
      // คำนวณจำนวนรวมของสินค้าทั้งหมดในตะกร้าเมื่อมีการเปลี่ยนแปลงใน itemCart
      let totalItems = 0;
      for (const item in itemCart) {
          totalItems += itemCart[item];
      }
      setTotalItemsInCart(totalItems);
  }, [itemCart]);
    
useEffect(() => {
  const getdefaultCart = defaultCart();
  setItemCart(getdefaultCart);
},[pizzas]);
const pizzaItem = pizzas.map(pizza => ({
  id: pizza.id,
  image: pizza.image,name: pizza.name,description: pizza.description,crustType: pizza.crustType,size: pizza.size,price: pizza.price
})) 

  
    const addToCart = (itemId) => {
        setItemCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    const removeFromCart = (itemId) => {
        setItemCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }
    const totalAmount = () => {
        let amount = 0;
        for (const item in itemCart) {
            if (itemCart[item]>0) {
                let itemInfo = pizzaItem.find((pizza) => pizza.id === Number(item))
                amount += itemCart[item] * itemInfo.price
            }
        }
        return amount
    }
    const updateCart = (itemId, newAmount) => {
        setItemCart((prev) => ({ ...prev, [itemId]: newAmount }))
    }
    console.log(itemCart)
    const contextValue = { itemCart, addToCart, removeFromCart, totalAmount, totalItemsInCart }; // เพิ่ม totalItemsInCart เข้าไปใน contextValue
    return <OrderContext.Provider value={contextValue}>{props.children}</OrderContext.Provider>;

    
}
