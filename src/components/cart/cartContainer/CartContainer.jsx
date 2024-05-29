"use client";

import { useEffect, useState } from "react";
import CartContent from "./cartContent/CartContent";
import CartPay from "./cartPay/CartPay";
import axiosInstance from "@/config";

import LoadingItem from "@/components/loading/LoadingItem";

const CartContainer = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      setLoadingItem(true);
      try {
        const res = await axiosInstance.get(`/cart/find/${userId}`);
        const resCheck = await axiosInstance.get(`/cart/find/check/${userId}`);
        setLoadingItem(false);
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
        setLoadingItem(false);
      }
    };

    getCart();
  }, [userId, loading]);

  return (
    <>
      {loadingItem ? (
        <LoadingItem />
      ) : (
        <div>
          {cart.length !== 0 ? (
            <CartContent
              cart={cart}
              setTotalPrice={setTotalPrice}
              payMode={false}
              setLoading={setLoading}
              loading={loading}
            />
          ) : (
            <div className="main__container">
              {" "}
              <p className="main__title display__flex--center">
                Không có sản phẩm trong giỏ hàng.
              </p>
            </div>
          )}

          {totalPrice !== 0 && (
            <CartPay totalPrice={totalPrice} userId={userId} />
          )}
        </div>
      )}
    </>
  );
};

export default CartContainer;
