import BookToBuy from "../../../components/book/bookToBuy/BookToBuy";
import BookInfo from "../../../components/book/bookInfo/BookInfo";
import BookDesc from "../../../components/book/bookDesc/BookDesc";
import BookEvaluate from "../../../components/book/bookEvaluate/BookEvaluate";

const bookPage = () => {
  return (
    <div class="product grid wide">
      <BookToBuy />
      <BookInfo />
      <BookDesc />
      <BookEvaluate />
    </div>
  );
};

export default bookPage;
