import BookPagination from "@/components/pagination/bookPagination/BookPagination";
import Filter from "../../../components/filter/Filter";
import List from "../../../components/list/List";
import axiosInstance from "../../../config";

const ListPage = async ({ params, searchParams }) => {
  const type = params.slug.split(".")[0];
  const currentPage = searchParams.trang;
  const query = searchParams.q;

  let books = [];
  let totalPage = 0;
  let res;

  console.log(type);
  if (type === "sach-moi-cua-cua-hang") {
    res = await axiosInstance.get(`/book?qNew=${true}&qPage=${currentPage}`);

    books = {
      title: "Sách mới của cửa hàng",
      data: res.data.books,
    };
  } else {
    res = await axiosInstance.get(
      `/book?qCategory=${query}&qPage=${currentPage}`
    );

    books = {
      title: query,
      data: res.data.books,
    };
  }

  return (
    <div className="row">
      <div className="col c-3">
        <Filter />
      </div>
      <div className="col c-9">
        <List books={books} />

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
