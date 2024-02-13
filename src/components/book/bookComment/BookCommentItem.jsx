"use client";

import { useRouter } from "next/navigation";

import axiosInstance from "@/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BookCommentItem = ({ bookId, comment, setCheckRefresh }) => {
  const router = useRouter();

  const [check, setCheck] = useState(false);
  const [commentCheck, setCommentCheck] = useState(false);

  const [likeTotal, setLikeTotal] = useState(comment.like.value);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const likeChecker = () => {
      comment.like.userId.forEach((u) => {
        if (u === user._id) {
          return setCheck(true);
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
    setCheck(true);
    setLikeTotal((likeCount) => likeCount + 1);

    let userIdArray = [];

    if (comment.like.userId !== 0) {
      userIdArray = comment.like.userId;
    }

    userIdArray.push(user?._id);

    const newBookComments = {
      name: comment.name,
      star: comment.star,
      content: comment.content,
      like: {
        value: comment.like.value + 1,
        userId: userIdArray,
      },
    };

    try {
      const res = await axiosInstance.put(
        `/commentBook/${comment._id}`,
        newBookComments
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    setCheck(false);
    setLikeTotal((likeCount) => likeCount - 1);

    let userIdArray = [];

    if (comment.like.userId !== 0) {
      const new_arr = comment.like.userId.filter((c) => c !== user._id);

      userIdArray = new_arr;
    }

    let likeValue;

    if (comment.like.value - 1 < 0) {
      likeValue = 0;
    } else {
      likeValue = comment.like.value - 1;
    }

    const newBookComments = {
      name: comment.name,
      star: comment.star,
      content: comment.content,
      like: {
        value: likeValue,
        userId: userIdArray,
      },
    };

    try {
      const res = await axiosInstance.put(
        `/commentBook/${comment._id}`,
        newBookComments
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = async () => {
    const newReport = {
      type: "Comment",
      content: "Bình luận có vấn đề!",
    };

    try {
      const res = await axiosInstance.post(`/request/${user._id}`, newReport);
      toast.success("Đã gửi báo cáo bình luận này!");
    } catch (error) {
      toast.error("Không gửi được báo cáo bình luận này!");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/commentBook/${comment._id}`);
      setCheckRefresh(true);
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
          {check ? (
            <>
              <i className="fa-regular fa-thumbs-up product__comment--icon-active"></i>
              <span
                className="product__comment--icon-span-active"
                onClick={handleDislike}
              >
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
          <i className="fa-solid fa-circle-exclamation product__comment--icon"></i>
          <span
            className="product__comment--icon-report"
            onClick={handleReport}
          >
            Báo cáo
          </span>

          {comment.userId === user._id && (
            <i className="fa-solid fa-trash product__comment--icon"></i>
          )}

          {comment.userId === user._id && (
            <span
              className="product__comment--icon-report "
              onClick={handleDelete}
            >
              Xoá bình luận
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default BookCommentItem;
