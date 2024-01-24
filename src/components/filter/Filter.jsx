import Link from "next/link";
import axiosInstance from "../../config";

import "./filter.css";

const Filter = async () => {
  const res = await axiosInstance.get("/category");

  const categories = await res.data;

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const createQuery = (query) => {
    if (query !== "") return query.split(" ").join("+");
  };

  const price = [
    {
      from: 0,
      to: 150000,
    },

    {
      from: 150000,
      to: 300000,
    },

    {
      from: 300000,
      to: 500000,
    },

    {
      from: 500000,
      to: 700000,
    },

    {
      from: 700000,
      to: "Trở lên",
    },
  ];

  const form = ["Bìa cứng", "Bìa mềm"];

  return (
    <div className="filer main__container">
      <div className="filer__list">
        <div className="filer__list--item">
          <h2>Danh mục sách</h2>
          <ul>
            <Link
              href="/danh-sach/sach-moi-cua-cua-hang.html?trang=1"
              className="link"
            >
              <li className="active">Sách mới</li>
            </Link>

            {categories?.map((category, index) => (
              <Link
                key={index}
                href={`/danh-sach/danh-muc.html?q=${createQuery(
                  category.name
                )}&trang=1`}
                className="link"
              >
                <li>{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="filer__list--item">
          <h2>Giá</h2>
          <ul>
            {price.map((priceItem, index) => (
              <li key={index}>
                <input type="checkbox" name="" id={index} />
                <label htmlFor={index} className="filer__list--item-li">
                  {VND.format(priceItem.from)}&nbsp;-&nbsp;
                  {priceItem.to === "Trở lên"
                    ? priceItem.to
                    : VND.format(priceItem.to)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="filer__list--item">
          <h2>Hình thức</h2>
          <ul>
            {form.map((formItem, index) => (
              <li key={index}>
                <input type="checkbox" name="" id="" />
                <span className="filer__list--item-li">{formItem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filter;
