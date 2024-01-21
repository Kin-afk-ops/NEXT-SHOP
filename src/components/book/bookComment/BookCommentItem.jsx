"use client";

import axiosInstance from "@/config";
import { useSelector } from "react-redux";

const BookCommentItem = ({ bookComment }) => {
  const user = useSelector((state) => state.user.currentUser);

  console.log(bookComment);

  let starGrayArray = [];

  let starGoldArray = [];

  for (let i = 1; i <= bookComment?.star; i++) {
    starGoldArray.push(i);
  }

  for (let i = 1; i <= 5 - bookComment?.star; i++) {
    starGrayArray.push(i);
  }

  const handleLike = async () => {
    let userIdArray = [];

    if (bookComment.userId) {
      userIdArray = bookComment.userId;
    }

    // userIdArray.push(user._id);
    console.log(userIdArray);

    const newBookComments = {
      name: bookComment.name,
      star: bookComment.star,
      content: bookComment.content,
      like: {
        value: bookComment.value++,
      },
    };

    const res = await axiosInstance.put(
      `/infoBook/comment/like/${bookComment._id}`,
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
        <p className="product__comment--name">{bookComment?.name}</p>
        {/* <p className="product__comment--date">{bookComment.createdAt}</p> */}
      </div>

      <div className="col c-10">
        <div className="product__comment--star">
          <div>
            {starGoldArray.map((star, i) => (
              <i
                className="fa-solid fa-star"
                style={{
                  color: "#f6a500 ",
                }}
                key={i}
              ></i>
            ))}

            {starGrayArray.map((star, i) => (
              <i className="fa-solid fa-star" key={i}></i>
            ))}
          </div>
        </div>
        <p className="product__comment--content">{bookComment?.content}</p>
        <div className="product__comment--icon">
          <i className="fa-regular fa-thumbs-up"></i>

          <span onClick={handleLike}>thích({bookComment?.like.value})</span>
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>Báo cáo</span>
        </div>
      </div>
    </li>
  );
};

export default BookCommentItem;
