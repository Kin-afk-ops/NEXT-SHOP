import BookPagination from "@/components/pagination/bookPagination/BookPagination";
import Filter from "../../../components/filter/Filter";
import List from "../../../components/list/List";
import axiosInstance from "../../../config";
import "./page.css";

const ListPage = async ({ params, searchParams }) => {
  const type = params.slug.split(".")[0];
  const currentPage = searchParams.trang;
  const query = searchParams.q;
  const from = searchParams.from;
  const to = searchParams.tos;

  let books = {};
  let totalPage = 0;
  let res;

  if (type === "sach-moi-cua-cua-hang") {
    if (from && to) {
      res = await axiosInstance.get(
        `/book/fromTo?qPage=${currentPage}&qFrom=${from}&qTo=${to}`
      );
    } else {
      res = await axiosInstance.get(`/book?qNew=${true}&qPage=${currentPage}`);

      books = {
        title: "Sách mới của cửa hàng",
        data: res.data.books,
      };
    }
  } else {
    if (from && to) {
      res = await axiosInstance.get(
        `/book/fromTo?qCategory=${query}&qPage=${currentPage}&qFrom=${from}&qTo=${to}`
      );
    } else {
      res = await axiosInstance.get(
        `/book?qCategory=${query}&qPage=${currentPage}`
      );
    }

    books = {
      title: query,
      data: res.data.books,
    };
  }

  return (
    <div className="row">
      <div className="col c-3">
        <Filter type={type} query={query} currentPage={currentPage} />
      </div>
      <div className="col c-9">
        {books.data.length !== 0 ? (
          <List books={books} />
        ) : (
          <div className="no__books main__container">
            <p>Không có sản phẩm</p>
          </div>
        )}

        {/* <BookPagination
          currentPage={currentPage}
          totalPage={totalPage}
          path={`danh-sach/${type}`}
        /> */}
      </div>
    </div>
  );
};

export default ListPage;
