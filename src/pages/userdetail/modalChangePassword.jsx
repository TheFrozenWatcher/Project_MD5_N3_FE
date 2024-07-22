import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/userService";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalChangePassword({ open, handleToggleModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie = new Cookies()
  const [changePassword, setChangPassword] = React.useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const [error, setError] = React.useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const handleLogOut = () => {
    cookie.remove("type");
    cookie.remove("user");
    cookie.remove("accessToken");
    cookie.set("isLogin", false);
    navigate("/login");
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (
      changePassword.OldPassword !== "" &&
      changePassword.NewPassword !== "" &&
      changePassword.ConfirmPassword !== "" &&
      error.OldPassword === "" &&
      error.NewPassword === "" &&
      error.ConfirmPassword === ""
    ) {
      dispatch(
        updatePassword({
          oldPassword: changePassword.OldPassword,
          newPassword: changePassword.NewPassword,
          confirmPassword: changePassword.ConfirmPassword,
        })
      )
      .then((res) => {
        console.log(res);
        if (res.payload !== undefined) {
          handleToggleModal();
          Swal.fire({
            title: "Success",
            text: "Change password successfully",
            icon: "success"
          }).then(() => {
            handleLogOut();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      if (!changePassword.OldPassword) {
        setError((prev) => ({
          ...prev,
          Username: "Old password must not be empty",
        }));
      }
      if (!changePassword.NewPassword) {
        setError((prev) => ({
          ...prev,
          Password: "New Password must not be empty",
        }));
      }
      if (!changePassword.ConfirmPassword) {
        setError((prev) => ({
          ...prev,
          Password: "Confirm password must not be empty",
        }));
      }
    }
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setChangPassword({ ...changePassword, [name]: value });

    if (value !== "") {
      setError({ ...error, [name]: "" });
    } else {
      setError({ ...error, [name]: `${name} must not be empty` });
    }
    if (name === "ConfirmPassword" && value !== changePassword.NewPassword) {
      if (value === "") {
        setError({ ...error, [name]: `Confirm password must not be empty` });
      } else {
        setError({ ...error, [name]: `Confirm password not match` });
      }
    }
    console.log(changePassword);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleToggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          <form className="flex" onSubmit={handleChangePassword}>
            <div>
              <TextField
                error={error.OldPassword}
                id="filled-error-helper-text"
                label="Old Password"
                helperText={error.OldPassword ? "Phone must not be empty" : ""}
                variant="standard"
                name="OldPassword"
                onChange={handleChangeForm}
                type="password"
              />
              <TextField
                error={error.NewPassword}
                id="filled-error-helper-text"
                label="New Password"
                helperText={error.NewPassword ? "Phone must not be empty" : ""}
                variant="standard"
                name="NewPassword"
                onChange={handleChangeForm}
                type="password"
              />
              <TextField
                error={error.ConfirmPassword}
                id="filled-error-helper-text"
                label="Confirm Password"
                helperText={error.ConfirmPassword ? error.ConfirmPassword : ""}
                variant="standard"
                name="ConfirmPassword"
                onChange={handleChangeForm}
                type="password"
              />
            </div>
            <Button variant="contained" type="submit">
              Change Password
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
