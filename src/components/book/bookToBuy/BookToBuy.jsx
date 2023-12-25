"use client";
import { useState } from "react";

import "./bookToBuy.css";

const BookToBuy = () => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleReduce = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="product__buy main__container row">
      <div className="col c-5 product__buy--left">
        <div className="product__buy--img">
          {/* <img :src="bookData.image.path" alt="" /> */}
        </div>

        <div className="product__buy--btn">
          <button className="product__buy--btn-add">
            <i className="fa-solid fa-cart-plus"></i>Thêm vào giỏ hàng
          </button>

          <button className="product__buy--btn-buy ">Mua ngay</button>
        </div>
      </div>
      <div className="col c-7 product__buy--right">
        <h1 className="product__buy--title">Haha</h1>
        <div className="row no-gutters product__buy--content">
          <div className="col c-6 product__buy--content-left">
            <p>
              Nhà cung cấp: <b>Haha</b>
            </p>
            <p>
              Nhà xuất bản: <b>Haha</b>
            </p>

            <div className="product__buy--price">
              <span className="product__buy--price-buy">Haha đ</span>
              <span className="product__buy--price-cost">Haha </span>
              <span className="product__buy--price-percent">-Haha </span>
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
              Tác giả: <b>Haha</b>
            </p>
            <p>
              Hình thức bìa: <b>Haha</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookToBuy;
