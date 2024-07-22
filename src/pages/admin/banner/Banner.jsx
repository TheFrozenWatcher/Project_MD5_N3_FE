import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Button, TextField } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useDebounce } from "rooks";
import {
  changeRole,
  changeStatus,
  deleteBanner,
  getAllBanners,
  getAllUsers,
} from "../../../services/adminService";
import ModalAddBanner from "./ModalAddBanner";
import ModalEditBanner from "./ModalEditBanner";
const columns = [
  { id: "id", align: "center", label: "Id", minWidth: 50 },
  { id: "bannerName", align: "center", label: "Banner Name", minWidth: 100 },
  { id: "createdAt", align: "center", label: "Created At", minWidth: 100 },
  { id: "image", align: "center", label: "Image", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    align: "center",
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

function createData(id, bannerName, createdAt, image, description, status) {
  return { id, bannerName, createdAt, image, description, status };
}

export default function Banner() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.banner);
  const [open, setOpen] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [bannerEdit, setBannerEdit] = React.useState(null);
  const handleToggleModal = () => {
    console.log("co vao");
    setOpen(!open);
  };
  React.useEffect(() => {
    console.log(open);
    dispatch(getAllBanners());
  }, [open,openFormEdit]);
  console.log(data);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to Delete this banner?")) {
      dispatch(deleteBanner(id))
        .then(() => {
          dispatch(getAllBanners());
        })
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "Delete banner successfully",
            icon: "success",
          });
        });
    }
  };
  const initEditBanner = (id) => {
    setOpenFormEdit(true)
    const banner = data.filter((b) => b.id === id)[0];
    setBannerEdit(banner);
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <ModalAddBanner handleToggleModal={handleToggleModal} open={open} />
        <ModalEditBanner bannerEdit={bannerEdit} openFormEdit={openFormEdit} setOpenFormEdit={setOpenFormEdit}></ModalEditBanner>
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
