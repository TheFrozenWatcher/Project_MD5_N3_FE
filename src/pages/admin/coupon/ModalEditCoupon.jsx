import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { styled, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {  editCoupon } from "../../../services/adminService";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function ModalEditCoupon({
  couponEdit,
  openFormEdit,
  setOpenFormEdit,
}) {
//    console.log(couponEdit);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = React.useState({
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
    quantity: "",
    title: "",
  });

  console.log(coupon);
  const [error, setError] = React.useState({
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
    quantity: "",
    title: "",
  });

  const handleChangeForm = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
    if (value === "" || value === null) {
      setError({ ...error, [name]: name + " required " });
    } else {
      setError({ ...error, [name]: "" });
    }
    if (name === "endDate") {
      const startDate = new Date(coupon.startDate);
      const startDateEdit = new Date(couponEdit?.startDate);
      const endDate = new Date(value);
      if ((startDate.getTime() - endDate.getTime() > 0) || (startDateEdit.getTime() - endDate.getTime() > 0) ) {
        setError({
          ...error,
          endDate: "End date must be later than start date",
        });
      } else {
        setError({ ...error, endDate: "" });
      }
    }
    if (name === "startDate") {
      const startDate = new Date(value);
      console.log(startDate);
      console.log(new Date());
      if (startDate.getTime() - new Date().getTime() < 0) {
        setError({
          ...error,
          startDate: "Start date can not be in the past or in the same day",
        });
      } else {
        setError({ ...error, startDate: "" });
      }
    }

    console.log(coupon);
  };
  const handleAddCoupon = (e) => {
    e.preventDefault();
    setCoupon({ ...coupon, id: couponEdit?.id });
    const updatedCoupon = {
        ...coupon,
        id: couponEdit?.id ,
        code: coupon.code === "" ? couponEdit?.code : coupon.code,
        discount: coupon.discount === "" ? couponEdit?.discount : coupon.discount,
        startDate: coupon.startDate === "" ? couponEdit?.startDate : coupon.startDate,
        endDate: coupon.endDate === "" ? couponEdit?.endDate : coupon.endDate,
        quantity: coupon.quantity === "" ? couponEdit?.quantity : coupon.quantity,
        title: coupon.title === "" ? couponEdit?.title : coupon.title,
      };
      setCoupon(updatedCoupon);
    if (
      error.code === "" &&
      error.discount === "" &&
      error.startDate === "" &&
      error.endDate === "" &&
      error.quantity === "" &&
      error.title === ""
    ) {
        console.log(coupon);
      dispatch(editCoupon(coupon))
        .then((res) => {
          console.log(res);
          if (res.error) {
            handleToggleModal();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: Object.values(res.payload),
            });
          } else {
            handleToggleModal();
            Swal.fire({
              title: "Success",
              text: "Edit Successfully",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleToggleModal = () => {
    setOpenFormEdit(!openFormEdit);
  };
  return (
    <div>
      <Modal
        open={openFormEdit}
        onClose={handleToggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="flex-col flex gap-7" onSubmit={handleAddCoupon}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Coupon
            </Typography>
            <TextField
              error={error.code}
              label="Coupon code"
              onChange={handleChangeForm}
              type="text"
              placeholder="Coupon code"
              helperText={error.code ? error.code : ""}
              defaultValue={couponEdit?.code}
              name="code"
            />
            <TextField
              error={error.discount}
              label="Discount"
              onChange={handleChangeForm}
              type="text"
              placeholder="Discount"
              helperText={error.discount ? error.discount : ""}
              defaultValue={couponEdit?.discount}
              name="discount"
            />
            <div>
              <label>Start date: </label>
              <TextField
                error={error.startDate}
                onChange={handleChangeForm}
                type="date"
                helperText={error.startDate ? error.startDate : ""}
                defaultValue={couponEdit?.startDate}
                name="startDate"
              />{" "}
            </div>
            <div>
              <label>End date: </label>
              <TextField
                error={error.endDate}
                onChange={handleChangeForm}
                type="date"
                helperText={error.endDate ? error.endDate : ""}
                defaultValue={couponEdit?.endDate}
                name="endDate"
              />{" "}
            </div>
            <TextField
              error={error.quantity}
              label="Quantity"
              onChange={handleChangeForm}
              type="number"
              placeholder="Quantity"
              helperText={error.quantity ? error.quantity : ""}
              defaultValue={couponEdit?.quantity}
              name="quantity"
            />
            <TextField
              error={error.title}
              label="Title"
              onChange={handleChangeForm}
              type="text"
              placeholder="Title"
              helperText={error.discount ? error.discount : ""}
              defaultValue={couponEdit?.title}
              name="title"
            />
            <Button variant="contained" type="submit">
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
