"use client";

import { useEffect, useState } from "react";
import "./page.css";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";
import Image from "next/image";
import VND from "@/vnd";

const CustomerContentOrder = () => {
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axiosInstance.get(`/order/find/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="content__order main__container">
      {/* <p className="content__order--empty" >Không có đơn hàng!</p> */}

      <div>
        <ul className="content__order--list">
          {orders.map((order) => (
            <li className="content__order--list-item row no-gutters">
              <Image
                className="img__main"
                src={order.books.image}
                alt=""
                width={100}
                height={100}
              />
              <div className="content__order--desc c-8">
                <p className="content__order--title">{order.books.name}</p>

                <p className="content__order--quality">
                  Số lượng: {order.books.quantity}
                </p>
              </div>

              <div className="content__order--price c-2">
                {VND.format(order.books.discountPrice * order.books.quantity)}
              </div>

              <div className="order__action">
                <p className="main__title">
                  Trạng thái đơn hàng:{" "}
                  <span className="order__action--status">{order.status}</span>
                </p>

                <div className="content__order--btn">
                  <button className="content__order--btn-delete">
                    Huỷ đơn hàng
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="customer__modal hidden">
        <div className="customer__modal--title">Bạn muốn huỷ đơn hàng này?</div>
        <div className="customer__modal--content">
          <button className="customer__modal--hide">Đóng</button>
          <button className="customer__modal--agree">Huỷ đơn hàng</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentOrder;
