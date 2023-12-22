import "./page.css";

const CustomerContentAccount = () => {
  return (
    <div class="customer__account main__container">
      <form>
        <label for="">Email</label>
        <input class="customer__account--input" type="text" />
        {/* <p class="error__message" v-if="!isSubmit">{{ emailMessage }}</p> */}

        <label for="">Mật khẩu</label>
        {/* <div class="password__block" :class="{ error__block: !isSubmit }"> */}
        <div class="password__block">
          <input type="password" />
          <i class="fa-solid fa-eye"></i>
        </div>

        {/* <p class="error__message" v-if="!isSubmit">{{ passwordMessage }}</p> */}

        <label for="">Nhập lại mật khẩu</label>
        <div class="password__block">
          <input type="passoword" />
          <i class="fa-solid fa-eye"></i>
        </div>
        {/* <p class="error__message" v-if="!isSubmit">
        {{ confirmPasswordMessage }}
      </p> */}

        <button type="submit" class="customer__account--btn">
          Lưu thay đổi
        </button>
      </form>

      <div class="customer__modal hidden">
        <div class="customer__modal--title">
          Bạn có muốn thay đổi tài khoản?
        </div>
        <div class="customer__modal--content">
          <button class="customer__modal--hide">Huỷ</button>
          <button class="customer__modal--agree">Thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentAccount;
