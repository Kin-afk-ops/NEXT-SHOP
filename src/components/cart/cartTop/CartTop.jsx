"use client";

import { useEffect, useState } from "react";
import "./cartTop.css";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";

const CartTop = () => {
  const cartLength = useSelector((state) => state.cartLength.length);

  return (
    <div className="main__container cart__top">
      <h1 className="main__title cart__top--title">
        <i className="fa-solid fa-cart-shopping"></i>

        <p>Giỏ hàng ({cartLength} sản phẩm)</p>
      </h1>
    </div>
  );
};

export default CartTop;
