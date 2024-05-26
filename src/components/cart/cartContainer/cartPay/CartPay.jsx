"use client";

import Link from "next/link";
import "./cartPay.css";
import Image from "next/image";
import momoLogo from "../../../../assets/images/momo__logo.png";
import vnpagLogo from "../../../../assets/images/vnpay__logo.png";
import VND from "@/vnd";
import "./responsive.css";

const CartPay = ({ totalPrice, userId }) => {
  return (
    <div className="card__pay main__container">
      <div className="card__pay--content row no-gutters">
        <div className="c-6 s-12 row no-gutters card__pay--content-left">
          <div>
            <p className="card__pay--content-title">Thành tiền:</p>
            <p className="card__pay--content-money">{VND.format(totalPrice)}</p>
          </div>
        </div>
        <div className="c-6 s-12 card__pay--content-right">
          <div className="card__pay--content-btn">
            <Link
              href={`/thanh-toan/${userId}`}
              className="link main__btn router-btn pay__default"
            >
              <i className="fa-solid fa-hand-holding-dollar"></i>Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPay;
