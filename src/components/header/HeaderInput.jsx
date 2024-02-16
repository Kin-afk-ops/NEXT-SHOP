"use client";
import { useRouter } from "next/navigation";

import { useRef, useState } from "react";
import "./header.css";

const HeaderInput = () => {
  const router = useRouter();
  const input = useRef(null);

  const [searchHistoryArray, setSearchHistoryArray] = useState(
    JSON.parse(window.localStorage.getItem("searchHistory"))
  );

  const [historyMode, setHistoryMode] = useState(false);

  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setHistoryMode(false);
  };

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

  const handleDeleteSearchHistory = (query) => {
    const searchQuery = searchHistoryArray.filter((search) => search !== query);
    input.current.focus();

    setSearchHistoryArray(searchQuery);
    window.localStorage.setItem("searchHistory", JSON.stringify(searchQuery));
  };

  return (
    <div className="header__center">
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
            searchHistoryArray.length !== 0 && setHistoryMode(true);
          }}
        />
        <div className="header__center--icon" onClick={handleSearch}>
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
          <p className="header__input--history-title">
            Lịch sử tìm kiếm <i className="fa-solid fa-clock"></i>
          </p>

          <ul>
            {searchHistoryArray &&
              searchHistoryArray.map((search, index) => (
                <>
                  {index <= 9 && (
                    <li key={index} onClick={() => handleClickHistory(search)}>
                      <span>{search}</span>
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => handleDeleteSearchHistory(search)}
                      ></i>
                    </li>
                  )}
                </>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderInput;
