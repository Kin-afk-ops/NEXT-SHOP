import Filter from "../../../components/filter/Filter";
import List from "../../../components/list/List";
import axiosInstance from "../../../config";

const ListPage = async () => {
  const res = await axiosInstance.get("/book");
  const books = {
    title: "Danh sach",
    data: await res.data,
  };

  return (
    <div className="row">
      <div className="col c-3">
        <Filter />
      </div>
      <div className="col c-9">
        {" "}
        <List books={books} />
      </div>
    </div>
  );
};

export default ListPage;
