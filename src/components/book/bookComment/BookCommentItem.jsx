const BookCommentItem = () => {
  return (
    <li className="product__comment--item row">
      <div className="col c-2">
        <p className="product__comment--name">Nguyễn Vũ Linh</p>
        <p className="product__comment--date">22/02/2021</p>
      </div>

      <div className="col c-10">
        <div className="product__comment--star">
          <div>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
        <p className="product__comment--content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
          accusamus, ea sunt rem fugiat molestias quibusdam amet asperiores
          atque quidem, tenetur veniam qui dicta a aliquam! Illum a corrupti
          itaque?
        </p>
        <div className="product__comment--icon">
          <i className="fa-regular fa-thumbs-up"></i>
          <span>thích(0)</span>
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>Báo cáo</span>
        </div>
      </div>
    </li>
  );
};

export default BookCommentItem;
