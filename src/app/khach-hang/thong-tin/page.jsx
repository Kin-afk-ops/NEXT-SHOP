"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./page.css";
import avatar from "../../../assets/images/default_avatar.png";
import { useSelector } from "react-redux";
import axiosInstance from "@/config";

const CustomerContentInfo = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [infoUser, setInfoUser] = useState({});
  const [checkInfo, setCheckInfo] = useState(false);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axiosInstance.get(`/infoUser/${user._id}`);
        setInfoUser(res.data);

        if (res.data.avatar.path !== "" && res.data.avatar.path !== "") {
          setCheckInfo(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getInfoUser();
  }, []);

  return (
    <div>
      <div className="customer__info main__container">
        <Image
          src={checkInfo ? infoUser?.avatar.path : avatar}
          alt="avatar"
          width={225}
          height={225}
          style={{
            objectFit: "contain",
            borderRadius: "50%",
            border: "1px solid #ccc",
          }}
          className="customer__info--avatar"
        />

        <div className="customer__info--info">
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
            {user.phone}
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
              <span>{infoUser?.birthday?.split("-").reverse().join("/")}</span>
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
  );
};

export default CustomerContentInfo;
