"use client";

import VND from "@/vnd";
import Image from "next/image";
import { useState } from "react";

const CartItem = ({ cartItem }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    console.log(checked);
  };

  return (
    <>
      <div className="cart__content--container-item-input display__flex--center c-1">
        <input
          className={
            cartItem?.check ? "cart__item--check" : "cart__item--no-check"
          }
          type="checkbox"
          checked={cartItem?.check}
          onChange={() => handleCheck()}
        />
      </div>

      <div className="img__main c-1">
        <Image
          src={cartItem.books.image}
          alt={cartItem.books.image}
          width={100}
          height={100}
        />
      </div>
      <div className="cart__content--container-item-info c-4">
        <p className="info__title">{cartItem.books.name}</p>
        <div className="info__money">
          <p className="info__money--all">
            {" "}
            {VND.format(cartItem?.books?.price)}
          </p>
          <p className="info__money--discount"> đ</p>
        </div>
      </div>
      <div className="cart__content--container-item-quality display__flex--center c-2">
        <div>{cartItem?.books.quantity}</div>
      </div>

      <div className="cart__content--container-item-money display__flex--center c-2">
        {VND.format(cartItem?.books.quantity * cartItem?.books.price)}
      </div>
    </>
  );
};

export default CartItem;
