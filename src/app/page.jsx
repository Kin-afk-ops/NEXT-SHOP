import Categories from "@/components/categories/Categories";
import HomeList from "@/components/homeList/HomeList";
import Slide from "@/components/slide/Slide";
import axiosInstance from "../config";
import Loading from "@/components/loading/Loading";

export default async function Home() {
  const resNewBook = await axiosInstance.get(`/home/book`);
  const resBook1 = await axiosInstance.get(`/home/book?qSale=${true}`);
  const resBook2 = await axiosInstance.get(
    `/home/book/cate?qCategories=${"Phật giáo"}`
  );

  const newBooks = {
    title: "Sách mới của cửa hàng",
    data: await resNewBook.data,
  };

  const cateBook1 = {
    title: "Giảm giá siêu ưu đãi",
    data: await resBook1.data,
  };

  const cateBook2 = {
    title: "Phật giáo",
    data: await resBook1.data,
  };
  return (
    <div>
      {/* <Slide /> */}
      <Categories />
      <HomeList books={newBooks} />
      <HomeList books={cateBook1} />
      <HomeList books={cateBook2} />
    </div>
  );
}
