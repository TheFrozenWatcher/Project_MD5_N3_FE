import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addBanner,
  editBanner,
  getAllBanners,
} from "../../../services/adminService";
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
export default function ModalEditBanner({
  openFormEdit,
  setOpenFormEdit,
  bannerEdit,
}) {
  const dispatch = useDispatch();
  const [banner, setBanner] = React.useState({
    bannerName: "",
    description: "",
  });
  const [showAvatar, setShowAvatar] = React.useState(null);
  const [error, setError] = React.useState("");
  const [image, setImage] = React.useState(null);

  function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
      setShowAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    encodeImageFileAsURL(e.target.files[0]);

  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setBanner({ ...banner, [name]: value });
    if (name === "bannerName" && value === "") {
      setError("Banner name must not be empty");
    } else {
      setError(""); 

    }
  };
  const handleEditBanner = (e) => {
    e.preventDefault();
    const formEditBanner = new FormData();
    formEditBanner.append("bannerName", banner.bannerName);
    formEditBanner.append("description", banner.description);
    formEditBanner.append("id", bannerEdit?.id);
    if (image) {
      formEditBanner.append("image", image);
    }
    if (banner.bannerName !== "") {
      dispatch(editBanner(formEditBanner))
        .then((res) => {
          console.log(res);
          handleToggleModal().then(() => {
            debugger
            Swal.fire({
              title: "Success",
              text: "Edit banner successfully",
              icon: "success",
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleToggleModal = () => {
    setOpenFormEdit(!openFormEdit);
    setShowAvatar(null)
  
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
          <form onSubmit={handleEditBanner}>
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
              defaultValue={bannerEdit?.bannerName}
            />
            <TextField
              label="Description"
              onChange={handleChangeForm}
              type="text"
              placeholder="Name"
              name="description"
              multiline
              defaultValue={bannerEdit?.description}
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
              Update
            </Button>
            <img className="w-[732px] h-[719px]" src={showAvatar} />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
