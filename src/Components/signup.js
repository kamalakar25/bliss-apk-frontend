import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  keyframes,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const BASE_URL = process.env.REACT_APP_API_URL;

const formAnimation = keyframes`
  from { transform: rotateX(-30deg); opacity: 0; }
  to { transform: rotateX(0deg); opacity: 1; }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function SignupForm() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
    dob: '',
    designation: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    location: '',
    manPower: [],
    services: [],
    fromTime: '',
    toTime: '',
  });

  const [errors, setErrors] = useState({});
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAdvanced(form.designation !== 'User');
  }, [form.designation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({
          ...prev,
          location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
        }));
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get location. Please try again or enter manually.');
      }
    );
  };

  const handleSubmit = async () => {
    const payload =
      form.designation.toLowerCase() === 'user'
        ? {
            name: form.name,
            email: form.email,
            gender: form.gender,
            phone: form.phone,
            dob: form.dob,
            designation: form.designation,
            password: form.password,
            bookings: [],
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            gender: form.gender,
            dob: form.dob,
            phone: form.phone,
            designation: form.designation,
            shopName: form.shopName,
            location: form.location,
            manPower: form.manPower || [],
            services: form.services || [],
            availableTime: { fromTime: form.fromTime, toTime: form.toTime },
          };

    const endpoint =
      form.designation.toLowerCase() === 'user'
        ? `${BASE_URL}/api/users/register`
        : `${BASE_URL}/api/admin/register-admin`;

    try {
      setIsLoading(true);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${form.designation} ${data.message}`);
        navigate('/login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      const filteredValue = value.replace(/[0-9\s]/g, '');
      const isValid = /^[a-zA-Z]{2,50}$/.test(filteredValue);
      error = filteredValue
        ? isValid
          ? ''
          : 'Name must be 2-50 characters, letters only'
        : 'Name is required';
    }

    if (name === 'email') {
      const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(value);
      error = value ? (isValid ? '' : 'Enter a valid email address') : 'Email is required';
    }

    if (name === 'phone') {
      const cleanedValue = value.replace(/\s/g, '');
      if (cleanedValue === '') {
        error = 'Phone number is required';
      } else if (!/^[6-9]\d{9}$/.test(cleanedValue)) {
        error =
          cleanedValue.length !== 10
            ? 'Invalid phone number (must be 10 digits)'
            : 'Phone number must start with 6, 7, 8, or 9';
      }
    }

    if (name === 'dob') {
      const selectedDate = new Date(value);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 18);

      if (!value) {
        error = 'Date of birth is required';
      } else if (selectedDate > today) {
        error = 'Date of birth cannot be in the future';
      } else if (selectedDate > minDate) {
        error = 'You must be at least 18 years old';
      }
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      error = value
        ? passwordRegex.test(value)
          ? ''
          : 'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character (@$!%*?&)'
        : 'Password is required';
    }

    if (name === 'confirmPassword') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!value) {
        error = 'Confirm password is required';
      } else if (!passwordRegex.test(value)) {
        error =
          'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character (@$!%*?&)';
      } else if (value !== form.password) {
        error = 'Passwords do not match';
      }
    }

    if (name === 'shopName' && isAdvanced) {
      const filteredValue = value.replace(/[0-9\s]/g, '');
      const isValid = /^[a-zA-Z]{2,50}$/.test(filteredValue);
      error = filteredValue
        ? isValid
          ? ''
          : 'Shop Name must be 2-50 characters, letters only'
        : 'Shop Name is required';
    }

    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'name' || name === 'shopName') {
      newValue = value.replace(/[0-9\s]/g, '');
    }

    if (name === 'phone') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputSx = {
    mb: 1,
    '& .MuiInputBase-root': {
      borderRadius: '5px',
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease-in-out',
      transformStyle: 'preserve-3d',
      color: '#black',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), 0px -3px 0px inset rgba(0, 0, 0, 0.2)',
      '&:hover, &.Mui-focused': {
        borderColor: '#3b8df2',
        transform: 'scale(1.05) rotateY(20deg)',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
    '& .MuiInputBase-input::placeholder': { color: '#black' },
    '& .MuiInputLabel-root': { color: '#black', '&.Mui-focused': { color: '#black' } },
    '& .MuiFormHelperText-root': { color: '#black' },
  };

  const buttonSx = {
    height: 56,
    borderRadius: '5px',
    border: '2px solid rgb(153, 151, 144)',
   
    color: '#black',
    fontSize: { xs: '14px', sm: '16px' },
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    transform: 'rotateX(-10deg)',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), 0px -3px 0px inset rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundImage: 'linear-gradient(90deg,rgb(61, 61, 61),rgb(0, 0, 0))',
      fontSize: { xs: '15px', sm: '17px' },
     
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), 0px -3px 0px inset rgba(0, 0, 0, 0.2)',
    },
    '&:disabled': {
      backgroundColor: '#b0bec5',
      color: '#fff',
      transform: 'rotateX(-10deg)',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://images.pexels.com/photos/7750102/pexels-photo-7750102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ zIndex: 2 }}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: { xs: '20px', sm: '30px' },
            backgroundImage: 'linear-gradient(to bottom, rgb(135, 202, 211), rgb(97, 103, 105))',
            borderRadius: '10px',
            perspective: '1000px',
            transform: 'rotateX(-10deg)',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), 0px -3px 0px inset rgba(0, 0, 0, 0.2)',
            animation: `${formAnimation} 0.5s ease-in-out`,
            width: { xs: '90vw', sm: '400px' },
            maxWidth: '450px',
          }}
        >
          <Typography variant="h5" textAlign="center" mb={1} sx={{ color: '#black', fontWeight: 'bold' }}>
            Create Your Account
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={form.name}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.name}
            helperText={errors.name}
            disabled={isLoading}
            autoComplete="off"
            sx={inputSx}
            // color='black'
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={form.email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            autoComplete="off"
            sx={inputSx}
          />

          <TextField
            select
            variant="outlined"
            fullWidth
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            disabled={isLoading}
            sx={inputSx}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            name="phone"
            value={form.phone}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.phone}
            helperText={errors.phone}
            disabled={isLoading}
            inputProps={{ maxLength: 10 }}
            autoComplete="off"
            sx={inputSx}
          />

          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            name="dob"
            value={form.dob}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.dob}
            helperText={errors.dob}
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: new Date().toISOString().split('T')[0],
              min: new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0],
            }}
            autoComplete="off"
            sx={inputSx}
          />

          <TextField
            select
            variant="outlined"
            fullWidth
            label="Designation"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            disabled={isLoading}
            sx={inputSx}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Salon">Salon</MenuItem>
            <MenuItem value="Beauty_Parler">Beauty Parlor</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
          </TextField>

          {isAdvanced && (
            <>
              <TextField
                label="Shop Name"
                variant="outlined"
                fullWidth
                name="shopName"
                value={form.shopName}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.shopName}
                helperText={errors.shopName}
                disabled={isLoading}
                autoComplete="off"
                sx={inputSx}
              />

              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  disabled={true}
                  autoComplete="off"
                  sx={inputSx}
                />
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button variant="outlined" className='text-danger' onClick={handleGetLocation} disabled={isLoading} sx={buttonSx}>
                    Get <i className="fa-solid fa-location-dot " style={{ marginLeft: '8px' }}></i>
                  </Button>
                </motion.div>
              </Box>

              <TextField
                label="Shop Opening Time"
                type="time"
                variant="outlined"
                fullWidth
                name="fromTime"
                value={form.fromTime}
                onChange={handleChange}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                sx={inputSx}
              />

              <TextField
                label="Shop Closing Time"
                type="time"
                variant="outlined"
                fullWidth
                name="toTime"
                value={form.toTime}
                onChange={handleChange}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                sx={inputSx}
              />
            </>
          )}

          {(form.designation === 'User' || isAdvanced) && (
            <>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                name="password"
                value={form.password}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isLoading}
                autoComplete="new-password"
                sx={inputSx}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        disabled={isLoading}
                        sx={{ color: '#black' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={isLoading}
                autoComplete="new-password"
                sx={inputSx}
              />
            </>
          )}

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              fullWidth
              sx={{
                padding: { xs: '8px 16px', sm: '10px 20px' },
                borderRadius: '5px',
                backgroundImage: 'linear-gradient(to right,rgb(65, 63, 63),rgb(145, 9, 9))',
                color: '#black',
                fontSize: { xs: '14px', sm: '16px' },
                transform: 'rotateX(-10deg)',
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), 0px -3px 0px inset rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#black',
                  fontSize: { xs: '15px', sm: '17px' },
                  transform: 'scale(1.05) rotateY(20deg) rotateX(10deg)',
                },
                '&:disabled': { backgroundColor: '#black', color: '#black', transform: 'rotateX(-10deg)' },
              }}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              sx={{ fontSize: { xs: 12, sm: 14 }, color: 'blue', '&:hover': { color: 'white' } }}
            >
              Already have an account? Log In
            </MuiLink>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}