"use client";

import axiosInstance from "@/config";
import BookComment from "../bookComment/BookComment";
import "./bookEvaluate.css";

import { useState } from "react";

const BookEvaluate = ({ bookId, bookComments }) => {
  const [display, setDisplay] = useState(false);
  const [noName, setNoName] = useState(false);
  const [radioValue, setRadioValue] = useState(0);
  const [commentName, setCommentName] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const cancelForm = (e) => {
    e.preventDefault();
    setDisplay(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (noName) {
      setCommentName("Bình luận ẩn danh");
    }
    const newComment = {
      name: commentName,
      star: radioValue,
      content: commentValue,
    };

    const res = await axiosInstance.put(
      `/infoBook/comment/${bookId}`,
      newComment
    );

    try {
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product__evaluate main__container">
      <h2 className="main__title">Đánh giá sách</h2>
      <div className="row no-gutters product__evaluate--content">
        <div className="col c-6 product__evaluate--left">
          <div>
            <span className="product__evaluate--big product__evaluate--number">
              0
            </span>
            <span className="product__evaluate--number">/5</span>
          </div>

          <div className="product__evaluate--star">
            <div>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <span>(0 đánh giá)</span>
          </div>
        </div>
        <div className="col c-6 product__evaluate--right">
          <button className="main__btn" onClick={() => setDisplay(true)}>
            <i className="fa-solid fa-pen"></i>Viết đánh giá
          </button>
        </div>

        <BookComment />
      </div>

      <div className={display ? "product__modal main__container" : "hidden"}>
        <h5 className="product__modal--title main__title">
          Viết đánh giá sách
        </h5>
        <div className="product__modal--container">
          <div className="rating">
            <input
              className="rating__input"
              type="radio"
              name="rate"
              id="rate-5"
              value={5}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <label htmlFor="rate-5"> </label>
            <input
              className="rating__input"
              type="radio"
              name="rate"
              id="rate-4"
              value={4}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <label for="rate-4"> </label>
            <input
              className="rating__input"
              type="radio"
              name="rate"
              id="rate-3"
              value={3}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <label for="rate-3"> </label>
            <input
              className="rating__input"
              type="radio"
              name="rate"
              id="rate-2"
              value={2}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <label for="rate-2"> </label>
            <input
              className="rating__input"
              type="radio"
              name="rate"
              id="rate-1"
              value={1}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <label for="rate-1"> </label>
          </div>
          <form onSubmit={handleSubmit} className="product__modal--form">
            <div className="product__modal--name">
              <div className="product__modal--name-wrap">
                <input
                  type="text"
                  placeholder="Nhập tên sẽ hiển thị khi đánh giá"
                  className={noName ? "hidden" : ""}
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
                <div className={noName ? "no__name--input" : "hidden"}>
                  Đang ở chế độ ẩn danh
                </div>
              </div>

              <div className="product__modal--no-name">
                Đánh giá ẩn danh
                <div
                  className="product__modal--no-name-btn"
                  onClick={() => setNoName(!noName)}
                >
                  <div className={noName ? "no__name--active" : ""}></div>
                </div>
              </div>
            </div>

            <div className="product__modal--comment">
              <textarea
                placeholder="Nhập nhận xét của bạn về sản phẩm"
                name=""
                id=""
                cols="70"
                rows="10"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
            </div>

            <div className="product__modal--btn">
              <button
                className="product__modal--cancel main__btn"
                onClick={(e) => cancelForm(e)}
              >
                Huỷ
              </button>
              <button className="product__modal--send main__btn" type="submit">
                Gửi nhận xét
              </button>
            </div>
          </form>
        </div>

        <div
          className="product__modal--cancel-top"
          onClick={() => setDisplay(false)}
        >
          <i className="fa-regular fa-rectangle-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default BookEvaluate;
