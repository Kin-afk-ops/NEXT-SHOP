import "./page.css";

const CustomerContentAccount = () => {
  return (
    <div className="customer__account main__container">
      <form>
        <label for="">Email</label>
        <input className="customer__account--input" type="text" />
        {/* <p className="error__message" v-if="!isSubmit">{{ emailMessage }}</p> */}

        <label for="">Mật khẩu</label>
        {/* <div className="password__block" :className="{ error__block: !isSubmit }"> */}
        <div className="password__block">
          <input type="password" />
          <i className="fa-solid fa-eye"></i>
        </div>

        {/* <p className="error__message" v-if="!isSubmit">{{ passwordMessage }}</p> */}

        <label for="">Nhập lại mật khẩu</label>
        <div className="password__block">
          <input type="passoword" />
          <i className="fa-solid fa-eye"></i>
        </div>
        {/* <p className="error__message" v-if="!isSubmit">
        {{ confirmPasswordMessage }}
      </p> */}

        <button type="submit" className="customer__account--btn">
          Lưu thay đổi
        </button>
      </form>

      <div className="customer__modal hidden">
        <div className="customer__modal--title">
          Bạn có muốn thay đổi tài khoản?
        </div>
        <div className="customer__modal--content">
          <button className="customer__modal--hide">Huỷ</button>
          <button className="customer__modal--agree">Thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentAccount;
