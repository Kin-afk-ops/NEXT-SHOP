"use client";

import "../pagination.css";
import ReactPaginate from "react-paginate";

const CommentPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
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
          pageCount={totalPages}
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

export default CommentPagination;
