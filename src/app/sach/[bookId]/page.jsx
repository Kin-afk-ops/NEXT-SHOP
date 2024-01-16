import BookToBuy from "../../../components/book/bookToBuy/BookToBuy";
import BookInfo from "../../../components/book/bookInfo/BookInfo";
import BookDesc from "../../../components/book/bookDesc/BookDesc";
import BookEvaluate from "../../../components/book/bookEvaluate/BookEvaluate";
import axiosInstance from "../../../config";

const bookPage = async ({ params }) => {
  const bookSlug = params.bookId.split(".")[0];

  const res = await axiosInstance.get(`/book/slug/${bookSlug}`);
  const resInfo = await axiosInstance.get(`/infoBook/${res.data._id}`);

  return (
    <div class="product grid wide">
      <BookToBuy
        book={res.data}
        publisher={resInfo.data.infoBook.publisher}
        supplier={resInfo.data.infoBook.supplier}
        auth={resInfo.data.infoBook.auth}
        form={resInfo.data.infoBook.form}
      />
      <BookInfo infoBook={resInfo.data} />
      <BookDesc bookDesc={resInfo.data.infoBook.desc} />
      <BookEvaluate />
    </div>
  );
};

export default bookPage;
