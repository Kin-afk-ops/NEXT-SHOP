import Image from "next/image";
import Link from "next/link";
import "./listItem.css";

const ListItem = ({ book }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const currentPrice = book?.price - (book?.price * book?.discount) / 100;

  return (
    <Link href="/sach/abc" class="link">
      <div class="list__item">
        <div class="list__item--img">
          <Image
            fill={true}
            src={book?.image?.path}
            alt={book?.name}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <div class="list__item--text">
          <p class="list__item--title">{book?.name}</p>

          <p class="list__item--price">{VND.format(currentPrice)}</p>
          <p class="list__item--discount">{VND.format(book?.price)}</p>
        </div>

        <div class="list__item--percent">{book?.discount}%</div>
      </div>
    </Link>
  );
};

export default ListItem;
