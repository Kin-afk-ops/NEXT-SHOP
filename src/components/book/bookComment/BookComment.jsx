"use client";

import { useEffect, useState } from "react";
import BookCommentItem from "./BookCommentItem";
import "./bookComment.css";
import axiosInstance from "@/config";
import CommentPagination from "@/components/pagination/commentPagination/CommentPagination";
import ToastProvider from "@/toast/ToastProvider";

const BookComment = ({ bookId }) => {
  const [mode, setMode] = useState("new");
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getComment = async () => {
      const res = await axiosInstance.get(
        `/commentBook/find/${bookId}?q=${mode}&qPage=${currentPage}`
      );

      setComments(res.data.comments);
      setTotalPage(res.data.totalPage);
      console.log(res.data.comments);
    };

    getComment();
  }, [mode, currentPage]);

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
              <div key={comment._id}>
                <ToastProvider>
                  <BookCommentItem bookId={bookId} comment={comment} />
                </ToastProvider>
              </div>
            ))}

          <hr />
        </ul>
      </div>

      <CommentPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPage}
      />
    </div>
  );
};

export default BookComment;
