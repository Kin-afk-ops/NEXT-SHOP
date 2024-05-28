"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { reduceCart } from "@/lib/features/cart/cartLengthSlice";
import axiosInstance from "@/config";
import VND from "@/vnd";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import configSlug from "@/slug";
import "./responsive.css";

const CartItem = ({
  cartItem,
  setDeleteDisplay,
  setDeleteId,
  setTotalPrice,
  payMode,
}) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [checked, setChecked] = useState(cartItem.check);
  const [quantity, setQuantity] = useState(cartItem.books.quantity);
  const [maxQuantity, setMaxQuantity] = useState(cartItem.books.maxQuantity);
  const [quantityMode, setQuantityMode] = useState("none");
  const [payPrice, setPayPrice] = useState(
    cartItem.books.quantity * cartItem.books.discountPrice
  );

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
      if (quantityMode === "reduce") {
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

          if (checked) {
            setTotalPrice(
              (totalPrice) => totalPrice - cartItem.books.discountPrice
            );
          }

          setPayPrice(res.data.books.discountPrice * res.data.books.quantity);

          setQuantityMode("none");
        } catch (error) {
          console.log(error);
        }
      } else if (quantityMode === "increase") {
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

          if (checked) {
            setTotalPrice(
              (totalPrice) => totalPrice + cartItem.books.discountPrice
            );
          }

          setPayPrice(res.data.books.discountPrice * res.data.books.quantity);

          setQuantityMode("none");
        } catch (error) {
          console.log(error);
        }
      }
    };

    setQuantity();
  }, [
    quantity,
    quantityMode,
    cartItem._id,
    cartItem.books.bookId,
    cartItem.books.discountPrice,
    cartItem.books.image,
    cartItem.books.maxQuantity,
    cartItem.books.name,
    cartItem.books.price,
    checked,
    setTotalPrice,
  ]);

  const handleCheck = async () => {
    if (checked === false) {
      const newCartCheck = {
        check: true,
      };
      try {
        await axiosInstance.put(`/cart/${cartItem._id}`, newCartCheck);

        setTotalPrice(
          (totalPrice) => totalPrice + cartItem.books.discountPrice * quantity
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
          (totalPrice) => totalPrice - cartItem.books.discountPrice * quantity
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
      setQuantityMode("reduce");
    }
  };
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity((quantity) => quantity + 1);
      setQuantityMode("increase");
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

      <div className="img__main l-1 m-2 cart__item-img">
        <Image
          src={cartItem.books.image}
          alt={cartItem.books.image}
          width={100}
          height={100}
        />
      </div>
      <div className="cart__content--container-item-info c-4 m-7 s-7">
        <Link
          className="link"
          href={`/sach/${configSlug(cartItem?.books.name)}.html`}
        >
          <p className="info__title">{cartItem?.books.name}</p>
        </Link>

        {!payMode && (
          <div className="cart__content--container-item-quantity-middle">
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
            <div className="cart__content--quantity-value">{quantity}</div>

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
        )}

        <div className="info__money">
          <p className="info__money--all">
            {VND.format(cartItem?.books?.discountPrice)}
          </p>
          <p className="info__money--discount">
            {VND.format(cartItem?.books.price)}
          </p>
        </div>

        <div className="cart__content--container-item-money">
          {VND.format(payPrice)}
        </div>

        {payMode && <div className="l-0">Số lượng: {quantity}</div>}
      </div>
      <div className="cart__content--container-item-quantity display__flex--center l-2 m-0 s-0">
        <div className="cart__content--quantity-wrapper display__flex--center">
          {!payMode && (
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
          )}

          <div className="cart__content--quantity-value">{quantity}</div>

          {!payMode && (
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
          )}
        </div>
      </div>

      <div className="cart__content--container-item-money display__flex--center c-2 m-1 s-0">
        {VND.format(payPrice)}
      </div>

      {!payMode && (
        <div
          className="cart__content--container-item-trash display__flex--center c-2 m-1 s-1"
          onClick={() => handleDelete()}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      )}
    </>
  );
};

export default CartItem;
