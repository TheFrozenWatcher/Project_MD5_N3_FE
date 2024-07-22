import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";

export default function UserIndex() {
  return (
    <>
      <Header />
      <div className="right flex-1 mt-[20vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
