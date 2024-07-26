import React from "react";
import OrdersStatistic from "./OrderStatistics";
import SoldStatistic from "./SoldStatistic";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <OrdersStatistic />
        <SoldStatistic />
      </div>
    </>
  );
}
