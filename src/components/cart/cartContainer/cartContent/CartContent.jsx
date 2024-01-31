"use client";

import { useState } from "react";
import CartDelete from "./CartDelete";
import CartItem from "./CartItem";
import "./cartContent.css";

const CartContent = ({ cart, setTotalPrice, payMode }) => {
  // const [checkAll, setCheckAll] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  return (
    <div className="cart__content main__container">
      <div className="cart__content--title main__title row no-gutters">
        {/* <input
          type="checkbox"
          className="c-1"
          onChange={() => setCheckAll(!checkAll)}
        />
        <p className="c-5">Chọn tất cả sản phẩm</p> */}
        <p className="c-6"></p>
        <p className="c-2 display__flex--center">Số lượng</p>
        <p className="c-2 display__flex--center">Thành tiền</p>
      </div>
      <hr />

      <div className="cart__content--container">
        <ul className="cart__content--container-list">
          {cart.length !== 0 &&
            cart?.map((c, index) => (
              <li
                className="cart__content--container-item row no-gutters"
                key={c.id}
              >
                <CartItem
                  cartItem={c}
                  payMode={payMode}
                  // checkAll={checkAll}
                  setDeleteDisplay={setDeleteDisplay}
                  setDeleteId={setDeleteId}
                  setTotalPrice={setTotalPrice}
                />
              </li>
            ))}
        </ul>
      </div>

      <CartDelete
        deleteDisplay={deleteDisplay}
        setDeleteDisplay={setDeleteDisplay}
        deleteId={deleteId}
      />
    </div>
  );
};

export default CartContent;
