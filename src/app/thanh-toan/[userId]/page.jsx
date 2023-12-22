import Image from "next/image";
import momoLogo from "../../../assets/images/momo__logo.png";
import vnpagLogo from "../../../assets/images/vnpay__logo.png";

import "./page.css";
import CartContent from "../../../components/cart/cartContainer/cartContent/CartContent";

const PayPage = () => {
  return (
    <div className="pay main__container">
      <h1 className="main__title pay__title">ĐỊA CHỈ GIAO HÀNG</h1>
      <hr />

      <form action="" className="pay__form">
        <div className="pay__form--wrap c-6">
          <label className="pay__form--label" for="">
            Họ và tên người nhận
          </label>
          <input
            v-model="clientInfo.clientName"
            className="pay__input"
            type="text"
          />
          <label className="pay__form--label" for="">
            Số điện thoại
          </label>
          <input
            v-model="clientInfo.phone"
            className="pay__input"
            type="text"
          />

          <label className="pay__form--label" for="">
            Địa chỉ giao hàng
          </label>
          <input
            v-model="clientInfo.address"
            className="pay__input"
            type="text"
          />

          <label className="pay__form--label" for="">
            Ghi chú
          </label>
          <input v-model="clientInfo.note" className="pay__input" type="text" />
        </div>

        <h3 className="main__title">Xem lại giỏ hàng</h3>

        <CartContent />

        <div className="pay__total--money">
          Tổng giá tiền:
          {/* <span>{{ makeMoney }} đ</span> */}
        </div>

        <div className="pay__method">
          <button className="main__btn pay__btn pay__default" type="submit">
            <i className="fa-solid fa-hand-holding-dollar"></i>
            Mua hàng
          </button>

          <button className="main__btn pay__btn pay__momo" type="submit">
            <Image
              src={momoLogo}
              alt="momo logo"
              width={25}
              height={25}
              style={{
                marginRight: "5px",
              }}
            />
            Mua hàng
          </button>

          <button className="main__btn pay__btn pay__vnpay" type="submit">
            <Image
              src={vnpagLogo}
              alt="momo logo"
              width={25}
              height={25}
              style={{
                marginRight: "5px",
              }}
            />
            Mua hàng
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayPage;
