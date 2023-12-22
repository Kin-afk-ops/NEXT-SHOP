import axiosInstance from "@/config";

import "./filter.css";

const Filter = async () => {
  const res = await axiosInstance.get("/category");

  const categories = await res.data;

  return (
    <div class="filer main__container">
      <div class="filer__list">
        <div class="filer__list--item">
          <p>Tất cả</p>
        </div>

        {categories?.map((category, index) => (
          <div class="filer__list--item" key={index}>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
