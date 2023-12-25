import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className="main__container register__container">
        <h1 className="register__title main__title">Đăng nhập</h1>
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

            <Link
              href="/tai-khoan/quen-mat-khau"
              className="link forget__password"
            >
              Quên mật khẩu
            </Link>

            <button className="main__btn register__btn--main">Đăng nhập</button>
            <Link href="/tai-khoan/dang-ky" className="link">
              <button className="main__btn register__btn--extra">
                Đăng ký
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
