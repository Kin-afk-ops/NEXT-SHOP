import Image from "next/image";
import Link from "next/link";

import axiosInstance from "../../config";
import "./categories.css";
import "./responsive.css";

const Categories = async () => {
  const res = await axiosInstance.get("/home/categories");

  const categories = await res.data;

  const createQuery = (query) => {
    if (query !== "") return query.split(" ").join("+");
  };

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
          <Link
            href={`/danh-sach/danh-muc.html?q=${createQuery(
              category.name
            )}&trang=1`}
            key={category._id}
            className="link"
          >
            <li>
              <Image
                src={category.image.path}
                width={100}
                height={100}
                alt="categories"
              />

              <p> {category.name}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div className="list__btn--wrap">
        <Link
          href={`/danh-sach/danh-muc.html?q=${createQuery(
            "Sách mới của cửa hàng"
          )}&trang=1`}
          className="link  main__btn list__btn"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default Categories;
