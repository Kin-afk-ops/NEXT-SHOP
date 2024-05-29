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
import "./responsive.css";
import LoadingPage from "../loading/Loading";

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
  const [otherProvince, setOtherProvince] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [otherDistrict, setOtherDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");
  const [otherWard, setOtherWard] = useState("");

  const [otherAddressMode, setOtherAddressMode] = useState(false);
  const [otherAddress, setOtherAddress] = useState("");
  const [otherAddressError, setOtherAddressError] = useState(false);
  const [clientNameError, setClientNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${userId}`);

        if (res?.data.lastName !== "" && res?.data.firstName !== "") {
          setName(res?.data.lastName + " " + res?.data.firstName);
          setClientName(res?.data.lastName + " " + res?.data.firstName);
        } else {
          setClientName("");
        }

        setPhone(user?.phone);
        setAddress(res.data.address.address);
        setProvince(res.data.address.province);
        setDistrict(res.data.address.district);
        setWard(res.data.address.ward);

        res.data.address.address === "" && setOtherAddressMode(true);
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
    setLoading(true);
    getCart();
    getInfoUser();
    getAddress();
    setLoading(false);
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (clientName === "" || otherAddressError || phone === "") {
      toast.error("Đặt hàng không thành công! Hãy xem lại");

      console.log("Haha");
    } else if (otherAddressMode) {
      if (
        otherAddress === "" ||
        otherWard === "" ||
        otherDistrict === "" ||
        otherProvince === ""
      )
        toast.error("Hãy điền đầy đủ địa chỉ");

      console.log("Haha");
    } else {
      try {
        for (let i = 0; i < cart.length; i++) {
          try {
            await axiosInstance.delete(`/cart/${cart[i]._id}`);
            let newOrder = {};
            if (!otherAddressMode) {
              newOrder = {
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
            } else {
              newOrder = {
                name: name,
                clientName: clientName,
                books: cart[i].books,
                phone,
                totalPrice,
                address: {
                  province: otherProvince,
                  district: otherDistrict,
                  ward: otherWard,
                  address: otherAddress,
                },
                note,
              };
            }
            const res = await axiosInstance.post(
              `/order/create/${user._id}`,
              newOrder
            );
            // await axiosInstance.delete(`/cart/${cartId}`);
          } catch (error) {
            toast.error("Đặt hàng thất bại");
            console.log(error);
            setLoading(false);
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
          setLoading(false);
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
    }
  };

  const handleChangeProvinces = async (value) => {
    setOtherProvince(value.split("_")[0]);
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
    setOtherDistrict(value.split("_")[0]);
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
    setOtherWard(value.split("_")[0]);
  };

  const handleChangeOtherAddress = (e) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      setOtherAddressMode(true);
    } else {
      setOtherAddressMode(false);
    }
  };

  return (
    <>
      {loading && <LoadingPage />}
      <form className="pay__form" onSubmit={handleSubmit}>
        <div className="pay__form--wrap l-6 m-12 s-12">
          <label className="pay__form--label" htmlFor="">
            Họ và tên người nhận hàng
          </label>
          <input
            className={clientNameError ? "pay__input pay__error" : "pay__input"}
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") {
                setClientNameError(true);
              } else {
                setClientNameError(false);
              }
            }}
            onFocus={() => setClientNameError(false)}
          />

          {clientNameError && (
            <p style={{ color: "red" }}>Hãy nhập tên người nhận hàng</p>
          )}

          <label className="pay__form--label" htmlFor="">
            Số điện thoại
          </label>
          <input
            className={phoneError ? "pay__input pay__error" : "pay__input"}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") {
                setPhoneError(true);
              } else {
                setPhoneError(false);
              }
            }}
            onFocus={() => setPhoneError(false)}
          />

          {phoneError && <p style={{ color: "red" }}>Hãy nhập số điện thoại</p>}

          <label className="pay__form--label" htmlFor="">
            Địa chỉ giao hàng
          </label>

          <div className="pay__address--wrap">
            {address !== "" && (
              <div className="pay__address">
                <input
                  type="radio"
                  name="pay__address"
                  id="pay__address--default"
                  value="default"
                  onChange={() => setOtherAddressMode(false)}
                  defaultChecked
                />
                <label htmlFor="pay__address--default">
                  <div className="pay__address--title">Mặt định</div>

                  <div className="pay__address--content">
                    {address && <span>{address + ", "}</span>}
                    {ward && <span>{ward + ", "}</span>}
                    {district && <span>{district + ", "}</span>}
                    {province && <span>{province + "."}</span>}
                  </div>
                </label>
              </div>
            )}

            <div className="pay__address">
              {address !== "" && (
                <input
                  type="radio"
                  name="pay__address"
                  id="pay__address--other"
                  value="other"
                  onChange={(e) => handleChangeOtherAddress(e)}
                />
              )}

              <label htmlFor="pay__address--other">
                {address !== "" && (
                  <div className="pay__address--title">Khác</div>
                )}

                {otherAddressMode ? (
                  <div className="pay__address--content">
                    {otherAddress && <span>{otherAddress + ", "}</span>}
                    {otherWard && <span>{otherWard + ", "}</span>}
                    {otherDistrict && <span>{otherDistrict + ", "}</span>}
                    {otherProvince && <span>{otherProvince + "."}</span>}
                  </div>
                ) : (
                  <div className="pay__address--content">...</div>
                )}
              </label>
            </div>
          </div>

          {otherAddressMode && (
            <>
              <select
                className={
                  otherAddressError
                    ? "pay__select--address pay__error"
                    : "pay__select--address"
                }
                name="provinces"
                id="provinces"
                onChange={(e) => handleChangeProvinces(e.target.value)}
                onFocus={() => setOtherAddressError(false)}
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
                className={
                  otherAddressError
                    ? "pay__select--address pay__error"
                    : "pay__select--address"
                }
                name="district"
                id="district"
                onChange={(e) => handleChangeDistricts(e.target.value)}
                onFocus={() => setOtherAddressError(false)}
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
                className={
                  otherAddressError
                    ? "pay__select--address pay__error"
                    : "pay__select--address"
                }
                name="ward"
                id="ward"
                onChange={(e) => handleChangeWards(e.target.value)}
                onFocus={() => setOtherAddressError(false)}
              >
                <option>--Xã/Phường/Thị trấn--</option>
                {wards?.map((w) => (
                  <option key={w.ward_id} value={w.ward_name + "_" + w.ward_id}>
                    {w.ward_name}
                  </option>
                ))}
              </select>

              <input
                className={
                  otherAddressError ? "pay__input pay__error" : "pay__input"
                }
                type="text"
                value={otherAddress}
                placeholder="Số nhà, tên đường"
                onChange={(e) => setOtherAddress(e.target.value)}
                onBlur={(e) => {
                  if (
                    e.target.value === "" ||
                    otherWard === "" ||
                    otherDistrict === "" ||
                    otherProvince === ""
                  ) {
                    setOtherAddressError(true);
                  } else {
                    setOtherAddressError(false);
                  }
                }}
                onFocus={() => setOtherAddressError(false)}
              />
            </>
          )}

          {otherAddressError && (
            <p style={{ color: "red" }}>Hãy nhập một địa chỉ hợp lệ</p>
          )}

          <label className="pay__form--label" htmlFor="">
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
    </>
  );
};

export default PayContent;
