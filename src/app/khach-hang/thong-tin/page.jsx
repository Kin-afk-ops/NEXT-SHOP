"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./page.css";
import "./responsive.css";
import avatar from "../../../assets/images/default_avatar.png";
import { useSelector } from "react-redux";
import axiosInstance from "@/config";
import LoadingItem from "@/components/loading/LoadingItem";

const CustomerContentInfo = () => {
  const user = useSelector((state) => state.user.currentUser);
  const userId = user ? user._id : "";

  const [infoUser, setInfoUser] = useState({});
  const [checkInfo, setCheckInfo] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);

  useEffect(() => {
    const getInfoUser = async () => {
      setLoadingItem(true);
      try {
        const res = await axiosInstance.get(`/infoUser/${userId}`);
        setInfoUser(res.data);

        if (res.data.avatar.path !== "" && res.data.avatar.path !== "") {
          setCheckInfo(true);
        }
        setLoadingItem(false);
      } catch (error) {
        console.log(error);
        setLoadingItem(false);
      }
    };

    if (userId !== "") {
      getInfoUser();
    }
  }, [userId]);

  return (
    <>
      {loadingItem ? (
        <LoadingItem />
      ) : (
        <div>
          <div className="customer__info main__container row">
            <div className="s-12 display__flex--center">
              <Image
                src={checkInfo ? infoUser?.avatar.path : avatar}
                alt="avatar"
                width={255}
                height={255}
                className="customer__info--avatar"
              />
            </div>

            <div className="customer__info--info s-12">
              <p>
                <i className="fa-solid fa-circle-info"></i>

                {infoUser?.lastName !== "" ? (
                  <span> {infoUser?.lastName + " " + infoUser?.firstName}</span>
                ) : (
                  <span> Họ và tên</span>
                )}
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i>
                {infoUser?.email !== "" ? (
                  <span> {infoUser?.email}</span>
                ) : (
                  <span>Email</span>
                )}
              </p>
              <p>
                <i className="fa-solid fa-phone"></i>
                {user?.phone}
              </p>
              <p>
                <i className="fa-solid fa-person"></i>

                {infoUser?.gender !== "" ? (
                  <span> {infoUser?.gender}</span>
                ) : (
                  <span>Giới tính</span>
                )}
              </p>
              <p>
                <i className="fa-solid fa-cake-candles"></i>
                {infoUser?.birthday !== "" ? (
                  <span>
                    {infoUser?.birthday?.split("-").reverse().join("/")}
                  </span>
                ) : (
                  <span>Ngày sinh</span>
                )}
              </p>
              <p className="display__flex">
                <i className="fa-solid fa-location-dot"></i>
                {infoUser?.address ? (
                  <span>
                    {" "}
                    {infoUser?.address.address} <br /> {infoUser?.address.ward},{" "}
                    {infoUser?.address.district}, {infoUser?.address.province}
                  </span>
                ) : (
                  <span>Địa chỉ</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerContentInfo;
