import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <div className="main__container register__container">
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

            <button className="main__btn register__btn--main">Đăng ký</button>
            <Link href="/tai-khoan/dang-nhap" className="link">
              <button className="main__btn register__btn--extra">
                Đăng nhập
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
