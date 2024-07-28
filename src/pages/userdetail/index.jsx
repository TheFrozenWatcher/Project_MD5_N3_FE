import React, { useState } from "react";
import "./index";
import "./index.scss";
import { Button, styled, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { editUser } from "../../services/userService";
import ModalChangePassword from "./modalChangePassword";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";

export default function UserDetail() {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const dispatch = useDispatch();
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

  const [userEdit, setUserEdit] = useState({
    FullName: user.fullName,
    Email: user.email,
    Phone: user.phone,
  });

  const [error, setError] = useState({
    FullName: "",
    Email: "",
    Phone: "",
  });
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUserEdit({ ...userEdit, [name]: value });

    if (value !== "") {
      setError({ ...error, [name]: "" });
    } else {
      setError({ ...error, [name]: `${name} must not be empty` });
    }
    console.log(userEdit);
  };
  const [avatar, setAvatar] = useState(null);
  const handleChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
    encodeImageFileAsURL(e.target.files[0]);
  };
  const [showAvatar, setShowAvatar] = useState(null);
  function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
      setShowAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const handleEditUser = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to edit your account?")) {
      const formEdit = new FormData();
      formEdit.append("fullName", userEdit.FullName);
      formEdit.append("email", userEdit.Email);
      formEdit.append("phone", userEdit.Phone);
      if (avatar) {
        formEdit.append("avatar", avatar);
      }
      console.log(formEdit);
      console.log(userEdit);
      dispatch(editUser(formEdit))
        .then((resp) => {
          console.log(resp);
          debugger;
          if (resp.payload?.response?.data?.message == "Error") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: resp.payload.response.data.content,
            });
            return;
          }
          cookie.set("user", resp.payload.content);
          Swal.fire({
            title: "Success",
            text: "Update Successfully",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // console.log(user);
  const [open, setOpen] = React.useState(false);
  const handleToggleModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <Header />
      <main>
        <div className="signup-container">
          <div className="image-section w-96">
            <img src={showAvatar ? showAvatar : user.avatar} alt="Shopping" />
          </div>
          <div className="form-section">
            <h2>Your Information</h2>
            <form onSubmit={handleEditUser}>
              <TextField
                error={error.FullName}
                id="filled-error-helper-text"
                label="Full Name"
                helperText={error.FullName ? "Full Name must not be empty" : ""}
                variant="standard"
                defaultValue={user?.fullName}
                name="FullName"
                onChange={handleChangeForm}
              />
              <TextField
                error={error.Email}
                id="filled-error-helper-text"
                label="Email"
                helperText={error.Email ? "Email must not be empty" : ""}
                variant="standard"
                defaultValue={user?.email}
                name="Email"
                onChange={handleChangeForm}
              />
              <TextField
                error={error.Phone}
                id="filled-error-helper-text"
                label="Phone"
                helperText={error.Phone ? "Phone must not be empty" : ""}
                variant="standard"
                defaultValue={user?.phone}
                name="Phone"
                onChange={handleChangeForm}
              />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Avatar
                <VisuallyHiddenInput
                  onChange={handleChangeAvatar}
                  type="file"
                />
              </Button>
              <Button onClick={handleToggleModal}>Change Password</Button>
              <button type="submit">Update Information</button>
            </form>
          </div>
        </div>
      </main>
      <ModalChangePassword open={open} handleToggleModal={handleToggleModal} />
      <Footer />
    </>
  );
}
