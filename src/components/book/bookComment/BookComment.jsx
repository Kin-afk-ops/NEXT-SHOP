import BookCommentItem from "./BookCommentItem";
import "./bookComment.css";

const BookComment = () => {
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
          <BookCommentItem />
          <hr />
        </ul>
      </div>
    </div>
  );
};

export default BookComment;
