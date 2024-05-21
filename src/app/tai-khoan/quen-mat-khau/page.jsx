"use client";
import { useEffect, useState } from "react";

const forgetPasswordPage = () => {
  const [overlay, setOverlay] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.recaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOverlay(true);
  };

  return (
    <div className="main__container forget__password--container">
      <h1 className="forget__password--title main__title">Quên mật khẩu</h1>
      <hr />

      <div className="forget__password--content">
        <form className="forget__password--form">
          <label>Số điện thoại</label>
          <input
            placeholder="Nhập số điện thoại"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <label>Nhập OTP</label>
          <div className="password__block otp__block">
            <input
              className="otp__input"
              placeholder="Nhập OTP"
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <button>Gửi OPT</button>
          </div>
          <button
            className="main__btn forget__password--btn--main"
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
        <div
          className="main__container forget__password--container forget__password--modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="forget__password--title main__title">
            Nhập mật khẩu mới
          </h1>
          <hr />

          <div className=" forget__password--content">
            <form className="forget__password--form">
              <label>Mật khẩu</label>
              <div className="password__block">
                <input
                  placeholder="Nhập mật khẩu"
                  type={passwordType ? "password" : "text"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <i
                  className={
                    passwordType ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                  onClick={() => setPasswordType(!passwordType)}
                ></i>
                <div></div>
              </div>
              <p className="error__message"></p>

              <label>Nhập lại mật khẩu</label>
              <div className="password__block">
                <input
                  placeholder="Nhập lại mật khẩu"
                  type={confirmPasswordType ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <i
                  className={
                    confirmPasswordType
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                ></i>
                <div></div>
              </div>
              <p className="error__message"></p>
              <button className="main__btn forget__password--btn--main">
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgetPasswordPage;
