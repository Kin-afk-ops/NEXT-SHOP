"use client";
import { useState } from "react";

const forgetPasswordPage = () => {
  const [overlay, setOverlay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOverlay(true);
  };

  return (
    <div class="main__container register__container">
      <h1 class="register__title main__title">Quên mật khẩu</h1>
      <hr />

      <div class="register__content">
        <form class="register__form">
          <label for="">Email</label>
          <input placeholder="Nhập Email" type="text" />

          <label for="">Số điện thoại</label>
          <input placeholder="Nhập số điện thoại" type="text" />

          <label for="">Nhập OTP</label>
          <div className="password__block otp__block">
            <input className="otp__input" placeholder="Nhập OTP" type="text" />
            <button>Gửi OPT</button>
          </div>
          <button
            class="main__btn register__btn--main"
            onClick={(e) => handleSubmit(e)}
          >
            Nhập mật khẩu mới
          </button>
        </form>
      </div>

      <div
        className={overlay ? "modal__overlay" : "hidden"}
        onClick={() => setOverlay(false)}
      >
        <div className="main__container register__container forget__password--modal">
          <h1 class="register__title main__title">Nhập mật khẩu mới</h1>
          <hr />

          <div class=" register__content">
            <form class="register__form">
              <label for="">Mật khẩu</label>
              <div class="password__block">
                <input placeholder="Nhập mật khẩu" />
                <i class="fa-solid fa-eye"></i>
                <div></div>
              </div>
              <p class="error__message"></p>

              <label for="">Nhập lại mật khẩu</label>
              <div class="password__block">
                <input placeholder="Nhập lại mật khẩu" />
                <i class="fa-solid fa-eye"></i>
                <div></div>
              </div>
              <p class="error__message"></p>
              <button class="main__btn register__btn--main">Xác nhận</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgetPasswordPage;
