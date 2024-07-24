// import React from 'react';
// import { Modal, Box, TextField, Button, MenuItem, Typography } from '@mui/material';
// import './index.scss';

// const FeedbackModal = ({ open, handleClose }) => {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box className="modal-box">
//         <Typography variant="h5" component="h2" className="modal-title">Product Feedback</Typography>
//         <form className="feedback-form">
//           <TextField label="Name" variant="outlined" fullWidth margin="normal" required />
//           <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" required />
//           <TextField label="Product" variant="outlined" fullWidth margin="normal" required />
//           <TextField
//             select
//             label="Rating"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             required
//           >
//             <MenuItem value={5}>5 - Excellent</MenuItem>
//             <MenuItem value={4}>4 - Good</MenuItem>
//             <MenuItem value={3}>3 - Average</MenuItem>
//             <MenuItem value={2}>2 - Poor</MenuItem>
//             <MenuItem value={1}>1 - Very Poor</MenuItem>
//           </TextField>
//           <TextField
//             label="Comments"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             required
//           />
//           <Button variant="contained" color="primary" type="submit" className="submit-button">
//             Submit Feedback
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default FeedbackModal;


//cho vào component cha
// const [isModalOpen, setIsModalOpen] = React.useState(false);
// const handleOpenModal = () => {
//   setIsModalOpen(true);
// };

// const handleCloseModal = () => {
//   setIsModalOpen(false);
// };
// <Button variant="contained" color="primary" onClick={handleOpenModal}>
//         Give Feedback
//       </Button>
//       <FeedbackModal open={isModalOpen} handleClose={handleCloseModal} />

