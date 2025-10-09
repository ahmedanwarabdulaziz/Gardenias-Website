'use client';

import { useState } from 'react';
import { Box, TextField, Button, Alert, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { PaperPlaneTilt } from 'phosphor-react';

const subjectOptions = [
  'Appointment',
  'General Inquiry',
  'Insurance',
  'Feedback',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    try {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setError(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError(true);
      setSubmitted(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      subject: e.target.value,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {submitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for contacting us! We&apos;ll get back to you within one business day.
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Something went wrong. Please try again or call us directly.
        </Alert>
      )}

      <TextField
        fullWidth
        label="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#008d80',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#008d80',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#008d80',
          },
        }}
      />

      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#008d80',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#008d80',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#008d80',
          },
        }}
      />

      <TextField
        fullWidth
        label="Phone Number (Optional)"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#008d80',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#008d80',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#008d80',
          },
        }}
      />

      <FormControl 
        fullWidth 
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#008d80',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#008d80',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#008d80',
          },
        }}
      >
        <InputLabel id="subject-label">Subject</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          name="subject"
          value={formData.subject}
          label="Subject"
          onChange={handleSelectChange}
        >
          {subjectOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        multiline
        rows={6}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#008d80',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#008d80',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#008d80',
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<PaperPlaneTilt size={20} weight="fill" />}
        sx={{
          bgcolor: '#008d80',
          color: 'white',
          py: 2,
          px: 4,
          borderRadius: '50px',
          fontFamily: '"Source Sans Pro", sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          textTransform: 'none',
          boxShadow: '0 8px 24px rgba(0,141,128,0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: '#007067',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 32px rgba(0,141,128,0.5)',
          },
        }}
      >
        Send Message
      </Button>
    </Box>
  );
}

