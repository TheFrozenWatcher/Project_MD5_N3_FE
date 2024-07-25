import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { styled, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {  editEvent } from "../../../services/adminService";
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
export default function ModalEditEvent({
  eventEdit,
  openFormEdit,
  setOpenFormEdit,
}) {
//    console.log(eventEdit);
  const dispatch = useDispatch();
  const [event, setEvent] = React.useState({
    discount: "",
    startDate: "",
    title: "",
  });

  console.log(event);
  const [error, setError] = React.useState({
    discount: "",
    startDate: "",
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

    console.log(event);
  };
  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvent({ ...event, id: eventEdit?.id });
    const updatedEvent = {
        ...event,
        id: eventEdit?.id ,
        discount: event.discount === "" ? eventEdit?.discount : event.discount,
        startDate: event.startDate === "" ? eventEdit?.startDate : event.startDate,
        endDate: event.endDate === "" ? eventEdit?.endDate : event.endDate,
        title: event.title === "" ? eventEdit?.title : event.title,
      };
      setEvent(updatedEvent);
    if (
      error.discount === "" &&
      error.startDate === "" &&
      error.endDate === "" &&
      error.title === ""
    ) {
        console.log(event);
      dispatch(editEvent(event))
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
          <form className="flex-col flex gap-7" onSubmit={handleAddEvent}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Event
            </Typography>
            <TextField
              error={error.discount}
              label="Discount"
              onChange={handleChangeForm}
              type="number"
              placeholder="Discount"
              helperText={error.discount ? error.discount : ""}
              defaultValue={eventEdit?.discount}
              name="discount"
            />
            <div>
              <label>Start date: </label>
              <TextField
                error={error.startDate}
                onChange={handleChangeForm}
                type="date"
                helperText={error.startDate ? error.startDate : ""}
                defaultValue={eventEdit?.startDate}
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
              defaultValue={eventEdit?.title}
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
