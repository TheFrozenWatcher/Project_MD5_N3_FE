// import React from 'react';

// import './ContactForm.scss';
// import { Button, TextField } from '@mui/material';

// const ContactForm = () => {
//   return (
//     <div className="contact-form-container flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//       <form className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
//         <div className="mb-4">
//           <TextField label="First name" variant="outlined" fullWidth />
//         </div>
//         <div className="mb-4">
//           <TextField label="Last name" variant="outlined" fullWidth />
//         </div>
//         <div className="mb-4">
//           <TextField label="Email address" type="email" variant="outlined" fullWidth />
//         </div>
//         <div className="mb-4">
//           <TextField label="Phone number" variant="outlined" fullWidth />
//         </div>
//         <div className="mb-6">
//           <TextField label="Message" variant="outlined" multiline rows={4} fullWidth />
//         </div>
//         <Button variant="contained" color="primary" fullWidth>
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Phone, Email } from '@mui/icons-material';
import './ContactForm.scss';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const ContactForm = () => {
  return (
    <>
    <Header/>
     <div className="contact-page container mx-auto p-4 flex flex-col md:flex-row justify-between">
      <div className="contact-info p-4 border rounded shadow-md">
        <Box display="flex" alignItems="center" mb={2}>
          <Phone className="text-red-500 mr-2" />
          <Typography variant="h6" component="h6">Call To Us</Typography>
        </Box>
        <Typography variant="body1" component="p">
          We are available 24/7, 7 days a week. <br />
          Phone: +8412345678
        </Typography>
        <hr className="my-4" />
        <Box display="flex" alignItems="center" mb={2}>
          <Email className="text-red-500 mr-2" />
          <Typography variant="h6" component="h6">Write To Us</Typography>
        </Box>
        <Typography variant="body1" component="p">
          Fill out our form and we will contact you within 24 hours. <br />
          Emails: <br />
          customer@gmail.com <br />
          support@gmail.com
        </Typography>
      </div>
      <div className="contact-form p-4 border rounded shadow-md mt-4 md:mt-0">
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Your Name *"
            variant="outlined"
            size="small"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your Email *"
            variant="outlined"
            size="small"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your Phone *"
            variant="outlined"
            size="small"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your Message"
            variant="outlined"
            size="small"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="secondary"
            className="mt-4"
            fullWidth
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default ContactForm;

