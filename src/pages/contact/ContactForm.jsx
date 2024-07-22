import React from 'react';

import './ContactForm.scss';
import { Button, TextField } from '@mui/material';

const ContactForm = () => {
  return (
    <div className="contact-form-container flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <div className="mb-4">
          <TextField label="First name" variant="outlined" fullWidth />
        </div>
        <div className="mb-4">
          <TextField label="Last name" variant="outlined" fullWidth />
        </div>
        <div className="mb-4">
          <TextField label="Email address" type="email" variant="outlined" fullWidth />
        </div>
        <div className="mb-4">
          <TextField label="Phone number" variant="outlined" fullWidth />
        </div>
        <div className="mb-6">
          <TextField label="Message" variant="outlined" multiline rows={4} fullWidth />
        </div>
        <Button variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
