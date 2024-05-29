"use client";

import "./page.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { getNoti } from "@/lib/apiCall";
import LoadingItem from "@/components/loading/LoadingItem";
import LoadingPage from "@/components/loading/Loading";

const CustomerContentNotification = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [notification, setNotification] = useState([]);
  const [modal, setModal] = useState(false);
  const [notiId, setNotiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const userId = user ? user._id : "";

  useEffect(() => {
    const getNotification = async () => {
      setLoadingItem(true);
      try {
        const res = await axiosInstance.get(`/notification/${userId}`);

        setNotification(res.data.reverse());
        setLoading(false);
        setLoadingItem(false);
      } catch (error) {
        console.log(error);
        setLoadingItem(false);
      }
    };

    if (userId !== "") {
      getNotification();
    }
  }, [loading, userId]);

  const handleRead = async (path, id) => {
    const newNotification = {
      read: true,
    };

    try {
      const res = await axiosInstance.put(
        `/user/notification/${id}`,
        newNotification
      );
      router.push(path);

      getNoti(dispatch, user._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteModal = (e, id) => {
    e.stopPropagation();
    setModal(true);
    setNotiId(id);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/notification/${notiId}`);

      toast.success(res.data.message);
      getNoti(dispatch, user._id);
      setModal(false);
      setLoading(false);
    } catch (error) {
      toast.error(res.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loadingItem ? (
        <LoadingItem />
      ) : (
        <>
          {loading && <LoadingPage />}
          <div className="customer__notification main__container">
            {notification.length !== 0 ? (
              <ul className="customer__notification--list">
                {notification?.map((n, index) => (
                  <li
                    key={index}
                    className={
                      n.read
                        ? "customer__notification--item read"
                        : "customer__notification--item"
                    }
                    onClick={() => handleRead(n.notify.path, n._id)}
                  >
                    <div>
                      <p className="customer__notification--title">
                        {n.notify.title}
                      </p>

                      <p className="customer__notification--content">
                        {n.notify.content}
                      </p>
                    </div>
                    <i
                      className="fa-solid fa-trash"
                      onClick={(e) => handleDeleteModal(e, n._id)}
                    ></i>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="main__title">Không có thông báo</div>
            )}

            <div className={modal ? "customer__modal" : "hidden"}>
              <div className="customer__modal--title">
                Bạn chắc mình đã đọc thông báo quan trọng này
              </div>
              <div className="customer__modal--content">
                <button
                  className="customer__modal--hide"
                  onClick={() => setModal(false)}
                >
                  Chưa
                </button>
                <button
                  className="customer__modal--agree"
                  onClick={handleDelete}
                >
                  Xoá thông báo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerContentNotification;
