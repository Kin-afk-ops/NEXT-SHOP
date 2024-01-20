import BookPagination from "@/components/pagination/bookPagination/BookPagination";
import Filter from "../../../components/filter/Filter";
import List from "../../../components/list/List";
import axiosInstance from "../../../config";

const ListPage = async ({ params, searchParams }) => {
  const type = params.slug.split(".")[0];
  const currentPage = searchParams.trang;

  let books = {};
  let totalPage = 0;

  switch (type) {
    case "sach-moi-cua-cua-hang":
      const res = await axiosInstance.get(
        `/book?qNew=${true}&qPage=${currentPage}`
      );
      books = {
        title: "Sách mới của cửa hàng",
        data: await res.data.books,
      };
      totalPage = await res.data.totalPage;

      break;

    default:
      console.log("haha");
      break;
  }

  // const res = await axiosInstance.get("/book");
  // const books = {
  //   title: "Danh sach",
  //   data: await res.data,
  // };

  return (
    <div className="row">
      <div className="col c-3">
        <Filter />
      </div>
      <div className="col c-9">
        <List books={books} />

        <BookPagination
          currentPage={currentPage}
          totalPage={totalPage}
          path={`danh-sach/${type}`}
        />
      </div>
    </div>
  );
};

export default ListPage;
