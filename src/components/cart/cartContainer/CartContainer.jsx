"use client";

import { useEffect, useState } from "react";
import CartContent from "./cartContent/CartContent";
import CartPay from "./cartPay/CartPay";
import axiosInstance from "@/config";
import axios from "axios";

const CartContainer = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axiosInstance.get(`/cart/find/${userId}`);
        const resCheck = await axiosInstance.get(`/cart/find/check/${userId}`);

        setCart(res.data);
        let sum = 0;

        if (resCheck.data) {
          resCheck.data.forEach((d) => {
            sum += d.books.discountPrice * d.books.quantity;
          });
        }

        setTotalPrice(sum);

        // const temp = await axios.get(`https://vapi.vnappmob.com/api/province/`);

        // console.log(temp.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, []);

  return (
    <div>
      <CartContent cart={cart} setTotalPrice={setTotalPrice} payMode={false} />
      <CartPay totalPrice={totalPrice} userId={userId} />
    </div>
  );
};

export default CartContainer;
