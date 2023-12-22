import Link from "next/link";
import "./homeList.css";
import ListItem from "../listItem/ListItem";

const HomeList = ({ books }) => {
  return (
    <div className="list main__container">
      <h2 className="list__title main__title">{books.title}</h2>
      <hr />

      <div className="row list__container">
        {books?.data.map((book, index) => (
          <div className="col l-2-4" key={index}>
            <ListItem book={book} />
          </div>
        ))}
      </div>

      <div className="list__btn">
        <Link href="/" className="link">
          <button>Xem thêm</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeList;
