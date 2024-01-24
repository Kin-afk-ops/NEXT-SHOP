import ListItem from "../listItem/ListItem";
import "./list.css";

const List = ({ books }) => {
  return (
    <div className="list main__container">
      <div className="list__title">
        <h2 className="main__title">{books.title}</h2>
      </div>
      <hr />

      <div className="row list__container">
        {books?.data.map((book, index) => (
          <div className="col c-3" key={index}>
            <ListItem book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
