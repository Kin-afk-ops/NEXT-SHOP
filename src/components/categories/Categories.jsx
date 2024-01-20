import Image from "next/image";
import Link from "next/link";

import axiosInstance from "../../config";
import "./categories.css";

const Categories = async () => {
  const res = await axiosInstance.get("/home/categories");

  const categories = await res.data;

  return (
    <div className="categories main__container">
      <h2 className="category__title main__title">
        <Image
          width={32}
          height={32}
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu_red.svg"
          alt="categories"
        />
        Những chủ đề mới
      </h2>
      <hr />
      <ul>
        {categories?.map((category, index) => (
          <li key={index}>
            {/* <Image className="categories__img" :src="cate.image.path" :alt="cate.path" /> */}
            <Image
              src={category.image.path}
              width={100}
              height={100}
              alt="categories"
            />
            <Link href="/" className="link">
              <p> {category.name}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="list__btn--wrap">
        <Link href="/danh-sach/abc" className="link  main__btn list__btn">
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default Categories;
