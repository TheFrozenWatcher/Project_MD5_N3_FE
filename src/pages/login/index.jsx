import React, { useState } from "react";
import "./index";
import "./index.scss";
import { Button, styled, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";

export default function Login() {
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
    Password: "",
    Username: "",
  });

  const [error, setError] = useState({
    Password: "",
    Username: "",
  });

  const navigate = useNavigate();

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });

    if (value !== "") {
      setError({ ...error, [name]: "" });
    } else {
      setError({ ...error, [name]: `${name} must not be empty` });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formRegister.Username !== "" && formRegister.Password !== "") {
      try {
        const resp = await axios.post("http://localhost:8080/api/v1/auth/sign-in", {
          username: formRegister.Username,
          password: formRegister.Password,
        });
        const users = resp.data.content;
        console.log(users);
 if (users.status) {
  Swal.fire({
    title: "Login Success!",
    icon: "success",
  }).then(() => {
    console.log(resp);
    const cookie = new Cookies();
    cookie.set("accessToken", users.token, {
      maxAge: 1 * 60*1000,
    });
    cookie.set("type", "Bearer", { maxAge: 1 * 60*1000 });
    cookie.set("isLogin", true, { maxAge: 1 * 60*1000 });
    cookie.set("user", users, { maxAge: 1 * 60*1000 });
    console.log(users)
    console.log(cookie.get("user"));
    localStorage.setItem("users", JSON.stringify(users));

    const isAdmin = resp.data.content.authorities
      .map((author) => author.authority)
      .some((author) => author === "ADMIN");

    isAdmin ? navigate("/admin") : navigate("/home");
  });
 } else{
  Swal.fire({
    icon: "error",
    title: "Sign In Failed",
    text: "Your account has been banned!",
  });
 }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: Object.values(err.response.data.content).join(""),
        });
      }
    } else {
      if (!formRegister.Username) {
        setError((prev) => ({ ...prev, Username: "Username must not be empty" }));
      }
      if (!formRegister.Password) {
        setError((prev) => ({ ...prev, Password: "Password must not be empty" }));
      }
    }
  };

  return (
    <>
     {new Cookies().get("isLogin")? <Navigate to={"/"}/>:
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
            <h2>Sign In</h2>
            <form onSubmit={handleRegister}>
              <TextField
                error={error.Username}
                label={error.Username}
                onChange={handleChangeForm}
                type="text"
                placeholder="Username"
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

              <button type="submit">Sign in</button>
              <button type="button" className="google-signup">
                Sign in with Google
              </button>
            </form>
            <p>
              Haven't have an account? <Link to={"/signup"}>Sign up</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer/>
     </>
     }
    </>
  );
}
