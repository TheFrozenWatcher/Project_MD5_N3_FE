
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
import { useDebounce } from "rooks";
import { getOrderStatistics, getSaleRevenue } from "../../../services/adminService";
import { TextField } from "@mui/material";


export default function SaleRevenue() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const handleChangYear = (year) => {
    setYear(year);
  };
  const setDebounced = useDebounce(handleChangYear, 500);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSaleRevenue(year)).then((res) => {
      console.log(res.payload);
      setData(res.payload);
    });
  }, [year]);
  return (
    <>
    <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl">Thống kê doanh thu đã bán năm {year? year: new Date().getFullYear()}</h1>
         <TextField
        id="standard-basic"
        label="Statistical year"
        variant="standard"
        onChange={(e) => setDebounced(e.target.value)}
      />
      <LineChart width={1000} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis  dataKey="month" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        name="Doanh thu"
        type="monotone"
        dataKey="revenue"
        stroke="#8884d8"
        strokeWidth={3}
        activeDot={{ r: 8 }}
      />
    </LineChart>
    </div>
    
    </>
  );
}
