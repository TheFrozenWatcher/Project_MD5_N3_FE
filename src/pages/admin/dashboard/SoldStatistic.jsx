
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useDebounce } from "rooks";
import {  getSoldProducts } from "../../../services/adminService";
import { TextField } from "@mui/material";


export default function SoldStatistic() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const handleChangYear = (year) => {
    setYear(year);
  };
  const setDebounced = useDebounce(handleChangYear, 500);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSoldProducts(year)).then((res) => {
      console.log(res.payload);
      setData(res.payload);
    });
  }, [year]);
  return (
    <>
    <div className="flex flex-col items-center space-y-8">
    <h1 className="text-4xl">Thống kê số lượng sản phẩm đã bán </h1>
         <TextField
        id="standard-basic"
        label="Statistical year"
        variant="standard"
        onChange={(e) => setDebounced(e.target.value)}
      />
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip shared={false} trigger="click" />
        <Legend />
        <Bar  dataKey="soldQuantity" fill="#90EE90" />
      </BarChart>
    </div>
    
    </>
  );
}
