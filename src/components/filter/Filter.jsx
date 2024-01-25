"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import axiosInstance from "../../config";
import { useRouter } from "next/navigation";
import "./filter.css";

const Filter = ({ query, categories }) => {
  const router = useRouter();

  const [selected, setSelected] = useState(null);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

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

  const createQuery = (query) => {
    if (query !== "") return query.split(" ").join("+");
  };

  const handleChangeCategory = (name) => {
    setSelected(null);
    const queryItem = {
      q: createQuery(name),
      from: "",
      to: "",
    };

    handleChangePage(queryItem);
  };

  const handleCheck = (priceItem, index) => {
    setSelected((prev) => (index === prev ? null : index));

    if (index === selected) {
      router.push(`/danh-sach/danh-muc.html?q=${createQuery(query)}&trang=1`);
    } else {
      let temp;

      if (priceItem.to === "Trở lên") {
        temp = priceItem.to.toLowerCase().split(" ").join("+");
      } else {
        temp = priceItem.to;
      }
      const queryItem = {
        q: query,
        from: priceItem.from,
        to: temp,
      };
      handleChangePage(queryItem);
    }
  };

  const handleChangePage = (query) => {
    if (query.from !== "" && query.to !== "") {
      router.push(
        `/danh-sach/danh-muc.html?q=${createQuery(query.q)}&from=${
          query.from
        }&to=${query.to}&trang=1`
      );
    } else {
      router.push(`/danh-sach/danh-muc.html?q=${createQuery(query.q)}&trang=1`);
    }
  };

  return (
    <div className="filer main__container">
      <div className="filer__list">
        <div className="filer__list--item">
          <h2>Danh mục sách</h2>
          <ul>
            <Link
              href={`/danh-sach/danh-muc.html?q=${createQuery(
                "Sách mới của cửa hàng"
              )}&trang=1`}
              className="link"
            >
              <li className={query === "Sách mới của cửa hàng" ? "active" : ""}>
                Sách mới của cửa hàng
              </li>
            </Link>

            <Link
              href={`/danh-sach/danh-muc.html?q=${createQuery(
                "Giảm giá siêu ưu đãi"
              )}&trang=1`}
              className="link"
            >
              <li className={query === "Giảm giá siêu ưu đãi" ? "active" : ""}>
                Giảm giá siêu ưu đãi
              </li>
            </Link>

            {categories?.map((category, index) => (
              <li
                key={category._id}
                onClick={() => handleChangeCategory(category.name)}
                className={query === category.name ? "active" : ""}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="filer__list--item">
          <h2>Giá</h2>
          <ul>
            {price.map((priceItem, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="priceCheck"
                  id={index}
                  checked={index === selected}
                  onChange={() => handleCheck(priceItem, index)}
                />
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
                <input type="radio" name="formItem" id={formItem} />
                <label htmlFor={formItem} className="filer__list--item-li">
                  {formItem}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filter;
