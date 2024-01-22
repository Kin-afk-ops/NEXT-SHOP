"use client";

import { useEffect, useState } from "react";
import BookCommentItem from "./BookCommentItem";
import "./bookComment.css";
import axiosInstance from "@/config";

const BookComment = ({ bookId }) => {
  const [mode, setMode] = useState("new");
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getComment = async () => {
      const res = await axiosInstance.get(
        `/commentBook/find/${bookId}?q=${mode}`
      );

      setComments(res.data.comments);
      setTotalPage(res.data.totalPage);
    };

    getComment();
  }, [mode]);

  return (
    <div className="product__comment main__container">
      <div className="product__comment--wrap">
        <ul className="product__comment--list">
          <div className="product__comment--nav--wrap">
            <div className="product__comment--nav">
              <div className="comment__active">Mới nhất</div>

              <div>Yêu thích nhất</div>
            </div>
          </div>

          {comments &&
            comments?.map((comment, index) => (
              <BookCommentItem
                key={comment._id}
                bookId={bookId}
                comment={comment}
              />
            ))}

          <hr />
        </ul>
      </div>
    </div>
  );
};

export default BookComment;
