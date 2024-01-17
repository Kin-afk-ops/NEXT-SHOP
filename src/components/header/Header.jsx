"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import "./header.css";
import logo from "../../assets/images/toi_doc_sach_logo.png";
import avatar from "../../assets/images/default_avatar.png";

const Header = () => {
  const router = useRouter();

  const [language, setLanguage] = useState("VI");
  const [headerModal, setHeaderModal] = useState(false);
  const [mode, setMode] = useState("login");
  const [titleContent, setTitleContent] = useState("Đăng ký");

  const languages = ["VI", "ENG"];

  const handleForgetPassword = () => {
    setHeaderModal(false);
    router.push("/tai-khoan/quen-mat-khau");
  };

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__left">
          <Link className="link header__logo--img" href="/">
            <Image src={logo} alt="" width={220} height={39} />
          </Link>

          <Link className="link header__icon--left" href="/bai-viet">
            <i className="fa-solid fa-newspaper"></i>
            <span>Bài viết</span>
          </Link>
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
            <div className="header__icon--total"></div>

            <ul className="header__icon--notify-list">
              <div className="header__icon--notify-header">
                <span className="header__icon--notify-title"> Thông báo </span>
                <Link className="link" href="/khach-hang/thong-bao">
                  <span className="header__icon--notify-all">Xem tất cả</span>
                </Link>
              </div>
              <hr />
              <li className="header__icon--notify-li">
                <Link href="/" className="link display__flex--center">
                  <i className="header__icon--notify-li-icon fa-solid fa-triangle-exclamation"></i>
                  <div className="header__icon--notify-li-wrap">
                    <span className="header__icon--notify-li-title"></span>
                    <span className="header__icon--notify-li-content"></span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/gio-hang/abc" className="link">
            <div className="header__icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <span> Giỏ hàng</span>
              <div className="header__icon--total header__icon--total-cart">
                3
              </div>
            </div>
          </Link>

          <div className="header__icon">
            <i className="fa-solid fa-user"></i>
            <span>Tài khoản</span>

            <ul className="header__icon--user-list">
              <Link href="/khach-hang/thong-tin" className="link">
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

              <li
                className="header__icon--user-li"
                onClick={() => setHeaderModal(true)}
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span className="header__icon--user-li-title">Đăng nhập</span>
              </li>
              <hr />

              <li className="header__icon--user-li">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="header__icon--user-li-title">Đăng xuất</span>
              </li>
              <hr />

              <Link href="/tai-khoan/dang-ky" className="link" v-if="!user">
                <li className="header__icon--user-li">
                  <i className="fa-regular fa-address-card"></i>
                  <span className="header__icon--user-li-title">Đăng kí</span>
                </li>
              </Link>
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
        <div className="header__modal" onClick={() => setHeaderModal(false)}>
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
                <form className="register__form">
                  <label for="">Số điện thoại</label>
                  <input placeholder="Nhập số điện thoại" type="text" />
                  <p className="error__message"></p>

                  <label for="">Mật khẩu</label>
                  <div className="password__block">
                    <input placeholder="Nhập mật khẩu" />
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <p className="error__message"></p>

                  <div
                    className="forget__password"
                    onClick={handleForgetPassword}
                  >
                    Quên mật khẩu
                  </div>

                  <button className="main__btn register__btn--main">
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
                <form className="register__form">
                  <label for="">Email</label>
                  <input placeholder="Nhập Email" type="text" />
                  <p className="error__message"></p>

                  <label for="">Mật khẩu</label>
                  <div className="password__block">
                    <input placeholder="Nhập mật khẩu" />
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <p className="error__message"></p>

                  <label for="">Nhập lại mật khẩu</label>
                  <div className="password__block">
                    <input placeholder="Nhập lại mật khẩu" />
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <p className="error__message"></p>

                  <button className="main__btn register__btn--main">
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
