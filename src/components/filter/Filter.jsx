"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import axiosInstance from "../../config";
import { useRouter } from "next/navigation";
import "./filter.css";

const Filter = ({ currentPage, query }) => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axiosInstance.get("/category");
      setCategories(res.data);
    };

    getCategories();
  }, []);

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
    const queryItem = {
      q: createQuery(name),
      from: "",
      to: "",
    };

    handleChangePage(queryItem);
  };

  const handleCheck = (priceItem) => {
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
  };

  const handleChangePage = (query) => {
    if (query.from !== "" && query.to !== "") {
      router.push(
        `/danh-sach/danh-muc.html?q=${createQuery(query.q)}&from=${
          query.from
        }&to=${query.to}&trang=${currentPage}`
      );
    } else {
      router.push(
        `/danh-sach/danh-muc.html?q=${createQuery(
          query.q
        )}&trang=${currentPage}`
      );
    }
  };

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

            {categories.length !== 0 &&
              categories?.map((category, index) => (
                <li
                  key={category._id}
                  onClick={() => handleChangeCategory(category.name)}
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
                  type="radio"
                  name="priceCheck"
                  id={index}
                  onChange={() => handleCheck(priceItem)}
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
