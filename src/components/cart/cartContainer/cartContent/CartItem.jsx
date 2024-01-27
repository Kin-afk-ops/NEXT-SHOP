"use client";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config";
import VND from "@/vnd";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItem = ({ cartItem, checkAll }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(cartItem.check);

  useEffect(() => {
    const handleCheckAll = async () => {
      if (checkAll === true) {
        setChecked(true);
        const newCheck = {
          check: true,
        };

        try {
          await axiosInstance.put(`/cart/${cartItem._id}`, newCheck);
        } catch (error) {
          console.log(error);
        }
      } else {
        setChecked(false);
        const newCheck = {
          check: false,
        };

        try {
          await axiosInstance.put(`/cart/${cartItem._id}`, newCheck);
        } catch (error) {
          console.log(error);
        }
      }
    };

    handleCheckAll();
  }, [checkAll]);

  const handleCheck = async () => {
    if (cartItem.check === false) {
      const newCartCheck = {
        check: true,
      };

      try {
        await axiosInstance.put(`/cart/${cartItem._id}`, newCartCheck);
      } catch (error) {
        console.log(error);
      }
    } else {
      const newCartCheck = {
        check: false,
      };

      try {
        await axiosInstance.put(`/cart/${cartItem._id}`, newCartCheck);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="cart__content--container-item-input display__flex--center c-1">
        <input
          className="cart__item--check"
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            handleCheck();
          }}
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
