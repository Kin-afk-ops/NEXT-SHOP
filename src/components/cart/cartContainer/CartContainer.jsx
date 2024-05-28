"use client";

import { useEffect, useState } from "react";
import CartContent from "./cartContent/CartContent";
import CartPay from "./cartPay/CartPay";
import axiosInstance from "@/config";
import axios from "axios";

const CartContainer = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

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

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, [loading, userId]);

  return (
    <div>
      {cart.length !== 0 ? (
        <CartContent
          cart={cart}
          setTotalPrice={setTotalPrice}
          payMode={false}
          setLoading={setLoading}
        />
      ) : (
        <div className="main__container">
          {" "}
          <p className="main__title display__flex--center">
            Không có sản phẩm trong giỏ hàng.
          </p>
        </div>
      )}

      {totalPrice !== 0 && <CartPay totalPrice={totalPrice} userId={userId} />}
    </div>
  );
};

export default CartContainer;
