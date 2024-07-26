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
import Select from "@mui/material/Select";
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useDebounce } from "rooks";
import {
  changeRole,
  changeStatus,
  getAllUsers,
} from "../../services/adminService";

const columns = [
  { id: "id", align: "center", label: "Id", minWidth: 50 },
  { id: "fullName", align: "center", label: "Name", minWidth: 100 },
  { id: "username", align: "center", label: "Username", minWidth: 100 },
  { id: "avatar", align: "center", label: "Avatar", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
  },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "point",
    label: "Point",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "roles",
    label: "Roles",
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

export default function User() {

 

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [direction, setDirection] = React.useState("asc");
  const [sort, setSort] = React.useState("");

  React.useEffect(() => {
    dispatch(
      getAllUsers({
        page: page,
        size: rowsPerPage,
        search: search,
        direction: direction,
        sort: sort
      })
    );
  }, [page, rowsPerPage, search, direction,sort]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeStatus = (id) => {
    dispatch(changeStatus(id)).then(() => {
      dispatch(
        getAllUsers({
          page: page,
          size: rowsPerPage,
          search: search,
          direction: direction,
          sort: sort

        })
      );
    });
  };
  const setSearchDebounced = useDebounce(setSearch, 1000);
  const handleSort = () => {
    setDirection(direction === "asc" ? "desc" : "asc");
  };
  const handleChangeRole = (id) => {
    dispatch(changeRole(id)).then(() => {
      dispatch(
        getAllUsers({
          page: page,
          size: rowsPerPage,
          search: search,
          direction: direction,
         sort: sort

        })
      );
    });
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <>
      <div className="flex">
        <div className="flex">
          <SwapVertIcon
            onClick={handleSort}
            fontSize="large"
            className="ml-[1.5vw] cursor-pointer"
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort by"
                onChange={handleChange}
              >
                <MenuItem value="id">Id</MenuItem>
                <MenuItem value="fullName">Full Name</MenuItem>
                <MenuItem value="point">Point</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className="ml-auto">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => setSearchDebounced(e.target.value)}
          />
        </div>
      </div>
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
                data.content.map((row, index) => {
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
                                <Button
                                  onClick={() => handleChangeStatus(row["id"])}
                                  variant="contained"
                                  color="success"
                                >
                                  Active
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleChangeStatus(row["id"])}
                                  variant="outlined"
                                  color="error"
                                >
                                  Inactive
                                </Button>
                              )
                            ) : column.id === "action" ? (
                              <>
                                <Button
                                  onClick={() => handleChangeRole(row["id"])}
                                  color="secondary"
                                >
                                  Change Manager
                                </Button>
                                <Button
                                  onClick={() => handleEdit(row["id"])}
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
                            ) : column.id === "roles" ? (
                              value.map((role) => role.roleName).join(", ")
                            ) : column.id === "avatar" ? (
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
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data?.totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
