"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, getCart, getNoti } from "../../lib/apiCall";
import { logout, resetState } from "../../lib/features/user/userSlice";
import { logoutCart } from "../../lib/features/cart/cartLengthSlice";
import { logoutNoti } from "../../lib/features/notification/notiSlice";

import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Image from "next/image";
import "./header.css";
import "./responsive.css";
import logo from "../../assets/images/toi_doc_sach_logo.png";
import avatar from "../../assets/images/default_avatar.png";
import axiosInstance from "../../config";
import { toast } from "react-toastify";
import HeaderInput from "./HeaderInput";
import dynamic from "next/dynamic";

const Header = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("VI");
  const [userId, setUserId] = useState("");
  const [headerModal, setHeaderModal] = useState(false);
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [phoneLoginError, setPhoneLoginError] = useState(false);
  const [passwordLoginError, setPasswordLoginError] = useState(false);

  const [phoneRegisterError, setPhoneRegisterError] = useState(false);
  const [phoneExistError, setPhoneExistError] = useState(false);
  const [passwordRegisterError, setPasswordRegisterError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [noAccount, setNoAccount] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const [infoUser, setInfoUser] = useState({});

  const [checkInfoUser, setCheckInfoUser] = useState(false);
  const [checkUser, setCheckUser] = useState(false);

  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const cartLength = useSelector((state) => state.cartLength.length);
  const notification = useSelector((state) => state.noti.notification);

  const languages = ["VI", "ENG"];

  const handleForgetPassword = () => {
    setHeaderModal(false);
    router.push("/tai-khoan/quen-mat-khau");
  };

  const validate = () => {
    if (mode === "login") {
      return phone === "" || password === "" ? false : true;
    } else {
      return phone === "" || password === "" || confirmPassword === ""
        ? false
        : true;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newLogin = {
      phone,
      password,
    };

    login(dispatch, newLogin, setNoAccount);

    console.log(isError);
    if (validate()) {
    } else {
      if (phone === "") {
        setPhoneLoginError(true);
      }
      if (password === "") {
        setPasswordLoginError(true);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutCart());
    dispatch(logoutNoti());
    setCheckInfoUser(false);
    setCheckUser(false);
    router.push("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validate()) {
      if (password === confirmPassword) {
        const newRegister = {
          phone,
          password,
        };

        const newInfoUser = {
          avatar: {
            path: "",
            publicId: "",
          },

          lastName: "",
          firstName: "",
          email: "",
          gender: "",
          birthday: "",
          address: {
            province: "",
            district: "",
            ward: "",
            address: "",
          },
        };

        try {
          const resRegister = await axiosInstance.post(
            "/auth/register",
            newRegister
          );

          const newNotification = {
            userId: resRegister.data._id,
          };

          try {
            const resNotification = await axiosInstance.post(
              "/auth/createNotification",
              newNotification
            );

            const resInfoUser = await axiosInstance.post(
              `/infoUser/${resRegister.data._id}`,
              newInfoUser
            );

            toast.success("Đăng ký thành công");
          } catch (error) {
            console.log(error.response);
          }
        } catch (error) {
          toast.error("Đăng kí thất bại!");

          console.log(error);
        }
      } else {
        setPasswordConfirm(true);
      }
    } else {
      if (phone === "") {
        setPhoneRegisterError(true);
      }
      if (password === "") {
        setPasswordRegisterError(true);
      }
      if (confirmPassword === "") {
        setConfirmPasswordError(true);
      }
    }
  };

  useEffect(() => {
    const getHomeData = async () => {
      let resInfoUser;

      console.log(resInfoUser);
      if (user) {
        getCart(dispatch, user?._id);
        getNoti(dispatch, user?._id);
        setCheckUser(true);
        resInfoUser = await axiosInstance.get(`infoUser/${user?._id}`);
        setUserId(user._id);
      } else {
        setUserId("");
      }

      try {
        resInfoUser && setInfoUser(resInfoUser.data);

        resInfoUser ? setCheckInfoUser(true) : setCheckInfoUser(false);
      } catch (error) {
        console.log(error);
      }
    };

    getHomeData();
  }, [checkUser, dispatch, user]);

  const handleReadNoti = async (path, id) => {
    const newNoti = {
      read: true,
    };

    try {
      await axiosInstance.put(`/notification/user/${id}`, newNoti);

      router.push(path);
      getNoti(dispatch, user._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header">
      <div className="header__content grid wide">
        <div className="header__left s-12">
          <Link className="link header__logo--img" href="/">
            <Image src={logo} alt="logo" />
          </Link>

          {/* <Link className="link header__icon--left" href="/bai-viet">
            <i className="fa-solid fa-newspaper"></i>
            <span>Bài viết</span>
          </Link> */}
        </div>

        <HeaderInput />

        <div className="header__right s-4">
          <div className="header__icon">
            <i
              className="fa-solid fa-bell"
              onClick={() => router.push("/khach-hang/thong-bao")}
            ></i>
            <span
              className="m-0 s-0"
              onClick={() => router.push("/khach-hang/thong-bao")}
            >
              Thông báo
            </span>
            {notification.length !== 0 && (
              <div className="header__icon--total">{notification?.length}</div>
            )}

            {notification && (
              <ul className="header__icon--notify-list m-0 s-0">
                <div className="header__icon--notify-header">
                  <span className="header__icon--notify-title">
                    {" "}
                    Thông báo{" "}
                  </span>
                  <Link className="link" href={`/khach-hang/thong-bao`}>
                    <span className="header__icon--notify-all">Xem tất cả</span>
                  </Link>
                </div>
                <hr />
                {notification?.length !== 0 ? (
                  <div>
                    {notification?.map((noti, index) => (
                      <li className="header__icon--notify-li" key={noti._id}>
                        <div
                          className=" display__flex--center"
                          onClick={() =>
                            handleReadNoti(noti.notify.path, noti._id)
                          }
                        >
                          <i className="header__icon--notify-li-icon fa-solid fa-triangle-exclamation"></i>
                          <div className="header__icon--notify-li-wrap">
                            <span className="header__icon--notify-li-title">
                              {noti.notify.title}
                            </span>
                            <span className="header__icon--notify-li-content">
                              {noti.notify.content}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                ) : (
                  <p className="main__title">Không có thông báo mới</p>
                )}
              </ul>
            )}
          </div>

          <Link href={`/gio-hang/${userId}`} className="link">
            <div className="header__icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="m-0 s-0">Giỏ hàng</span>

              {cartLength !== 0 && (
                <div className="header__icon--total header__icon--total-cart">
                  {cartLength}
                </div>
              )}
            </div>
          </Link>

          <Link className="link" href={`/khach-hang/thong-tin`}>
            <div className="header__icon l-0 m-0">
              <i className="fa-solid fa-user"></i>
            </div>
          </Link>

          <div className="header__icon s-0">
            <i className="fa-solid fa-user"></i>
            <span className="m-0 s-0">Tài khoản</span>

            <ul className="header__icon--user-list s-0">
              <div
                onClick={() => {
                  user && router.push("/khach-hang/thong-tin");
                }}
              >
                {!checkInfoUser ? (
                  <div className="header__icon--user-header">
                    <Image
                      src={avatar}
                      alt=""
                      width={50}
                      height={50}
                      style={{
                        objectFit: "contain",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                      }}
                    />
                    <div>
                      <p className="header__icon--user-name"></p>
                      <p className="header__icon--user-email"></p>
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                ) : (
                  <div className="header__icon--user-header">
                    <Image
                      src={
                        infoUser?.avatar.path !== ""
                          ? infoUser?.avatar.path
                          : avatar
                      }
                      alt={
                        infoUser?.lastName +
                        " " +
                        infoUser?.firstName +
                        " " +
                        "avatar"
                      }
                      width={50}
                      height={50}
                      style={{
                        objectFit: "contain",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                      }}
                    />
                    <div>
                      {infoUser?.lastName && infoUser?.firstName ? (
                        <p className="header__icon--user-name">
                          {infoUser?.lastName + " " + infoUser?.firstName}
                        </p>
                      ) : (
                        <p className="header__icon--user-name"></p>
                      )}

                      {user?.phone && (
                        <p className="header__icon--user-phone">
                          {user?.phone}
                        </p>
                      )}
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                )}
              </div>
              <Link href="/khach-hang/don-hang" className="link">
                <li className="header__icon--user-li">
                  <i className="fa-solid fa-clipboard"></i>
                  <span className="header__icon--user-li-title">
                    Đơn hàng của tôi
                  </span>
                </li>
              </Link>
              <hr />

              {checkUser ? (
                <li
                  className="header__icon--user-li"
                  onClick={() => handleLogout()}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span className="header__icon--user-li-title">Đăng xuất</span>
                </li>
              ) : (
                <li
                  className="header__icon--user-li"
                  onClick={() => setHeaderModal(true)}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span className="header__icon--user-li-title">Đăng nhập</span>
                </li>
              )}

              <hr />
            </ul>
          </div>

          {/* <div className="header__icon header__icon--language">
            <div>
              <p>{language}</p>
            </div>

            <div className="header__icon--language-choice">
              {languages.map((lang, index) => (
                <p key={index} onClick={() => setLanguage(lang)}>
                  {lang}
                </p>
              ))}
            </div>

            <span>Ngôn ngữ</span>
          </div> */}
        </div>
      </div>

      {headerModal && (
        <div className="header__modal">
          <div
            className="header__modal--overlay"
            onClick={() => setHeaderModal(false)}
          ></div>
          {mode === "login" ? (
            <div
              className="main__container register__container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="register__title">
                <h1 className="main__title">Đăng nhập</h1>
              </div>

              <hr />

              <div className="register__content">
                <form className="register__form" onSubmit={handleLogin}>
                  <label>Số điện thoại</label>
                  <input
                    placeholder="Nhập số điện thoại"
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhoneLoginError(false);
                      setPhone(e.target.value);
                      setNoAccount(false);
                    }}
                  />

                  {phoneLoginError && (
                    <p className="error__message">
                      Số điện thoại không được bỏ trống
                    </p>
                  )}

                  {noAccount && (
                    <p className="error__message">
                      Số điện thoại hoặc mật khẩu không đúng
                    </p>
                  )}

                  <label>Mật khẩu</label>
                  <div className="password__block">
                    <input
                      placeholder="Nhập mật khẩu"
                      type={passwordType ? "password" : "text"}
                      value={password}
                      onChange={(e) => {
                        setPasswordLoginError(false);
                        setPassword(e.target.value);
                        setNoAccount(false);
                      }}
                    />

                    <i
                      className={
                        passwordType
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                      onClick={() => setPasswordType(!passwordType)}
                    ></i>
                  </div>

                  {passwordLoginError && (
                    <p className="error__message">
                      Mật khẩu không được bỏ trống
                    </p>
                  )}

                  {noAccount && (
                    <p className="error__message">
                      Số điện thoại hoặc mật khẩu không đúng
                    </p>
                  )}

                  <div
                    className="forget__password"
                    onClick={handleForgetPassword}
                  >
                    Quên mật khẩu
                  </div>

                  <button
                    className="main__btn register__btn--main"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="main__btn register__btn--extra"
                    onClick={() => setMode("register")}
                  >
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div
              className="main__container register__container"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="register__title main__title">Đăng ký</h1>
              <hr />

              <div className="register__content">
                <form className="register__form" onSubmit={handleRegister}>
                  <label>Số điện thoại</label>
                  <input
                    placeholder="Nhập số điện thoại"
                    type="text"
                    id="email"
                    value={phone}
                    onChange={(e) => {
                      setPhoneRegisterError(false);
                      setPhone(e.target.value);
                    }}
                  />

                  {phoneRegisterError && (
                    <p className="error__message">
                      Số điện thoại không được bỏ trống
                    </p>
                  )}

                  <label>Mật khẩu</label>
                  <div className="password__block">
                    <input
                      placeholder="Nhập mật khẩu"
                      type={passwordType ? "password" : "text"}
                      value={password}
                      onChange={(e) => {
                        setPasswordRegisterError(false);
                        setPasswordConfirm(false);
                        setPassword(e.target.value);
                      }}
                    />
                    <i
                      className={
                        passwordType
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                      onClick={() => setPasswordType(!passwordType)}
                    ></i>
                  </div>

                  {passwordRegisterError && (
                    <p className="error__message">
                      Mật khẩu không được bỏ trống
                    </p>
                  )}

                  {passwordConfirm && (
                    <p className="error__message">Mật khẩu không trùng khớp</p>
                  )}

                  <label>Nhập lại mật khẩu</label>
                  <div className="password__block">
                    <input
                      placeholder="Nhập lại mật khẩu"
                      type={confirmPasswordType ? "password" : "text"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPasswordError(false);
                        setPasswordConfirm(false);
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <i
                      className={
                        confirmPasswordType
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                      onClick={() =>
                        setConfirmPasswordType(!confirmPasswordType)
                      }
                    ></i>
                  </div>

                  {confirmPasswordError && (
                    <p className="error__message">
                      Mật khẩu không được bỏ trống
                    </p>
                  )}

                  {passwordConfirm && (
                    <p className="error__message">Mật khẩu không trùng khớp</p>
                  )}

                  <button
                    className="main__btn register__btn--main"
                    type="submit"
                  >
                    Đăng ký
                  </button>
                  <button
                    className="main__btn register__btn--extra"
                    onClick={() => setMode("login")}
                  >
                    Đăng nhập
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
