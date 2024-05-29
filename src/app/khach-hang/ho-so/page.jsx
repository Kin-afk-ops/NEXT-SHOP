"use client";

import Image from "next/image";
import avatarDefault from "../../../assets/images/default_avatar.png";
import "./page.css";
import "./responsive.css";
import { useEffect, useState } from "react";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import emailValidate from "../../../validation/email";

const CustomerContentEdit = () => {
  const user = useSelector((state) => state.user.currentUser);
  const userId = user ? user._id : "";
  const [file, setFile] = useState(null);

  const [avatar, setAvatar] = useState({});
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [checkFile, setCheckFile] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [buttonError, setButtonError] = useState(false);

  let imageData = {};

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${userId}`);
        setAvatar(res.data.avatar);
        setLastName(res.data.lastName);
        setFirstName(res.data.firstName);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setBirthday(res.data.birthday);
        setAddress(res.data.address.address);
        setProvince(res.data.address.province);
        setDistrict(res.data.address.district);
        setWard(res.data.address.ward);

        if (res.data.avatar.path !== "" && res.data.avatar.publicId !== "") {
          setCheckFile(true);
        }
      } catch (error) {
        console.log(error);
        setAddMode(true);
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

    if (userId !== "") {
      getInfoUser();
      getAddress();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (avatar.path === "" && avatar.publicId === "" && file) {
      const uploadData = new FormData();
      uploadData.append("file", file, "file");

      const resImg = await axiosInstance.post("/image/upload", uploadData);

      imageData = {
        path: await resImg.data.file.path,
        publicId: await resImg.data.file.filename,
      };
    } else if (avatar.path !== "" && avatar.publicId !== "" && file) {
      await axiosInstance.delete(`/image/remove/${avatar?.publicId}`);

      const uploadData = new FormData();
      uploadData.append("file", file, "file");

      const resImg = await axiosInstance.post("/image/upload", uploadData);

      imageData = {
        path: await resImg.data.file.path,
        publicId: await resImg.data.file.filename,
      };
    } else {
      imageData = {
        path: await avatar?.path,
        publicId: await avatar?.publicId,
      };
    }

    const newInfoUser = {
      lastName,
      firstName,
      avatar: imageData,
      email,
      gender,
      birthday,
      address: {
        province,
        district,
        ward,
        address,
      },
    };

    if (
      lastName !== "" &&
      firstName !== "" &&
      birthday !== "" &&
      address !== ""
    ) {
      try {
        const res = await axiosInstance.put(`/infoUser/${userId}`, newInfoUser);
        toast.success("Chỉnh sửa thông tin thành công!");
      } catch (error) {
        console.log(error);
        toast.error("Chỉnh sửa thông tin thất bại!");
      }
    } else {
      toast.error("Chưa thể thay đổi thông tin!");
    }
  };

  const handleChangeProvinces = async (value) => {
    if (value !== "--Thành phố/Tỉnh--") {
      setProvince(value.split("_")[0]);
      setProvinceId(value.split("_")[1]);
      setAddressError(false);

      const id = value.split("_")[1];

      try {
        const res = await axios.get(
          `https://vapi.vnappmob.com/api/province/district/${id}`
        );

        setDistricts(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeDistricts = async (value) => {
    if (value !== "--Quận/Huyện--") {
      setDistrict(value.split("_")[0]);
      setDistrictId(value.split("_")[1]);

      const id = value.split("_")[1];
      setAddressError(false);

      try {
        const res = await axios.get(
          `https://vapi.vnappmob.com/api/province/ward/${id}`
        );

        setWards(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeWards = async (value) => {
    if (value !== "--Xã/Phường/Thị trấn--") {
      setWard(value.split("_")[0]);
      setAddressError(false);
    }
  };

  const handleBlurAddress = () => {
    if (address === "" || ward === "" || district === "" || province === "") {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  };

  return (
    <div className="customer__edit  main__container">
      <form onSubmit={handleSubmit} className="row no-gutters">
        <div className="customer__edit--center c-12">
          <label htmlFor="infoUserFile" className="customer__edit--file">
            {checkFile ? (
              <Image
                src={file ? URL.createObjectURL(file) : avatar?.path}
                alt="avatar"
                width={225}
                height={225}
                style={{
                  objectFit: "contain",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
            ) : (
              <Image
                src={avatarDefault}
                alt="avatar"
                width={225}
                height={225}
                style={{
                  objectFit: "contain",
                }}
              />
            )}

            <i className="fa-solid fa-arrows-rotate"></i>
          </label>

          <input
            id="infoUserFile"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setCheckFile(true);
            }}
            style={{
              display: "none",
            }}
          />
        </div>

        <div className="c-6 s-12 customer__edit--left">
          <label>Họ</label>
          <input
            className={
              lastNameError
                ? "customer__edit--input customer__edit--error"
                : "customer__edit--input"
            }
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => {
              if (lastName === "") {
                setLastNameError(true);
              } else {
                setLastNameError(false);
              }
            }}
            onFocus={() => setLastNameError(false)}
          />
          {lastNameError && (
            <p style={{ color: "red" }}>Họ không được bỏ trống</p>
          )}

          <label>Tên</label>
          <input
            className={
              firstNameError
                ? "customer__edit--input customer__edit--error"
                : "customer__edit--input"
            }
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => {
              if (firstName === "") {
                setFirstNameError(true);
              } else {
                setFirstNameError(false);
              }
            }}
            onFocus={() => setFirstNameError(false)}
          />
          {firstNameError && (
            <p style={{ color: "red" }}>Tên không được bỏ trống</p>
          )}

          <label>Email</label>
          <input
            className={
              emailError
                ? "customer__edit--input customer__edit--error"
                : "customer__edit--input"
            }
            type="text"
            value={email}
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
            onFocus={() => setEmailError(false)}
            onBlur={(e) => {
              if (emailValidate(e.target.value) || e.target.value === "") {
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
          />

          {emailError && <p style={{ color: "red" }}>Email không hợp lệ</p>}

          <label>Giới tính</label>
          <div className="customer__edit--right-gender">
            <input
              type="radio"
              name="gender"
              value="Nam"
              onChange={() => setGender("Nam")}
            />

            <label>Nam</label>
            <input
              type="radio"
              name="gender"
              value="Nữ"
              onChange={() => setGender("Nữ")}
            />
            <label>Nữ</label>
          </div>
        </div>
        <div className="c-6 s-12 customer__edit--right">
          <label>Ngày sinh</label>
          <input
            className="customer__edit--input"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <label>Địa chỉ</label>

          <select
            className={
              addressError
                ? "customer__edit--select customer__edit--error"
                : "customer__edit--select"
            }
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
            className={
              addressError
                ? "customer__edit--select customer__edit--error"
                : "customer__edit--select"
            }
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
            className={
              addressError
                ? "customer__edit--select customer__edit--error"
                : "customer__edit--select"
            }
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
            className={
              addressError
                ? "customer__edit--input customer__edit--error"
                : "customer__edit--input"
            }
            type="text"
            placeholder="Số nhà, tên đường"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={handleBlurAddress}
            onFocus={() => setAddressError(false)}
          />

          {addressError && (
            <p style={{ color: "red" }}>Hãy nhập một địa chỉ cụ thể!</p>
          )}

          {/* <input
            className="customer__edit--input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /> */}

          <button className="customer__edit--button" type="submit">
            Lưu thay đổi
          </button>
        </div>
      </form>

      <div className="customer__modal hidden">
        <div className="customer__modal--title">
          Bạn có muốn thay đổi hồ sơ?
        </div>
        <div className="customer__modal--content">
          <button className="customer__modal--hide">Huỷ</button>
          <button className="customer__modal--agree">Thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentEdit;
