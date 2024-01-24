"use client";

import Image from "next/image";
import avatarDefault from "../../../assets/images/default_avatar.png";
import "./page.css";
import { useEffect, useState } from "react";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CustomerContentEdit = () => {
  const user = useSelector((state) => state.user.currentUser);

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
  let imageData = {};

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${user._id}`);
        setAvatar(res.data.avatar);
        setLastName(res.data.lastName);
        setFirstName(res.data.firstName);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setBirthday(res.data.birthday);
        setAddress(res.data.address);

        if (res.data.avatar.path !== "" && res.data.avatar.publicId !== "") {
          setCheckFile(true);
        }
      } catch (error) {
        console.log(error);
        setAddMode(true);
      }
    };

    getInfoUser();
  }, []);

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
      address,
    };

    try {
      const res = await axiosInstance.put(`/infoUser/${user._id}`, newInfoUser);
      toast.success("Chỉnh sửa thông tin thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Chỉnh sửa thông tin thất bại!");
    }
  };

  return (
    <div className="customer__edit  main__container">
      <form onSubmit={handleSubmit}>
        <div className="customer__edit--left">
          <label htmlFor="infoUserFile" className="customer__edit--file">
            {checkFile ? (
              <Image
                src={file ? URL.createObjectURL(file) : avatar?.path}
                alt="avatar"
                width={225}
                height={225}
                style={{
                  objectFit: "contain",
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
        <div className="customer__edit--right">
          <label>Họ</label>
          <input
            className="customer__edit--input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label>Tên</label>
          <input
            className="customer__edit--input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Email</label>
          <input
            className="customer__edit--input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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

          <label>Ngày sinh</label>
          <input
            className="customer__edit--input"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <label>Địa chỉ</label>
          <input
            className="customer__edit--input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

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
