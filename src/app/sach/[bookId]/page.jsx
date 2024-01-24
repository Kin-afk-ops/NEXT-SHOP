import BookToBuy from "../../../components/book/bookToBuy/BookToBuy";
import BookInfo from "../../../components/book/bookInfo/BookInfo";
import BookDesc from "../../../components/book/bookDesc/BookDesc";
import BookEvaluate from "../../../components/book/bookEvaluate/BookEvaluate";
import axiosInstance from "../../../config";
import BookComment from "@/components/book/bookComment/BookComment";
import ToastProvider from "@/toast/ToastProvider";

const bookPage = async ({ params }) => {
  const bookSlug = params.bookId.split(".")[0];

  const res = await axiosInstance.get(`/book/slug/${bookSlug}`);
  const resInfo = await axiosInstance.get(`/infoBook/${res.data._id}`);

  return (
    <div className="product grid wide">
      <BookToBuy
        book={res.data}
        publisher={resInfo.data.infoBook.publisher}
        supplier={resInfo.data.infoBook.supplier}
        auth={resInfo.data.infoBook.auth}
        form={resInfo.data.infoBook.form}
      />
      <BookInfo infoBook={resInfo.data} />
      <BookDesc bookDesc={resInfo.data.infoBook.desc} />
      <ToastProvider>
        <BookEvaluate bookId={res.data._id} />
      </ToastProvider>

      <BookComment bookId={res.data._id} />
    </div>
  );
};

export default bookPage;
