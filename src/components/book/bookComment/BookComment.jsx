import BookCommentItem from "./BookCommentItem";
import "./bookComment.css";

const BookComment = ({ bookComments }) => {
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

          {bookComments &&
            bookComments?.map((bookComment, index) => (
              <BookCommentItem
                key={bookComment._id}
                bookComment={bookComment}
              />
            ))}

          <hr />
        </ul>
      </div>
    </div>
  );
};

export default BookComment;
