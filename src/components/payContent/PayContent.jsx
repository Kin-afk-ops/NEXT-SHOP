"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import momoLogo from "../../assets/images/momo__logo.png";

import vnpagLogo from "../../assets/images/vnpay__logo.png";
import CartContent from "../cart/cartContainer/cartContent/CartContent";
import { useSelector } from "react-redux";

import axiosInstance from "@/config";

const PayContent = () => {
  const params = useParams();
  const cartId = params.cartId;

  const [payMethod, setPayMethod] = useState("nhận hàng");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [infoUser, setInfoUser] = useState({});
  const [cart, setCart] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${user._id}`);

        setInfoUser(res.data);

        setName(res.data.lastName + " " + res.data.firstName);
        setPhone(user.phone);
        setAddress(res.data.address);
      } catch (error) {
        console.log(error);
      }
    };

    const getCart = async () => {
      try {
        const res = await axiosInstance.get(`/cart/find/oneCart/${cartId}`);
        console.log(res.data);
        setCart(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
    getInfoUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createTotalPrice = () => {
      let sum = 0;
      cart.books.forEach((book) => {
        sum += book.price;
      });
      return sum;
    };

    const newOrder = {
      name: infoUser?.lastName + " " + infoUser?.firstName,
      clientName: name,
      books: cart?.books,
      phone,
      totalPrice: createTotalPrice(),
      address,
      note,
    };

    try {
      const res = await axiosInstance.post(`/order/${user._id}`, newOrder);
      await axiosInstance.delete(`/cart/${cartId}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="pay__form" onSubmit={handleSubmit}>
      <div className="pay__form--wrap c-6">
        <label className="pay__form--label" for="">
          Họ và tên người nhận
        </label>
        <input
          className="pay__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="pay__form--label" for="">
          Số điện thoại
        </label>
        <input
          className="pay__input"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="pay__form--label" for="">
          Địa chỉ giao hàng
        </label>
        <input
          className="pay__input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="pay__form--label" for="">
          Ghi chú
        </label>
        <input
          className="pay__input"
          type="text "
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <h3 className="main__title">Xem lại giỏ hàng</h3>

      <CartContent />

      <div className="pay__total--money">
        Tổng giá tiền:
        {/* <span>{{ makeMoney }} đ</span> */}
      </div>

      <div className="pay__chose--method">
        <label htmlFor="payMethod">Chọn phương thức thanh toán:</label>

        <select
          name="payMethod"
          id="payMethod"
          onChange={(e) => setPayMethod(e.target.value)}
          className="pay__select"
        >
          <option value="nhận hàng">Thanh toán khi nhận hàng</option>
          <option value="MOMO">Thanh toán qua ví MOMO</option>
          <option value="VNPAY">Thanh toán qua ví VNPAY</option>
        </select>
      </div>

      <div className="pay__method">
        {payMethod === "nhận hàng" && (
          <button className="main__btn pay__btn pay__default" type="submit">
            <i className="fa-solid fa-hand-holding-dollar"></i>
            Mua hàng
          </button>
        )}

        {payMethod === "MOMO" && (
          <button className="main__btn pay__btn pay__momo" type="submit">
            <Image
              src={momoLogo}
              alt="momo logo"
              width={25}
              height={25}
              style={{
                marginRight: "5px",
              }}
            />
            Mua hàng
          </button>
        )}

        {payMethod === "VNPAY" && (
          <button className="main__btn pay__btn pay__vnpay" type="submit">
            <Image
              src={vnpagLogo}
              alt="momo logo"
              width={25}
              height={25}
              style={{
                marginRight: "5px",
              }}
            />
            Mua hàng
          </button>
        )}
      </div>
    </form>
  );
};

export default PayContent;
