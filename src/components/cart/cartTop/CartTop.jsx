"use client";

import { useEffect, useState } from "react";
import "./cartTop.css";
import axiosInstance from "@/config";

const CartTop = ({ userId }) => {
  const [cart, setCart] = useState({});

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
    <div className="main__container cart__top">
      <h1 className="main__title cart__top--title">
        <i className="fa-solid fa-cart-shopping"></i>

        {cart ? (
          <p>Giỏ hàng ({cart.length} sản phẩm)</p>
        ) : (
          <p>Giỏ hàng (0 sản phẩm)</p>
        )}
      </h1>
    </div>
  );
};

export default CartTop;
