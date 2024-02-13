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
  const [checkRefresh, setCheckRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getComment = async () => {
      if (checkRefresh) {
        const res = await axiosInstance.get(
          `/commentBook/find/${bookId}?q=${mode}&qPage=${currentPage}`
        );

        setComments(res.data.comments);
        setTotalPage(res.data.totalPage);
        setCheckRefresh(false);
      }
    };

    getComment();
  }, [mode, currentPage, checkRefresh]);

  return (
    <div className="product__comment main__container">
      <div className="product__comment--wrap">
        <ul className="product__comment--list">
          <div className="product__comment--nav--wrap">
            <div className="product__comment--nav">
              <button
                className={mode === "new" ? "comment__active" : ""}
                onClick={() => {
                  setMode("new");
                  setCheckRefresh(true);
                }}
              >
                Mới nhất
              </button>

              <button
                className={mode === "like" ? "comment__active" : ""}
                onClick={() => {
                  setMode("like");
                  setCheckRefresh(true);
                }}
              >
                Yêu thích nhất
              </button>
            </div>
          </div>

          {comments &&
            comments?.map((comment, index) => (
              <div key={comment._id}>
                <ToastProvider>
                  <BookCommentItem
                    bookId={bookId}
                    comment={comment}
                    setCheckRefresh={setCheckRefresh}
                  />
                </ToastProvider>
              </div>
            ))}

          <hr />
        </ul>
      </div>

      {comments.length !== 0 && (
        <CommentPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPage}
        />
      )}
    </div>
  );
};

export default BookComment;
