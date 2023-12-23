import BookToBuy from "../../../components/book/bookToBuy/BookToBuy";
import BookInfo from "../../../components/book/bookInfo/BookInfo";
import BookDesc from "../../../components/book/bookDesc/BookDesc";

const bookPage = () => {
  return (
    <div class="product grid wide">
      <BookToBuy />
      <BookInfo />
      <BookDesc />
    </div>
  );
};

export default bookPage;
