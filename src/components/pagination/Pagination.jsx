"use client";

import "./pagination.css";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";

const Pagination = () => {
  const router = useRouter();
  //   {
  //     totalPage,
  //     path,
  //     currentPage,
  //     category,
  //     country,
  //     search,
  //   }

  const currentPage = 2;

  const handlePageClick = (data) => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });

    if (category || country || search) {
      router.push(
        `/danh-sach/${path}?${type}=${query}&page=${data.selected + 1}`
      );
    } else {
      router.push(`/danh-sach/${path}?page=${data.selected + 1}`);
    }
  };

  return (
    <div>
      <div className="pagination">
        <ReactPaginate
          onPageChange={handlePageClick}
          className="paginationPage"
          previousLabel="<"
          nextLabel=">"
          breakLabel={"..."}
          pageCount={10}
          marginPagesDisplayed={2}
          forcePage={parseInt(currentPage) - 1}
          previousClassName="prev"
          nextClassName="next"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Pagination;
