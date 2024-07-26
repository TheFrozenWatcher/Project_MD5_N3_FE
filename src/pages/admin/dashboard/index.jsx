import React from "react";
import OrdersStatistic from "./OrderStatistics";
import SoldStatistic from "./SoldStatistic";
import SaleRevenue from "./SaleRevenue";

export default function Dashboard() {
  return (
    <>
      <div className="flex-col space-y-20">
        <OrdersStatistic />
        <SoldStatistic />
        <SaleRevenue/>
      </div>
    </>
  );
}
