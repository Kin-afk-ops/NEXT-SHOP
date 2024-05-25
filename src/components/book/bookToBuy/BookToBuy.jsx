"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { increaseCart } from "../../../lib/features/cart/cartLengthSlice";

import "./bookToBuy.css";
import "./responsive.css";
import VND from "../../../vnd";
import { useSelector } from "react-redux";
import axiosInstance from "@/config";

const BookToBuy = ({ book, publisher, supplier, auth, form }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const router = useRouter();

  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleReduce = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleBuy = async () => {
    const currentPrice = book?.price - (book?.price * book?.discount) / 100;

    const newCart = {
      userId: user._id,
      books: {
        bookId: book?._id,
        name: book?.name,
        image: book?.image.path,
        price: book?.price,
        discountPrice: currentPrice,
        quantity: count,
        maxQuantity: book?.quantity,
      },
      check: true,
    };

    try {
      const res = await axiosInstance.post(`cart`, newCart);
      dispatch(increaseCart());
      router.push(`/thanh-toan/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = async () => {
    const currentPrice = book?.price - (book?.price * book?.discount) / 100;

    const newCart = {
      userId: user._id,
      books: {
        bookId: book?._id,
        name: book?.name,
        image: book?.image.path,
        price: book?.price,
        discountPrice: currentPrice,
        quantity: count,
        maxQuantity: book?.quantity,
      },
      check: false,
    };

    try {
      const res = await axiosInstance.post(`/cart`, newCart);
      dispatch(increaseCart());
      router.push(`/gio-hang/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product__buy main__container row">
      <div className="col c-5 product__buy--left">
        <div className="product__buy--img">
          <Image
            src={book?.image.path}
            alt={book?.name}
            width={388}
            height={388}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <div className="product__buy--btn">
          <button className="product__buy--btn-add" onClick={handleAddCart}>
            <i className="fa-solid fa-cart-plus"></i>
            <span className="m-0">Thêm vào giỏ hàng</span>
          </button>

          <button className="product__buy--btn-buy " onClick={handleBuy}>
            Mua ngay
          </button>
        </div>
      </div>
      <div className="col c-7 product__buy--right">
        <h1 className="product__buy--title">{book?.name}</h1>
        <div className="row no-gutters product__buy--content">
          <div className="col c-6 product__buy--content-left">
            <p>
              Nhà cung cấp: <b>{supplier}</b>
            </p>
            <p>
              Nhà xuất bản: <b>{publisher}</b>
            </p>

            <div className="product__buy--price">
              <span className="product__buy--price-buy">
                {VND.format(book?.price - (book?.price * book?.discount) / 100)}
              </span>
              <span className="product__buy--price-cost">
                {VND.format(book?.price)}
              </span>
              <span className="product__buy--price-percent">
                -{book.discount}&nbsp;%
              </span>
            </div>

            <div className="product__buy--policy row">
              <div className="c-6">
                <p>Thời gian giao hàng:</p>
                <p>Chính sách đổi trả:</p>
              </div>
              <div className="product__buy--policy-left c-6">
                <p>Xem chính sách vận chuyển</p>
                <p>Xem chính sách đổi trả</p>
              </div>
            </div>

            <div className="product__buy--quality row">
              <span className="col c-6">Số lượng: </span>
              <div className="product__buy--quality-block col c-6">
                <div
                  className="product__buy--quality-reduce"
                  onClick={handleReduce}
                >
                  -
                </div>
                <input
                  className="product__buy--quality-value"
                  type="text"
                  value={count}
                  onChange={() => console.log(count)}
                />
                <div
                  className="product__buy--quality-increase"
                  onClick={handleIncrease}
                >
                  +
                </div>
              </div>
            </div>
          </div>

          <div className="col c-6 product__buy--content-right">
            <p>
              Tác giả: <b>{auth}</b>
            </p>
            <p>
              Hình thức bìa: <b>{form}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookToBuy;
