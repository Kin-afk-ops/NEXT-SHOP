"use client";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import "./header.css";
import Image from "next/image";
import axiosInstance from "@/config";
import Link from "next/link";
import configSlug from "@/slug";

const HeaderInput = () => {
  const router = useRouter();
  const input = useRef(null);

  const [searchHistoryArray, setSearchHistoryArray] = useState("");

  const [historyMode, setHistoryMode] = useState(false);

  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookHot, setBookHot] = useState([]);
  const [categoriesHot, setCategoriesHot] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      const res = await axiosInstance.get("home/book/input");
      setBookHot(res.data);
    };
    const getCate = async () => {
      const res = await axiosInstance.get("home/categories/input");
      setCategoriesHot(res.data);
      // console.log(res.data);
    };

    const getHistory = () => {
      setSearchHistoryArray(
        JSON.parse(window.localStorage.getItem("searchHistory"))
      );
    };

    function onScroll() {
      setHistoryMode(false);
    }

    window.addEventListener("scroll", onScroll);

    getBook();
    getCate();
    getHistory();
  }, []);

  const createQuery = (query) => {
    return query.split(" ").join("+");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (query !== "") {
      const searchHistory = JSON.parse(
        window.localStorage.getItem("searchHistory")
      );

      if (searchHistory) {
        if (searchHistory.includes(query)) {
          const searchQuery = searchHistory.filter(
            (search) => search !== query
          );

          searchQuery.unshift(query);

          window.localStorage.setItem(
            "searchHistory",
            JSON.stringify(searchQuery)
          );
        } else {
          searchHistory.unshift(query);
          window.localStorage.setItem(
            "searchHistory",
            JSON.stringify(searchHistory)
          );
        }
      } else {
        const searchArray = [query];
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(searchArray)
        );
      }
      router.push(`/danh-sach/tim-kiem.html?q=${createQuery(query)}&trang=1`);
      setHistoryMode(false);

      setSearchHistoryArray(
        JSON.parse(window.localStorage.getItem("searchHistory"))
      );
    }
  };

  const handleClickHistory = (search) => {
    input.current.focus();

    setQuery(search);
    setHistoryMode(false);

    const searchHistory = JSON.parse(
      window.localStorage.getItem("searchHistory")
    );

    const searchQuery = searchHistory.filter((item) => item !== search);

    searchQuery.unshift(search);

    window.localStorage.setItem("searchHistory", JSON.stringify(searchQuery));
    setSearchHistoryArray(searchQuery);

    router.push(`/danh-sach/tim-kiem.html?q=${createQuery(search)}&trang=1`);
  };

  const handleDeleteSearchHistory = (e, query) => {
    e.stopPropagation();

    const searchQuery = searchHistoryArray.filter((search) => search !== query);
    input.current.focus();

    setSearchHistoryArray(searchQuery);

    if (
      searchQuery.length === 0 &&
      bookHot.length === 0 &&
      categoriesHot.length === 0
    ) {
      setHistoryMode(false);
    }
    window.localStorage.setItem("searchHistory", JSON.stringify(searchQuery));
  };

  return (
    <div className="header__center s-8">
      <div className="header__center--search">
        <input
          ref={input}
          type="text"
          className="header__center--input"
          placeholder="Tìm kiếm sản phẩm mong muốn..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (
              searchHistoryArray.length !== 0 ||
              bookHot?.length !== 0 ||
              categoriesHot.length !== 0
            ) {
              setHistoryMode(true);
            }
          }}
        />
        <div className="header__center--icon s-0" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      {historyMode && (
        <div
          className="history__overlay"
          onClick={() => setHistoryMode(false)}
        ></div>
      )}

      {historyMode && (
        <div className="header__input--history">
          {searchHistoryArray.length !== 0 && (
            <div>
              <p className="header__input--history-title">
                Lịch sử tìm kiếm <i className="fa-solid fa-clock"></i>
              </p>

              <ul>
                {searchHistoryArray &&
                  searchHistoryArray.map((search, index) => (
                    <>
                      {index <= 9 && (
                        <li
                          key={index}
                          onClick={() => handleClickHistory(search)}
                        >
                          <span>{search}</span>
                          <i
                            className="fa-solid fa-xmark"
                            onClick={(e) =>
                              handleDeleteSearchHistory(e, search)
                            }
                          ></i>
                        </li>
                      )}
                    </>
                  ))}
              </ul>
            </div>
          )}

          {bookHot?.length !== 0 && (
            <div>
              <p className="header__input--history-title">
                Sản phẩm đang hot <i className="fa-solid fa-arrow-trend-up"></i>
              </p>

              <div className="row no-gutters">
                {bookHot?.map((book) => (
                  <div
                    key={book._id}
                    className="link header__input--history-popular col c-6 display__flex--center"
                    onClick={() => {
                      router.push(`/sach/${configSlug(book.name)}.html`);
                      setHistoryMode(false);
                    }}
                  >
                    <Image
                      src={book?.image.path}
                      alt={book?.name}
                      width={50}
                      height={50}
                    />

                    <p>{book?.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {categoriesHot.length !== 0 && (
            <div>
              <p className="header__input--history-title">
                Danh mục nổi bật <i className="fa-solid fa-layer-group"></i>
              </p>

              <div className="row no-gutters">
                {categoriesHot?.map((cate) => (
                  <div
                    key={cate._id}
                    className="header__input--history-cate col c-3"
                    onClick={() => {
                      router.push(
                        `/danh-sach/danh-muc.html?q=${createQuery(
                          cate.name
                        )}&trang=1`
                      );
                      setHistoryMode(false);
                    }}
                  >
                    <Image
                      src={cate.image.path}
                      height={100}
                      width={100}
                      alt={cate.image.path}
                    />
                    <p>{cate.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderInput;
