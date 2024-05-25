"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config";
import { toast } from "react-toastify";
import "./page.css";
import "./responsive.css";

import { logout } from "../../../lib/features/user/userSlice";

const CustomerContentAccount = () => {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const [phone, setPhone] = useState(user?.phone);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordType, setPasswordType] = useState(true);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState(true);

  const [modal, setModal] = useState(false);

  const validateEmpty = () => {
    return phone === "" ||
      password === "" ||
      newPassword === "" ||
      confirmNewPassword === ""
      ? false
      : true;
  };

  const checkConfirmPassword = () => {
    return newPassword !== confirmNewPassword ? false : true;
  };

  const checkPassword = () => {
    return password === newPassword && password === confirmNewPassword
      ? false
      : true;
  };

  const handleModal = (e) => {
    e.preventDefault();
    setModal(true);
  };
  const handleSubmit = async () => {
    if (!validateEmpty()) {
      toast.error("Có trường rỗng! Hãy kiểm tra lại");
      console.log("haha");
    } else if (!checkConfirmPassword()) {
      toast.error("Nhập lại mật khẩu mới không trùng khớp");
    } else if (!checkPassword()) {
      toast.error("Không được nhập lại mật khẩu cũ!");
    } else {
      const userForm = {
        newUser: {
          phone,
          password: newPassword,
        },
        password: password,
      };
      const res = await axiosInstance.put(`/user/${user._id}`, userForm);
      try {
        toast.success("Chỉnh sửa tài khoản thành công! Hãy đăng nhập lại");
        setModal(false);
        dispatch(logout());
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="customer__account main__container">
      <form onSubmit={handleModal}>
        <label>Số điện thoại</label>
        <input
          className="customer__account--input"
          value={phone}
          type="text"
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* <p className="error__message" v-if="!isSubmit">{{ emailMessage }}</p> */}

        <label>Mật khẩu hiện tại</label>
        {/* <div className="password__block" :className="{ error__block: !isSubmit }"> */}
        <div className="password__block">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordType ? "password" : "text"}
          />
          <i
            className="fa-solid fa-eye"
            onClick={() => setPasswordType(!passwordType)}
          ></i>
        </div>

        {/* <p className="error__message" v-if="!isSubmit">{{ passwordMessage }}</p> */}

        <label>Mật khẩu mới</label>
        <div className="password__block">
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={newPasswordType ? "password" : "text"}
          />
          <i
            className="fa-solid fa-eye"
            onClick={() => setNewPasswordType(!newPasswordType)}
          ></i>
        </div>
        {/* <p className="error__message" v-if="!isSubmit">
        {{ confirmPasswordMessage }}
      </p> */}

        <label>Nhập lại mật khẩu mới</label>
        <div className="password__block">
          <input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            type={confirmNewPasswordType ? "password" : "text"}
          />
          <i
            className="fa-solid fa-eye"
            onClick={() => setConfirmNewPasswordType(!confirmNewPasswordType)}
          ></i>
        </div>

        <button type="submit" className="customer__account--btn">
          Lưu thay đổi
        </button>
      </form>

      <div className={modal ? "customer__modal" : "hidden"}>
        <div className="customer__modal--title">
          Bạn có muốn thay đổi tài khoản?
        </div>
        <div className="customer__modal--content">
          <button
            className="customer__modal--hide"
            onClick={() => setModal(false)}
          >
            Huỷ
          </button>
          <button className="customer__modal--agree" onClick={handleSubmit}>
            Thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentAccount;
