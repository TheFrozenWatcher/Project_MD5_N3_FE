import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addBanner, getAllBanners } from "../../../services/adminService";
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
export default function ModalAddBanner({ handleToggleModal, open }) {
  const dispatch = useDispatch();
  const [banner, setBanner] = React.useState({
    bannerName: "",
    description: "",
  });
  const [error, setError] = React.useState("");
  const [image, setImage] = React.useState(null);
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setBanner({ ...banner, [name]: value });
    if (name === "bannerName" && value !== "") {
      setError("");
    } else {
      setError("Banner name must not be empty");
    }
    console.log(banner);
  };
  const handleAddBanner = (e) => {
    e.preventDefault();
    const formAddBanner = new FormData();
    formAddBanner.append("bannerName", banner.bannerName);
    formAddBanner.append("description", banner.description);
    if (image) {
      formAddBanner.append("image", image);
    }
    console.log(banner);
    if (banner.bannerName !== "") {
      dispatch(addBanner(formAddBanner))
        .then((res) => {
          console.log(res);
          handleToggleModal().then(() => {
            Swal.fire({
              title: "Success",
              text: "Add banner successfully",
              icon: "success",
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={handleToggleModal}>
        Add Banner
      </Button>
      <Modal
        open={open}
        onClose={handleToggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleAddBanner}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Banner
            </Typography>
            <TextField
              error={error}
              label="Banner Name"
              onChange={handleChangeForm}
              type="text"
              placeholder="Name"
              helperText={error ? "Banner name must not be empty" : ""}
              name="bannerName"
            />
            <TextField
              label="Description"
              onChange={handleChangeForm}
              type="text"
              placeholder="Name"
              name="description"
              multiline
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput onChange={handleChangeImage} type="file" />
            </Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
