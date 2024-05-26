"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import axiosInstance from "../../config";
import { useRouter, useSearchParams } from "next/navigation";
import "./filter.css";
import "./responsive.css";

const Filter = ({ query, categories, type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const qFrom = searchParams.get("from") ? searchParams.get("from") : "";

  const qTo = searchParams.get("to") ? searchParams.get("to") : "";
  const qForm = searchParams.get("form") ? searchParams.get("form") : "";
  const q = searchParams.get("q");

  const [selected, setSelected] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formItem, setFormItem] = useState("");
  const [filterMobile, setFilterMobile] = useState(false);

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

  useEffect(() => {
    const getPriceCheck = () => {
      if (qFrom !== "") {
        price.forEach((p, index) => {
          if (p.from === parseInt(qFrom)) {
            setSelected(index);
          }
        });
      }
      if (qForm !== "") {
        form.forEach((f, index) => {
          if (f === qForm) {
            setSelectedForm(index);
          }
        });
      }
    };

    getPriceCheck();
  }, [q]);

  const createQuery = (query) => {
    if (query !== "") return query.split(" ").join("+");
  };

  const handleChangeCategory = (name) => {
    setSelected(null);

    const temp = qTo === "trở lên" ? createQuery(qTo) : qTo;

    const queryItem = {
      q: name,
      from: qFrom,
      to: temp,
      item: formItem,
    };

    // console.log(queryItem);

    handleChangePage(queryItem, "danh-muc");
  };

  const handleCheck = (priceItem, index) => {
    setSelected((prev) => (index === prev ? null : index));

    if (index === selected) {
      if (formItem === "") {
        router.push(`/danh-sach/danh-muc.html?q=${createQuery(query)}&trang=1`);
      } else {
        router.push(
          `/danh-sach/danh-muc.html?q=${createQuery(
            query
          )}&trang=1&form=${formItem}`
        );
      }
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
        item: qForm,
      };

      handleChangePage(queryItem, type);
    }
  };

  const handleChangeForm = (item, index) => {
    setSelectedForm((prev) => (index === prev ? null : index));

    if (index === selectedForm) {
      setFormItem("");
      if (qFrom !== "" && qTo !== "") {
        router.push(
          `/danh-sach/danh-muc.html?q=${createQuery(
            query
          )}&from=${qFrom}&qTo=${qTo}&trang=1`
        );
      } else {
        router.push(`/danh-sach/danh-muc.html?q=${createQuery(query)}&trang=1`);
      }
    } else {
      setFormItem(item);
      const temp = qTo === "trở lên" ? createQuery(qTo) : qTo;

      const queryItem = {
        q: query,
        from: qFrom,
        to: temp,
        item,
      };
      handleChangePage(queryItem, type);
    }
  };

  const handleChangePage = (query, typeItem) => {
    // console.log(createQuery(query.q));

    if (query.from !== "" && query.to !== "") {
      if (query.item === "") {
        router.push(
          `/danh-sach/${typeItem}.html?q=${createQuery(query.q)}&from=${
            query.from
          }&to=${query.to}&trang=1`
        );
      } else {
        router.push(
          `/danh-sach/${typeItem}.html?q=${createQuery(query.q)}&from=${
            query.from
          }&to=${query.to}&trang=1&form=${createQuery(query.item)}`
        );
      }
    } else {
      if (query.item === "") {
        router.push(
          `/danh-sach/${typeItem}.html?q=${createQuery(query.q)}&trang=1`
        );
      } else {
        router.push(
          `/danh-sach/${typeItem}.html?q=${createQuery(
            query.q
          )}&trang=1&form=${createQuery(query.item)}`
        );
      }

      // router.push(
      //   `/danh-sach/${typeItem}.html?q=${createQuery(query.q)}&trang=1`
      // );
    }
  };

  return (
    <>
      <i
        onClick={() => setFilterMobile(false)}
        className="fa-solid fa-bars filter__menu"
      ></i>
      <div
        className={
          filterMobile
            ? "filter main__container filter__mobile"
            : "filter main__container"
        }
      >
        <div className="filter__list">
          <div className="filter__list--item">
            <h2>Danh mục</h2>
            <ul>
              <li
                className={query === "Sách mới của cửa hàng" ? "active" : ""}
                onClick={() => handleChangeCategory("Sách mới của cửa hàng")}
              >
                Sách mới của cửa hàng
              </li>

              <li
                className={query === "Giảm giá siêu ưu đãi" ? "active" : ""}
                onClick={() => handleChangeCategory("Giảm giá siêu ưu đãi")}
              >
                Giảm giá siêu ưu đãi
              </li>

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

          <div className="filter__list--item">
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
                  <label htmlFor={index} className="filter__list--item-li">
                    {VND.format(priceItem.from)}&nbsp;-&nbsp;
                    {priceItem.to === "Trở lên"
                      ? priceItem.to
                      : VND.format(priceItem.to)}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter__list--item">
            <h2>Hình thức</h2>
            <ul>
              {form.map((formItem, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    name="formItem"
                    id={formItem}
                    onChange={() => handleChangeForm(formItem, index)}
                    checked={index === selectedForm}
                  />
                  <label htmlFor={formItem} className="filter__list--item-li">
                    {formItem}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <i
          onClick={() => setFilterMobile(true)}
          className="fa-solid fa-rectangle-xmark filter__close"
        ></i>
      </div>
    </>
  );
};

export default Filter;
