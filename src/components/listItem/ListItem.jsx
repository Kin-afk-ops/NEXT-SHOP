import Image from "next/image";
import Link from "next/link";
import "./listItem.css";
import "./responsive.css";

const ListItem = ({ book }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const currentPrice = book?.price - (book?.price * book?.discount) / 100;

  return (
    <Link href={`/sach/${book?.slug}.html`} className="link">
      <div className="list__item">
        <div className="list__item--img">
          <Image
            fill={true}
            src={book?.image?.path}
            alt={book?.name}
            style={{
              objectFit: "contain",
            }}
            sizes="(max-width: 320px) 50vw"
          />
        </div>

        <div className="list__item--text">
          <p className="list__item--title">{book?.name}</p>

          <p className="list__item--price">{VND.format(currentPrice)}</p>
          <p className="list__item--discount">{VND.format(book?.price)}</p>
        </div>

        <div className="list__item--percent">-{book?.discount}%</div>
      </div>
    </Link>
  );
};

export default ListItem;
