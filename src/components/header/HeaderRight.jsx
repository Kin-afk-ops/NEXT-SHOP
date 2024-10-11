"use client";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import "./header.css";
import "./responsive.css";
import { logout } from "../../lib/features/user/userSlice";
import avatar from "../../assets/images/default_avatar.png";
import { getCart, getNoti } from "../../lib/apiCall";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";
import HeaderModal from "./HeaderModal";
import axiosInstance from "@/config";

import { logoutCart } from "../../lib/features/cart/cartLengthSlice";
import { logoutNoti } from "../../lib/features/notification/notiSlice";
import { turnOff, turnOn } from "../../lib/features/formLogin/formLoginSlice";

const HeaderRight = () => {
  const [headerModal, setHeaderModal] = useState(false);
  const [userId, setUserId] = useState("");

  const [infoUser, setInfoUser] = useState({});
  const [checkInfoUser, setCheckInfoUser] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [mode, setMode] = useState("login");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const router = useRouter();
  const cartLength = useSelector((state) => state.cartLength.length);
  const notification = useSelector((state) => state.noti.notification);

  const handleAccountMobile = () => {
    if (!user) {
      setHeaderModal(true);
    } else {
      router.push("/khach-hang/thong-tin");
    }
  };

  useEffect(() => {
    const getHomeData = async () => {
      let resInfoUser;

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

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutCart());
    dispatch(logoutNoti());
    setCheckInfoUser(false);
    setCheckUser(false);
    router.push("/");
  };

  return (
    <>
      <div className="header__right s-4">
        {checkUser && (
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
        )}

        {checkUser && (
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
        )}

        <div onClick={handleAccountMobile} className="header__icon l-0 m-0 ">
          <i className="fa-solid fa-user"></i>
        </div>

        {checkUser ? (
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
        ) : (
          <div className="header__icon--non-user s-0">
            <p
              onClick={() => {
                setMode("login");
                dispatch(turnOn());
              }}
            >
              Đăng nhập
            </p>
            <p
              onClick={() => {
                dispatch(turnOn());
                setMode("register");
              }}
            >
              Đăng kí
            </p>
          </div>
        )}

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

      <HeaderModal mode={mode} setMode={setMode} />
    </>
  );
};

export default HeaderRight;
