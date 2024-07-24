import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { styled, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../../services/adminService";
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
export default function ModalAddCoupon({ setOpen, open }) {
  //   const { loading, error } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = React.useState({
    code: "",
    discount: "",
    startDate: null,
    endDate: null,
    quantity: "",
    title: "",
  });
  const [error, setError] = React.useState({
    code: "",
    discount: "",
    startDate: null,
    endDate: null,
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
    if(name==="endDate") {
      const startDate = new Date(coupon.startDate);
      const endDate = new Date(value);
      if(startDate.getTime() - endDate.getTime() > 0) {
        setError({...error, endDate: "End date must be later than start date" });
      } else {
        setError({...error, endDate: "" });
      }
    }
    if(name==="startDate") {
      const startDate = new Date(value);
      console.log(startDate);
      console.log(new Date());
      if(startDate.getTime() - new Date().getTime() <0 ) {
        setError({...error, startDate: "Start date can not be in the past or in the same day" });
      } else {
        setError({...error, startDate: "" });
      }
    }
    console.log(coupon);
    console.log(error
    );
  };
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (
      coupon.code !== "" &&
      coupon.discount !== "" &&
      coupon.startDate !== null &&
      coupon.endDate !== null &&
      coupon.quantity !== "" &&
      coupon.title !== "" &&
      error.code === "" &&
      error.discount === "" &&
      error.startDate === "" &&
      error.endDate === "" &&
      error.quantity === "" &&
      error.title === ""
    ) {
      dispatch(addCoupon(coupon))
        .then((res) => {
          console.log(res);
          if(res.error){
            handleToggleModal()
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: Object.values(res.payload).join(", "),
            });
          } else {
            handleToggleModal()
            Swal.fire({
              title: "Success",
              text: "Add Successfully",
              icon: "success"
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleToggleModal = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleToggleModal}>
        Add Coupon
      </Button>
      <Modal
        open={open}
        onClose={handleToggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="flex-col flex gap-7" onSubmit={handleAddCoupon}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Coupon
            </Typography>
            <TextField
              error={error.code}
              label="Coupon code"
              onChange={handleChangeForm}
              type="text"
              placeholder="Coupon code"
              helperText={error.code ? error.code : ""}
              name="code"
            />
            <TextField
              error={error.discount}
              label="Discount"
              onChange={handleChangeForm}
              type="text"
              placeholder="Discount"
              helperText={error.discount ? error.discount : ""}
              name="discount"
            />
            <div>
              <label>Start date: </label>
              <TextField
                error={error.startDate}
                onChange={handleChangeForm}
                type="date"
                helperText={error.startDate ? error.startDate : ""}
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
              name="quantity"
            />
            <TextField
              error={error.title}
              label="Title"
              onChange={handleChangeForm}
              type="text"
              placeholder="Title"
              helperText={error.discount ? error.discount : ""}
              name="title"
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
