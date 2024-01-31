"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import momoLogo from "../../assets/images/momo__logo.png";

import vnpagLogo from "../../assets/images/vnpay__logo.png";
import CartContent from "../cart/cartContainer/cartContent/CartContent";
import { useSelector } from "react-redux";

import axiosInstance from "@/config";
import VND from "@/vnd";
import { toast } from "react-toastify";

const PayContent = ({ userId }) => {
  const router = useRouter();

  const [payMethod, setPayMethod] = useState("nhận hàng");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [clientName, setClientName] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${userId}`);

        setName(res?.data.lastName + " " + res?.data.firstName);
        setClientName(res?.data.lastName + " " + res?.data.firstName);
        setPhone(user.phone);
        setAddress(res.data.address);
      } catch (error) {
        console.log(error);
      }
    };

    const getCart = async () => {
      try {
        const res = await axiosInstance.get(`/cart/find/check/${userId}`);

        setCart(res.data);

        let sum = 0;
        res.data.forEach((d) => {
          sum += d.books.discountPrice * d.books.quantity;
        });

        setTotalPrice(sum);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
    getInfoUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let i = 0; i < cart.length; i++) {
        try {
          await axiosInstance.delete(`/cart/${cart[i]._id}`);
          const newOrder = {
            name: name,
            clientName: clientName,
            books: cart[i].books,
            phone,
            totalPrice,
            address,
            note,
          };

          const res = await axiosInstance.post(`/order/${user._id}`, newOrder);
          // await axiosInstance.delete(`/cart/${cartId}`);
        } catch (error) {
          toast.error("Đặt hàng thất bại");

          console.log(error);
        }
      }
      toast.success("Đặt hàng thành công");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
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
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
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

      <h3 className="main__title">Xem lại giỏ hàng:</h3>

      <CartContent cart={cart} payMode={true} />

      <div className="pay__total--money">
        Tổng giá tiền:
        <span>{VND.format(totalPrice)}</span>
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
            Đặt hàng
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
            Đặt hàng
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
            Đặt hàng
          </button>
        )}
      </div>
    </form>
  );
};

export default PayContent;
