import ListItem from "../listItem/ListItem";
import BookPagination from "../../components/pagination/bookPagination/BookPagination";
import "./list.css";

const List = ({ books }) => {
  return (
    <div className="list main__container">
      <div className="list__title">
        <h2 className="main__title">{books.title}</h2>
        <p>Sắp xếp theo:</p>
        <select>
          <option value="new">Mới nhất</option>
          <option value="bestSale">Bán chạy trong tháng</option>
          <option value="price">Giá bán</option>
          <option value="discount">Giảm giá</option>
        </select>
      </div>
      <hr />

      <div className="row list__container">
        {books?.data.map((book, index) => (
          <div className="col c-3" key={index}>
            <ListItem book={book} />
          </div>
        ))}
      </div>

      <BookPagination />
    </div>
  );
};

export default List;
