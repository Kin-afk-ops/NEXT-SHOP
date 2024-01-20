"use client";

import { useState } from "react";
import "./bookDesc.css";

const BookDesc = ({ bookDesc }) => {
  const [btnContent, setBtnContent] = useState("Xem thêm");

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    !active ? setBtnContent("Thu gọn") : setBtnContent("Xem thêm");
  };

  return (
    <div className="product__desc main__container">
      <div
        className={
          active ? "product__desc--content-active" : "product__desc--content"
        }
        dangerouslySetInnerHTML={{ __html: bookDesc }}
      ></div>

      <div className="product__desc--btn">
        <button className="main__btn" onClick={handleClick}>
          {btnContent}
        </button>
      </div>
    </div>
  );
};

export default BookDesc;
