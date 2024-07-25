import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { styled, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../../services/adminService";
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
export default function ModalAddEvent({ setOpen, open }) {
  //   const { loading, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const [event, setEvent] = React.useState({
    startDate: null,
    title: "",
  });
  const [error, setError] = React.useState({
    startDate: null,
    title: "",
  });

  const handleChangeForm = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    if (value === "" || value === null) {
      setError({ ...error, [name]: name + " required " });
    } else {
      setError({ ...error, [name]: "" });
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
    console.log(event);
    console.log(error
    );
  };
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (
      error.startDate === "" &&
      error.endDate === "" &&
      error.title === ""
    ) {
      dispatch(addEvent(event))
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
        Add Event
      </Button>
      <Modal
        open={open}
        onClose={handleToggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="flex-col flex gap-7" onSubmit={handleAddEvent}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Event
            </Typography>
            <TextField
              error={error.discount}
              label="Discount"
              onChange={handleChangeForm}
              type="number"
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
