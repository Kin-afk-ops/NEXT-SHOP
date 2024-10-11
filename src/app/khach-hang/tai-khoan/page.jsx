"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "@/config";
import { toast } from "react-toastify";
import "./page.css";
import "./responsive.css";

import { logout } from "../../../lib/features/user/userSlice";
import LoadingPage from "@/components/loading/Loading";
import { logoutCart } from "@/lib/features/cart/cartLengthSlice";
import { logoutNoti } from "@/lib/features/notification/notiSlice";
import phoneValidator from "@/validation/phone";
import passwordValidator, {
  passwordConfirmValidator,
} from "@/validation/password";

const CustomerContentAccount = () => {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [conFirmNewPasswordErrorMessage, setConfirmNewPasswordErrorMessage] =
    useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  const [passwordType, setPasswordType] = useState(true);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState(true);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setPhone(user.phone);
    } else {
      setPhone("");
    }
  }, [user]);

  const checkEmpty = (content) => {
    return content === "" ? true : false;
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
    phoneValidator(phone, setPhoneError, setPhoneErrorMessage);
    passwordValidator(password, setPasswordError, setPasswordErrorMessage);
    passwordValidator(
      newPassword,
      setNewPasswordError,
      setNewPasswordErrorMessage
    );
    passwordValidator(
      confirmNewPassword,
      setConfirmNewPasswordError,
      setConfirmNewPasswordErrorMessage
    );
    passwordConfirmValidator(
      newPassword,
      confirmNewPassword,
      setConfirmNewPasswordError,
      setConfirmNewPasswordErrorMessage
    );

    if (
      !phoneError &&
      !passwordError &&
      !newPasswordError &&
      !confirmNewPasswordError &&
      !checkEmpty(phone) &&
      !checkEmpty(password) &&
      !checkEmpty(newPassword) &&
      !checkEmpty(confirmNewPassword)
    ) {
      setLoading(true);
      if (!checkPassword()) {
        toast.error("Không được nhập lại mật khẩu cũ!");
        setLoading(false);
      } else {
        try {
          const userForm = {
            newUser: {
              phone,
              password: newPassword,
            },
            password: password,
          };
          const res = await axiosInstance.put(`/user/${user._id}`, userForm);
          setLoading(false);
          toast.success("Chỉnh sửa tài khoản thành công! Hãy đăng nhập lại");
          setModal(false);
          dispatch(logout());

          dispatch(logoutCart());
          dispatch(logoutNoti());
          setLoading(false);
          window.location.href = "/";
        } catch (error) {
          toast.error("Chỉnh sửa tài khoản thất bại! Hãy kiểm tra lại");
          setLoading(false);
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      {loading && <LoadingPage />}
      <div className="customer__account main__container">
        <form onSubmit={handleModal}>
          <label>Số điện thoại</label>
          <input
            className="customer__account--input"
            onFocus={() => {
              setPhoneError(false);
              setPhoneErrorMessage("");
            }}
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />

          {phoneError && <p className="error__message">{phoneErrorMessage}</p>}

          <label>Mật khẩu hiện tại</label>

          <div className="password__block">
            <input
              value={password}
              onFocus={() => {
                setPasswordError(false);
                setPasswordErrorMessage("");
              }}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordType ? "password" : "text"}
            />
            {password.length > 0 && (
              <i
                className={
                  passwordType ? "fa-solid fa-eye-slash" : " fa-solid fa-eye"
                }
                onClick={() => setPasswordType(!passwordType)}
              ></i>
            )}
          </div>
          {passwordError && (
            <p className="error__message">{passwordErrorMessage}</p>
          )}

          <label>Mật khẩu mới</label>
          <div className="password__block">
            <input
              onFocus={() => {
                setNewPasswordError(false);
                setNewPasswordErrorMessage("");
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={newPasswordType ? "password" : "text"}
            />
            <i
              className={
                newPasswordType ? "fa-solid fa-eye-slash" : " fa-solid fa-eye"
              }
              onClick={() => setNewPasswordType(!newPasswordType)}
            ></i>
          </div>
          {newPasswordError && (
            <p className="error__message">{newPasswordErrorMessage}</p>
          )}

          <label>Nhập lại mật khẩu mới</label>
          <div className="password__block">
            <input
              onFocus={() => {
                setConfirmNewPasswordError(false);
                setConfirmNewPasswordErrorMessage("");
              }}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type={confirmNewPasswordType ? "password" : "text"}
            />
            <i
              className={
                confirmNewPasswordType
                  ? "fa-solid fa-eye-slash"
                  : " fa-solid fa-eye"
              }
              onClick={() => setConfirmNewPasswordType(!confirmNewPasswordType)}
            ></i>
          </div>
          {confirmNewPasswordError && (
            <p className="error__message">{conFirmNewPasswordErrorMessage}</p>
          )}

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
    </>
  );
};

export default CustomerContentAccount;
