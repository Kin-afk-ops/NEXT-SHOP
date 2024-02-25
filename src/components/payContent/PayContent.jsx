"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import momoLogo from "../../assets/images/momo__logo.png";

import vnpagLogo from "../../assets/images/vnpay__logo.png";
import CartContent from "../cart/cartContainer/cartContent/CartContent";
import { useDispatch } from "react-redux";
import { getNoti, getCart } from "@/lib/apiCall";
import { useSelector } from "react-redux";

import axiosInstance from "@/config";
import VND from "@/vnd";
import { toast } from "react-toastify";
import axios from "axios";
import "./payContent.css";

const PayContent = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [payMethod, setPayMethod] = useState("nhận hàng");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [clientName, setClientName] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${userId}`);

        setName(res?.data.lastName + " " + res?.data.firstName);
        setClientName(res?.data.lastName + " " + res?.data.firstName);
        setPhone(user.phone);
        setAddress(res.data.address.address);
        setProvince(res.data.address.province);
        setDistrict(res.data.address.district);
        setWard(res.data.address.ward);

        console.log(res.data.address);
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

    const getAddress = async () => {
      try {
        const res = await axios.get("https://vapi.vnappmob.com/api/province/");
        setProvinces(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
    getInfoUser();
    getAddress();
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
            address: {
              province,
              district,
              ward,
              address,
            },
            note,
          };

          const res = await axiosInstance.post(
            `/order/create/${user._id}`,
            newOrder
          );
          // await axiosInstance.delete(`/cart/${cartId}`);
        } catch (error) {
          toast.error("Đặt hàng thất bại");

          console.log(error);
        }
      }
      toast.success("Đặt hàng thành công");

      try {
        const newNotification = {
          userId: user._id,
        };

        await axiosInstance.post(
          `/order/noti/createNotification`,
          newNotification
        );
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        getNoti(dispatch, user?._id);
        getCart(dispatch, user?._id);
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProvinces = async (value) => {
    setProvince(value.split("_")[0]);
    setProvinceId(value.split("_")[1]);

    const id = value.split("_")[1];

    try {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${id}`
      );

      setDistricts(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDistricts = async (value) => {
    setDistrict(value.split("_")[0]);
    setDistrictId(value.split("_")[1]);

    const id = value.split("_")[1];
    try {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${id}`
      );

      setWards(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeWards = async (value) => {
    setWard(value.split("_")[0]);
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

        <div className="pay__address--wrap">
          <div className="pay__address">
            <input type="radio" name="pay__address" value="default" />
            <div className="pay__address--title">Mặt định</div>
            <div className="pay__address--content">
              {address + ", " + ward + ", " + ", " + district + ", " + province}
            </div>
          </div>

          <div className="pay__address">
            <input type="radio" name="pay__address" value="other" />
          </div>
        </div>

        <select
          className="pay__select--address"
          name="provinces"
          id="provinces"
          onChange={(e) => handleChangeProvinces(e.target.value)}
        >
          <option>--Thành phố/Tỉnh--</option>
          {provinces?.map((p) => (
            <option
              key={p.province_id}
              value={p.province_name + "_" + p.province_id}
            >
              {p.province_name}
            </option>
          ))}
        </select>

        <select
          className="pay__select--address"
          name="district"
          id="district"
          onChange={(e) => handleChangeDistricts(e.target.value)}
        >
          <option>--Quận/Huyện--</option>
          {districts?.map((d) => (
            <option
              key={d.district_id}
              value={d.district_name + "_" + d.district_id}
            >
              {d.district_name}
            </option>
          ))}
        </select>

        <select
          className="pay__select--address"
          name="ward"
          id="ward"
          onChange={(e) => handleChangeWards(e.target.value)}
        >
          <option>--Xã/Phường/Thị trấn--</option>
          {wards?.map((w) => (
            <option key={w.ward_id} value={w.ward_name + "_" + w.ward_id}>
              {w.ward_name}
            </option>
          ))}
        </select>

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
