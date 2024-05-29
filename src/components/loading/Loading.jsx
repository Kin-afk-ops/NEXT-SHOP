"use client";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./loading.css";

const LoadingPage = () => {
  return (
    <div className="overlay">
      <div className="sweet-loading">
        <ClipLoader
          color="#ff3333"
          loading={true}
          cssOverride={{
            display: "block",
            margin: "0 auto",

            zIndex: 999,

            borderWidth: "10px",
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
