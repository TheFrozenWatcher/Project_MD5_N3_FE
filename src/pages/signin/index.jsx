import React, { useState } from "react";
import "./index";
import "./index.scss";
import { Button, styled, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { formAxios } from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
      formData.append("avatar", avatar);
      console.log(formData);
      await axios
        .post("auth/sign-up", formData)
        .then((resp) =>
          Swal.fire({
            title: "Login Success!",
            icon: "success",
          }).then(() => navigate("/login"))
        )
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Sign up Failed",
            text: Object.values(err.response.data.content).join(", "),
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
      <header>
        <div className="top-banner">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <a href="#">ShopNow</a>
        </div>
        <nav>
          <div className="logo">Exclusive</div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="What are you looking for?" />
          </div>
        </nav>
      </header>
      <main>
        <div className="signup-container">
          <div className="image-section">
            <img
              src="https://via.placeholder.com/400x400.png?text=Shopping"
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
              Already have an account? <a href="#">Log in</a>
            </p>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-content">
          <div className="subscribe">
            <h3>Subscribe</h3>
            <p>Get 10% off your first order</p>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="support">
            <h3>Support</h3>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</p>
            <p>Email: exclusive@gmail.com</p>
            <p>Phone: +88015-88888-9999</p>
          </div>
          <div className="account">
            <h3>Account</h3>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Login / Register</a>
              </li>
              <li>
                <a href="#">Cart</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
            </ul>
          </div>
          <div className="quick-links">
            <h3>Quick Link</h3>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="download-app">
            <h3>Download App</h3>
            <p>Save $3 with App New User Only</p>
            <div className="app-links">
              <a href="https://play.google.com/store/apps">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                />
              </a>
              <a href="https://www.apple.com/app-store/">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                />
              </a>
            </div>
            <div className="social-links">
              <a href="https://www.facebook.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  width={30}
                />
              </a>
              <a href="https://www.twitter.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg"
                  alt="Twitter"
                  width={30}
                />
              </a>
              <a href="https://www.instagram.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  width={30}
                />
              </a>
              <a href="https://www.linkedin.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
                  alt="LinkedIn"
                  width={30}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
