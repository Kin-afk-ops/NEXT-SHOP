import Link from "next/link";
import "./cartPay.css";
import Image from "next/image";
import momoLogo from "../../../../assets/images/momo__logo.png";
import vnpagLogo from "../../../../assets/images/vnpay__logo.png";

const CartPay = () => {
  return (
    <div className="card__pay main__container">
      <div className="card__pay--content row no-gutters">
        <div className="c-6 row no-gutters card__pay--content-left">
          <div>
            <p className="card__pay--content-title">Thành tiền:</p>
            <p className="card__pay--content-money">đ</p>
          </div>
        </div>
        <div className="c-6 card__pay--content-right">
          <h3>Chọn phương thức thanh toán:</h3>
          <div className="card__pay--content-btn">
            <Link href="/" className="link main__btn router-btn pay__default">
              <i className="fa-solid fa-hand-holding-dollar"></i>Thanh toán khi
              nhận hàng
            </Link>

            <Link href="/" className="link main__btn router-btn momo__btn ">
              <Image
                src={momoLogo}
                alt="momo logo"
                width={25}
                height={25}
                style={{
                  marginRight: "5px",
                }}
              />
              Thanh toán bằng MOMO
            </Link>

            <Link href="/" className="link main__btn router-btn vnpay__btn ">
              <Image
                src={vnpagLogo}
                alt="momo logo"
                width={25}
                height={25}
                style={{
                  marginRight: "5px",
                }}
              />
              Thanh toán bằng VNPAY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPay;
