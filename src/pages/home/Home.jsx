import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import MostSoldProducts from "../../components/product/MostSoldProducts";
import NewestProducts from "../../components/product/NewestProducts";

export default function UserIndex() {
  return (
    <>
      <Header />
      <div className="right flex-1 mt-[20vh]">
        <div>
          <MostSoldProducts/>
        </div>
        <div>
          <NewestProducts/>
        </div>
      </div>
      <Footer />
    </>
  );
}
