"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import "./header.css";

const HeaderInput = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");

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
      router.push(`/danh-sach/tim-kiem.html?q=${createQuery(query)}&trang=1`);
    }
  };

  return (
    <div className="header__center">
      <input
        type="text"
        className="header__center--input"
        placeholder="Tìm kiếm sản phẩm mong muốn..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="header__center--icon" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default HeaderInput;
