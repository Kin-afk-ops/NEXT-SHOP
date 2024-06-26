"use client";

import { useEffect, useState } from "react";
import "./page.css";
import "./responsive.css";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";
import Image from "next/image";
import VND from "@/vnd";
import { toast } from "react-toastify";
import LoadingItem from "@/components/loading/LoadingItem";

const CustomerContentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  const userId = user ? user._id : "";

  useEffect(() => {
    const getOrders = async () => {
      setLoadingItem(true);
      try {
        const res = await axiosInstance.get(`/order/find/${userId}`);
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
  }, [loading, userId]);

  const handleDelete = async () => {
    const newRequest = {
      type: "delete order",
      content: "Huỷ đơn hàng " + orderId,
    };

    try {
      const res = await axiosInstance.post(`/request/${user._id}`, newRequest);
      const newOrder = {
        requestDelete: true,
        status: "Đang chờ huỷ đơn hàng.",
      };

      try {
        await axiosInstance.put(`/user/order/${orderId}`, newOrder);

        toast.success("Đơn hàng của sẽ được xử lý");
        setLoading(!loading);
        setModal(false);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      toast.error("Gửi thông tin thất bại");
      console.log(error);
    }
  };

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
                      alt=""
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
                      <div className="order__action--item">
                        <p className="main__title">
                          Trạng thái đơn hàng:{" "}
                          <span className="order__action--status-order">
                            {order.status}
                          </span>
                        </p>

                        <p className="main__title">
                          Địa chỉ giao hàng:{" "}
                          <span className="order__action--status-order">
                            {order.address.address}
                            <br /> {order.address.ward},{" "}
                            {order.address.district},{order.address.province}
                          </span>
                        </p>
                      </div>

                      <div className="content__order--btn">
                        <button
                          className="content__order--btn-delete"
                          onClick={() => {
                            setOrderId(order._id);
                            setModal(true);
                          }}
                        >
                          Huỷ hàng
                        </button>
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

          <div className={modal ? "customer__modal" : "hidden"}>
            <div className="customer__modal--title">Bạn muốn huỷ hàng này?</div>
            <div className="customer__modal--content">
              <button
                className="customer__modal--hide"
                onClick={() => setModal(false)}
              >
                Đóng
              </button>
              <button className="customer__modal--agree" onClick={handleDelete}>
                Huỷ hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerContentOrder;
