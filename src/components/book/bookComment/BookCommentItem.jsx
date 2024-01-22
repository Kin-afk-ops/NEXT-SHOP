"use client";

import { useRouter } from "next/navigation";

import axiosInstance from "@/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BookCommentItem = ({ bookId, comment }) => {
  const router = useRouter();

  const [likeCheck, setLikeCheck] = useState(false);
  const [likeTotal, setLikeTotal] = useState(comment.like.value);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const likeChecker = () => {
      comment.like.userId.forEach((u) => {
        if (u === user._id) {
          return setLikeCheck(true);
        }
      });
    };

    likeChecker();
  }, [user._id]);

  let starGrayArray = [];

  let starGoldArray = [];

  for (let i = 1; i <= comment?.star; i++) {
    starGoldArray.push(i);
  }

  for (let i = 1; i <= 5 - comment?.star; i++) {
    starGrayArray.push(i);
  }

  const handleLike = async () => {
    setLikeCheck(true);
    setLikeTotal((likeCount) => likeCount + 1);

    let userIdArray = [];

    if (comment.userId) {
      userIdArray = comment.userId;
    }

    userIdArray.push(user._id);

    const newBookComments = {
      name: comment.name,
      star: comment.star,
      content: comment.content,
      like: {
        value: comment.like.value + 1,
        userId: userIdArray,
      },
    };

    const res = await axiosInstance.put(
      `/commentBook/${comment._id}`,
      newBookComments
    );

    try {
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="product__comment--item row no-gutters">
      <div className="col c-2">
        <p className="product__comment--name">{comment?.name}</p>
        {/* <p className="product__comment--date">{bookComment.createdAt}</p> */}
      </div>

      <div className="col c-10">
        <div className="product__comment--star">
          <div>
            {starGoldArray.map((star, i) => (
              <i
                className="fa-solid fa-star"
                style={{
                  color: "#f6a500",
                }}
                key={i}
              ></i>
            ))}

            {starGrayArray.map((star, i) => (
              <i className="fa-solid fa-star" key={i}></i>
            ))}
          </div>
        </div>
        <p className="product__comment--content">{comment?.content}</p>
        <div className="product__comment--icons">
          {likeCheck ? (
            <>
              <i className="fa-regular fa-thumbs-up product__comment--icon-active"></i>
              <span className="product__comment--icon-span-active">
                thích({likeTotal})
              </span>
            </>
          ) : (
            <>
              <i className="fa-regular fa-thumbs-up product__comment--icon"></i>
              <span
                className="product__comment--icon-span"
                onClick={handleLike}
              >
                thích({likeTotal})
              </span>
            </>
          )}
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="product__comment--icon-report">Báo cáo</span>
        </div>
      </div>
    </li>
  );
};

export default BookCommentItem;
