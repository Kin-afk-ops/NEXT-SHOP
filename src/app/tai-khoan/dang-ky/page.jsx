import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <div class="main__container register__container">
        <h1 class="register__title main__title">Đăng ký</h1>
        <hr />

        <div class="register__content">
          <form class="register__form">
            <label for="">Email</label>
            <input placeholder="Nhập Email" type="text" />
            <p class="error__message" v-if="!isSubmit"></p>

            <label for="">Mật khẩu</label>
            <div class="password__block">
              <input placeholder="Nhập mật khẩu" />
              <i class="fa-solid fa-eye"></i>
            </div>
            <p class="error__message" v-if="!isSubmit"></p>

            <label for="">Nhập lại mật khẩu</label>
            <div class="password__block">
              <input placeholder="Nhập lại mật khẩu" />
              <i class="fa-solid fa-eye"></i>
            </div>
            <p class="error__message" v-if="!isSubmit"></p>

            <button class="main__btn register__btn--main">Đăng ký</button>
            <Link href="/tai-khoan/dang-nhap" class="link">
              <button class="main__btn register__btn--extra">Đăng nhập</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
