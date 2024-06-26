"use client";

import { useEffect, useState } from "react";
import "./page.css";
import "../don-hang/responsive.css";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";
import Image from "next/image";
import VND from "@/vnd";
import "./responsive.css";
import LoadingItem from "@/components/loading/LoadingItem";

const CustomerContentOrder = () => {
  const [orders, setOrders] = useState([]);

  const [loadingItem, setLoadingItem] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const userId = user ? user._id : "";
  useEffect(() => {
    const getOrders = async () => {
      setLoadingItem(true);
      try {
        const res = await axiosInstance.get(`/order/find/delete/${userId}`);
        setOrders(res.data);
        setLoading(false);
        setLoadingItem(false);
      } catch (error) {
        console.log(error);
        setLoadingItem(false);
      }
    };

    if (userId !== "") {
      getOrders();
    }
  }, [userId]);

  return (
    <>
      {loadingItem ? (
        <LoadingItem />
      ) : (
        <div className="content__order main__container">
          {orders.length !== 0 ? (
            <div>
              <ul className="content__order--list">
                {orders.map((order, index) => (
                  <li
                    key={index}
                    className="content__order--list-item row no-gutters"
                  >
                    <Image
                      className="img__main"
                      src={order.books.image}
                      alt={order.books}
                      width={100}
                      height={100}
                    />
                    <div className="content__order--desc c-8 m-9 s-9">
                      <p className="content__order--title">
                        {order.books.name}
                      </p>

                      <p className="content__order--quality">
                        Số lượng: {order.books.quantity}
                      </p>

                      <div className="content__order--price-middle">
                        {VND.format(
                          order.books.discountPrice * order.books.quantity
                        )}
                      </div>
                    </div>

                    <div className="content__order--price c-2 m-0 s-0">
                      {VND.format(
                        order.books.discountPrice * order.books.quantity
                      )}
                    </div>

                    <div className="order__action">
                      <div className="order__action--item row no-gutters">
                        <div className="l-6 m-5 s-5">
                          <p className="order__action--title">
                            {" "}
                            Trạng thái đơn hàng:
                          </p>
                          <p className="order__action--title">
                            {" "}
                            Địa chỉ giao hàng:
                          </p>
                        </div>

                        <div className="l-6 m-7 s-7">
                          <p className="order__action--status">
                            {order.status}
                          </p>

                          <p className="order__action--status">
                            {order.address.address}
                            <br /> {order.address.ward},{" "}
                            {order.address.district},{order.address.province}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="display__flex--center">
              <p className="main__title">Không có đơn hàng.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CustomerContentOrder;
