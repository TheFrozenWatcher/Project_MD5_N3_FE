import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, TextField } from "@mui/material";
import { getOrders } from "../../services/orderService";
const columns = [
  { id: "id", align: "center", label: "Id", minWidth: 50 },
  { id: "user", align: "center", label: "User", minWidth: 100 },
  { id: "createdAt", align: "center", label: "Created At", minWidth: 100 },
  { id: "receiveAt", align: "center", label: "Received At", minWidth: 100 },
  {
    id: "serialNumber",
    align: "center",
    label: "Serial Number",
    minWidth: 100,
  },
  { id: "note", align: "center", label: "Note", minWidth: 170 },
  {
    id: "totalPriceAfterCoupon",
    align: "center",
    label: "Total Price After Coupon",
    minWidth: 170,
  },

  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

export default function Orders() {}
