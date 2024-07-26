import React from "react";
import Menu from "../../layouts/menu";
import { Outlet } from "react-router-dom";
import Footer from "../../layouts/footer";
import AdminMenu from "../../layouts/menu/AdminMenu";

export default function AdminIndex() {
  return (
    <>
      <div className="ra-admin-layout">
        <Menu />
        <div className="right ">
          <div className="flex  h-screen">
            <AdminMenu />
            <div className="flex-1 mt-[20vh] overflow-x-hidden overflow-y-auto">
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
