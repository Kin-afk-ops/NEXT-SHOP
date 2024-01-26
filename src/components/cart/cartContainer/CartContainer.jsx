"use client";

import { useEffect, useState } from "react";
import CartContent from "./cartContent/CartContent";
import CartPay from "./cartPay/CartPay";
import axiosInstance from "@/config";

const CartContainer = ({ userId }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axiosInstance.get(`/cart/find/${userId}`);
        setCart(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, []);

  return (
    <div>
      <CartContent cart={cart} />
      <CartPay />
    </div>
  );
};

export default CartContainer;
