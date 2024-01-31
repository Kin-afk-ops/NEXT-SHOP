"use client";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config";
import VND from "@/vnd";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItem = ({
  cartItem,
  setDeleteDisplay,
  setDeleteId,
  setTotalPrice,
  payMode,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(cartItem.check);
  const [quantity, setQuantity] = useState(cartItem.books.quantity);
  const [maxQuantity, setMaxQuantity] = useState(cartItem.books.maxQuantity);
  const [quantityMode, setQuantityMode] = useState(false);

  // useEffect(() => {
  //   const handleCheckAll = async () => {
  //     if (checkAll === true) {
  //       setChecked(true);
  //       const newCheck = {
  //         check: true,
  //       };

  //       try {
  //         await axiosInstance.put(`/cart/${cartItem._id}`, newCheck);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       setChecked(false);
  //       const newCheck = {
  //         check: false,
  //       };

  //       try {
  //         await axiosInstance.put(`/cart/${cartItem._id}`, newCheck);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   handleCheckAll();
  // }, [checkAll]);

  useEffect(() => {
    const setQuantity = async () => {
      if (quantityMode === true) {
        const newCart = {
          books: {
            bookId: cartItem?.books.bookId,
            name: cartItem?.books.name,
            image: cartItem?.books.image,
            price: cartItem?.books.price,
            discountPrice: cartItem?.books.discountPrice,

            quantity: quantity,
            maxQuantity: cartItem?.books.maxQuantity,
          },
        };

        try {
          const res = await axiosInstance.put(`/cart/${cartItem._id}`, newCart);
          // console.log(newCart);

          setQuantityMode(false);
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    };

    setQuantity();
  }, [quantity, quantityMode]);

  const handleCheck = async () => {
    if (checked === false) {
      const newCartCheck = {
        check: true,
      };
      try {
        await axiosInstance.put(`/cart/${cartItem._id}`, newCartCheck);

        setTotalPrice(
          (totalPrice) =>
            totalPrice + cartItem.books.discountPrice * cartItem.books.quantity
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      const newCartCheck = {
        check: false,
      };
      try {
        await axiosInstance.put(`/cart/${cartItem._id}`, newCartCheck);
        setTotalPrice(
          (totalPrice) =>
            totalPrice - cartItem.books.discountPrice * cartItem.books.quantity
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = () => {
    setDeleteId(cartItem._id);
    setDeleteDisplay(true);
  };

  const handleReduce = async () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
      setQuantityMode(true);
    }
  };
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity((quantity) => quantity + 1);
      setQuantityMode(true);
    }
  };

  return (
    <>
      <div className="cart__content--container-item-input display__flex--center c-1">
        {!payMode && (
          <input
            className="cart__item--check"
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              handleCheck();
            }}
          />
        )}
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
        <p className="info__title">{cartItem?.books.name}</p>
        <div className="info__money">
          <p className="info__money--all">
            {VND.format(cartItem?.books?.discountPrice)}
          </p>
          <p className="info__money--discount">
            {VND.format(cartItem?.books.price)}
          </p>
        </div>
      </div>
      <div className="cart__content--container-item-quantity display__flex--center c-2">
        <div className="cart__content--quantity-wrapper display__flex--center">
          <div
            className={
              quantity > 1
                ? "cart__content--quantity-reduce display__flex--center"
                : "cart__content--quantity-reduce display__flex--center non__quantity"
            }
            onClick={() => {
              handleReduce();
            }}
          >
            -
          </div>
          <input
            className="cart__content--quantity-value"
            type="text"
            value={quantity}
          />
          <div
            className={
              quantity < maxQuantity
                ? "cart__content--quantity-increase display__flex--center"
                : "cart__content--quantity-increase display__flex--center non__quantity"
            }
            onClick={() => {
              handleIncrease();
            }}
          >
            +
          </div>
        </div>
      </div>

      <div className="cart__content--container-item-money display__flex--center c-2">
        {VND.format(cartItem?.books.quantity * cartItem?.books.discountPrice)}
      </div>

      {!payMode && (
        <div
          className="cart__content--container-item-trash display__flex--center c-2"
          onClick={() => handleDelete()}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      )}
    </>
  );
};

export default CartItem;
