import React, { useState } from "react";
import "./index";
import "./index.scss";
import { Button, styled, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { formAxios } from "../../api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
export default function CreateAccount() {
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
  const [formRegister, setFormRegister] = useState({
    FullName: "",
    Email: "",
    Password: "",
    Phone: "",
    Username: "",
  });
  const [error, setError] = useState({
    FullName: "",
    Email: "",
    Password: "",
    Phone: "",
    Username: "",
  });
  const [avatar, setAvatar] = useState(null);
 const navigate = useNavigate()
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
    if (value !== "") {
      setError({ ...error, [name]: "" });
    } else {
      setError({ ...error, [name]: name + " must be not empty" });
    }
    console.log(formRegister);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      formRegister.FullName !== "" &&
      formRegister.Email !== "" &&
      formRegister.Password !== "" &&
      formRegister.Phone !== "" &&
      formRegister.Username !== ""
    ) {
      const formData = new FormData();
      console.log(formRegister);
      formData.append("fullName", formRegister.FullName);
      formData.append("email", formRegister.Email);
      formData.append("password", formRegister.Password);
      formData.append("username", formRegister.Username);
      formData.append("phone", formRegister.Phone);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      console.log(formData);
      await axios
        .post("http://localhost:8080/api/v1/auth/sign-up", formData)
        .then((resp) =>
          Swal.fire({
            title: "Sign up Success!",
            icon: "success",
          }).then(() => navigate("/login"))
        )
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Sign up Failed",
            text: Object.values(err?.response?.data?.content).join(", "),
          })
        );
    } else {
      if (!formRegister.FullName) {
        setError((prev) => ({
          ...prev,
          fullName: "FullName must not be empty",
        }));
      }
      if (!formRegister.Email) {
        setError((prev) => ({ ...prev, email: "Email must not be empty" }));
      }
      if (!formRegister.Password) {
        setError((prev) => ({
          ...prev,
          password: "Password must not be empty",
        }));
      }
    }
  };
  const handleChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };
  return (
    <>
  <Header/>
      <main>
        <div className="signup-container">
          <div className="image-section">
            <img
              src="https://b.kisscc0.com/20240629/74/21/A76QQZ7J2.webp"
              alt="Shopping"
            />
          </div>
          <div className="form-section">
            <h2>Create an account</h2>
            <form onSubmit={handleRegister}>
              <TextField
                error={error.FullName}
                label={error.FullName}
                onChange={handleChangeForm}
                type="text"
                placeholder="Name"
                name="FullName"
              />
              <TextField
                error={error.Phone}
                label={error.Phone}
                onChange={handleChangeForm}
                type="text"
                placeholder="Phone Number"
                name="Phone"
              />
              <TextField
                error={error.Email}
                label={error.Email}
                onChange={handleChangeForm}
                type="text"
                placeholder="Email"
                name="Email"
              />
              <TextField
                error={error.Username}
                label={error.Username}
                onChange={handleChangeForm}
                type="text"
                placeholder="UserName"
                name="Username"
              />
              <TextField
                error={error.Password}
                label={error.Password}
                onChange={handleChangeForm}
                type="password"
                placeholder="Password"
                name="Password"
              />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  onChange={handleChangeAvatar}
                  type="file"
                />
              </Button>
              <button type="submit">Create Account</button>
              <button type="button" className="google-signup">
                Sign up with Google
              </button>
            </form>
            <p>
              Already have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
        </div>
      </main>
  <Footer/>
    </>
  );
}
