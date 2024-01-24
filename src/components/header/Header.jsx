"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../lib/apiCall";
import { logout } from "../../lib/features/user/userSlice";

import Link from "next/link";
import Image from "next/image";
import "./header.css";
import logo from "../../assets/images/toi_doc_sach_logo.png";
import avatar from "../../assets/images/default_avatar.png";
import axiosInstance from "../../config";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("VI");
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
  const [passwordRegisterError, setPasswordRegisterError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const [infoUser, setInfoUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkInfoUser, setCheckInfoUser] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

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

    if (validate()) {
      login(dispatch, newLogin);
      try {
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          router.refresh();
          setHeaderModal(false);
        }, 2000);
      } catch (error) {
        toast.error("Đăng nhập thất bại! Hãy kiểm tra lại!");

        console.log(error);
      }
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
    router.refresh();
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
          address: "",
        };

        try {
          const resRegister = await axiosInstance.post(
            "/auth/register",
            newRegister
          );
          x;
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

            toast.success("Chỉnh sửa thông tin thành công");
          } catch (error) {
            console.log(error);
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
    const isEmptyObject = (obj) => {
      return JSON.stringify(obj) === "{}";
    };

    const getHomeData = async () => {
      const resInfoUser = await axiosInstance.get(`infoUser/${user?._id}`);
      const resNotification = await axiosInstance.get(
        `/home/notification/${user?._id}`
      );
      const resCart = await axiosInstance.get(`/home/cart/${user?._id}`);

      try {
        setInfoUser(resInfoUser.data);
        setNotification(resNotification.data);
        setCart(resCart.data);

        !isEmptyObject(resInfoUser.data)
          ? setCheckInfoUser(true)
          : setCheckInfoUser(false);
      } catch (error) {
        console.log(error);
      }
    };

    getHomeData();
  }, []);

  return (
    <div className="header">
      <div div className="header__content">
        <div className="header__left">
          <Link className="link header__logo--img" href="/">
            <Image src={logo} alt="" width={220} height={39} />
          </Link>

          {/* <Link className="link header__icon--left" href="/bai-viet">
            <i className="fa-solid fa-newspaper"></i>
            <span>Bài viết</span>
          </Link> */}
        </div>

        <div className="header__center">
          <input
            type="text"
            className="header__center--input"
            placeholder="Tìm kiếm sản phẩm mong muốn..."
          />
          <div className="header__center--icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="header__right">
          <div className="header__icon">
            <i className="fa-solid fa-bell"></i>
            <span>Thông báo</span>

            {notification.length !== 0 && (
              <div className="header__icon--total">{notification?.length}</div>
            )}

            {notification && (
              <ul className="header__icon--notify-list">
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
                {notification?.map((noti, index) => (
                  <li className="header__icon--notify-li" key={noti._id}>
                    <Link
                      href={noti.notify.path}
                      className="link display__flex--center"
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
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link href={`/gio-hang?id=${user?._id}`} className="link">
            <div className="header__icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <span> Giỏ hàng</span>

              {cart.length !== 0 && (
                <div className="header__icon--total header__icon--total-cart">
                  {cart?.length}
                </div>
              )}
            </div>
          </Link>

          <div className="header__icon">
            <i className="fa-solid fa-user"></i>
            <span>Tài khoản</span>

            <ul className="header__icon--user-list">
              <Link href={`/khach-hang/thong-tin`} className="link">
                {!checkInfoUser ? (
                  <div className="header__icon--user-header">
                    <Image
                      src={avatar}
                      alt=""
                      width={50}
                      height={50}
                      style={{
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
                      src={checkInfoUser ? infoUser?.avatar.path : avatar}
                      alt={
                        infoUser?.lastName +
                        " " +
                        infoUser.firstName +
                        " " +
                        "avatar"
                      }
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                      }}
                    />
                    <div>
                      {infoUser.lastName && (
                        <p className="header__icon--user-name">
                          {infoUser?.lastName + " " + infoUser.firstName}
                        </p>
                      )}

                      {infoUser.email && (
                        <p className="header__icon--user-phone">
                          {user?.phone}
                        </p>
                      )}
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                )}
              </Link>
              <Link href="/khach-hang/don-hang" className="link">
                <li className="header__icon--user-li">
                  <i className="fa-solid fa-clipboard"></i>
                  <span className="header__icon--user-li-title">
                    Đơn hàng của tôi
                  </span>
                </li>
              </Link>
              <hr />

              {user ? (
                <li className="header__icon--user-li" onClick={handleLogout}>
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
              {/* {user ? (
                <li className="header__icon--user-li">
                  <i className="fa-regular fa-address-card"></i>
                  <span className="header__icon--user-li-title">Đăng kí</span>
                </li>
              ) : (
                <li></li>
              )} */}
            </ul>
          </div>

          <div className="header__icon header__icon--language">
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
          </div>
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
                    }}
                  />

                  {phoneLoginError && (
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
                        setPasswordLoginError(false);
                        setPassword(e.target.value);
                      }}
                    />
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => setPasswordType(!passwordType)}
                    ></i>
                  </div>

                  {passwordLoginError && (
                    <p className="error__message">
                      Mật khẩu không được bỏ trống
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
                      className="fa-solid fa-eye"
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
                      className="fa-solid fa-eye"
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

export default Header;
