import Categories from "@/components/categories/Categories";
import HomeList from "@/components/homeList/HomeList";
import Slide from "@/components/slide/Slide";
import axiosInstance from "../config";

export default async function Home() {
  const res = await axiosInstance.get("/home/book");
  const books = {
    title: "Tất cả sách",
    data: await res.data,
  };
  return (
    <div>
      <Slide />
      <Categories />
      <HomeList books={books} />
    </div>
  );
}
