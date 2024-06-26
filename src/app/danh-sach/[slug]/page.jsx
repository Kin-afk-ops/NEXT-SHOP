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
  const to = searchParams.to;
  const form = searchParams.form;

  let books = {};
  let totalPage = 0;
  let res;

  const resCategories = await axiosInstance.get("/category");

  if (type === "danh-muc") {
    if (query === "Sách mới của cửa hàng") {
      if (from && to) {
        res = await axiosInstance.get(
          `/book/filter?qPage=${currentPage}&qFrom=${from}&qTo=${to}`
        );

        if (form) {
          res.data.books = res.data.books.filter((d) => d.form === form);
        }
      } else {
        res = await axiosInstance.get(
          `/book?qNew=${true}&qPage=${currentPage}`
        );

        if (form) {
          res.data.books = res.data.books.filter((d) => d.form === form);
        }
      }
      books = {
        title: "Sách mới của cửa hàng",
        data: res.data.books,
      };

      totalPage = res.data.totalPage;
    } else if (query === "Giảm giá siêu ưu đãi") {
      if (from && to) {
        res = await axiosInstance.get(
          `/book/filter?qSale=${true}&qPage=${currentPage}&qFrom=${from}&qTo=${to}`
        );

        if (form) {
          res.data.books = res.data.books.filter((d) => d.form === form);
        }
      } else {
        res = await axiosInstance.get(
          `/book?qSale=${true}&qPage=${currentPage}`
        );

        if (form) {
          res.data.books = res.data.books.filter((d) => d.form === form);
        }
      }

      books = {
        title: "Giảm giá siêu ưu đãi",
        data: res.data.books,
      };
      totalPage = res.data.totalPage;
    } else {
      if (from && to) {
        res = await axiosInstance.get(
          `/book/filter?qCategory=${query}&qPage=${currentPage}&qFrom=${from}&qTo=${to}`
        );

        if (form) {
          res.data.books = res.data.books.filter((d) => d.form === form);
        }
      } else {
        res = await axiosInstance.get(
          `/book?qCategory=${query}&qPage=${currentPage}`
        );

        if (form) {
          res.data.books = res.data.books.filter((d) => d.form === form);
        }
      }

      books = {
        title: query,
        data: res.data.books,
      };
      totalPage = res.data.totalPage;
    }
  } else if (type === "tim-kiem") {
    if (from && to) {
      res = await axiosInstance.get(
        `search/book/filter?qPage=${currentPage}&qFrom=${from}&qTo=${to}&search=${query}`
      );
    } else {
      res = await axiosInstance.get(
        `/search/book?&qPage=${currentPage}&search=${query}`
      );
    }
    books = {
      title: `Kết quả của "${query}"`,
      data: res.data.books,
    };

    totalPage = res.data.totalPage;
  } else {
    console.log(type);
  }

  return (
    <div className="row">
      <div className="col l-3 m-3 s-12">
        <Filter query={query} categories={resCategories.data} type={type} />
      </div>
      <div className="col l-9 m-9 s-12">
        {books.data.length !== 0 ? (
          <List books={books} form={form} />
        ) : (
          <div className="no__books main__container">
            <p>Không có sản phẩm</p>
          </div>
        )}

        {books.data.length !== 0 && (
          <BookPagination
            currentPage={currentPage}
            totalPage={totalPage}
            path={`danh-sach/${type}`}
          />
        )}
      </div>
    </div>
  );
};

export default ListPage;
