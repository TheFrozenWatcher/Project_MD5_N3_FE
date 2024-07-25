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
  { id: "serialNumber", align: "center", label: "Serial Number", minWidth: 100 },
  { id: "note", align: "center", label: "Note", minWidth: 170 },
  { id: "totalPriceAfterCoupon", align: "center", label: "Total Price After Coupon", minWidth: 170 },
  
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

export default function Orders() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.orders);
  React.useEffect(()=> {
        dispatch(getOrders())
        console.log(data?.content);
  },[])
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id === "status" ? (
                              value ? (
                                "Active"
                              ) : (
                                "Inactive"
                              )
                            ) : column.id === "action" ? (
                              <>
                                <Button
                                  onClick={() => initEditBanner(row["id"])}
                                  variant="contained"
                                  color="success"
                                >
                                  EDIT
                                </Button>
                                <Button
                                  onClick={() => handleDelete(row["id"])}
                                  variant="outlined"
                                  color="error"
                                >
                                  DELETE
                                </Button>
                              </>
                            ) : column.id === "image" ? (
                              <div className="flex justify-center items-center">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={value}
                                  sx={{ width: 56, height: 56 }}
                                />
                              </div>
                            ) : column.id === "user" ? value.fullName : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
