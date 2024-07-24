import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";

import {  Button } from "@mui/material";
import {
  deleteEvent,
  getEvents,
} from "../../../services/adminService";
import ModalAddEvent from "./ModalAddEvent";
import ModalEditEvent from "./ModalEditEvent";

const columns = [
  { id: "id", align: "center", label: "Id", minWidth: 50 },
  { id: "discount", align: "center", label: "Discount", minWidth: 100 },
  { id: "startDate", align: "center", label: "Start date", minWidth: 100 },
  { id: "endDate", align: "center", label: "End date", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "title",
    label: "Tilte",
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

export default function Event() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.event);
  const [open, setOpen] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [eventEdit, setEventEdit] = React.useState(null);
  React.useEffect(() => {
    dispatch(getEvents());
  }, [open,openFormEdit]);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to Delete this event?")) {
      dispatch(deleteEvent(id))
        .then(() => {
          dispatch(getEvents());
        })
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "Delete event successfully",
            icon: "success",
          });
        });
    }
  };
  const initEditBanner = (id) => {
    setOpenFormEdit(true)
    const event = data.filter((cp) => cp.id === id)[0];
    console.log(event);
    setEventEdit(event);
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <ModalAddEvent setOpen={setOpen} open={open} />
        <ModalEditEvent eventEdit={eventEdit} openFormEdit={openFormEdit} setOpenFormEdit={setOpenFormEdit}/>
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
                            ) : column.id === "discount" ? (
                                  `${value}%`
                              ) : (
                                value
                              )}
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
