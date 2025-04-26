import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  keyframes,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Define the keyframes for form animation
const formAnimation = keyframes`
  from {
    transform: rotateX(-30deg);
    opacity: 0;
  }
  to {
    transform: rotateX(0deg);
    opacity: 1;
  }
`;

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const Login = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({ identifier: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'identifier' && /^[0-9]/.test(value)) {
      newValue = value.replace(/\D/g, '');
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }
    }

    setForm({ ...form, [name]: newValue });

    if (name === 'identifier') {
      let error = '';
      if (!newValue) {
        error = 'Email or Phone is required';
      } else if (/^[0-9]/.test(newValue)) {
        if (!mobileRegex.test(newValue)) {
          error = 'Invalid mobile number. Must be exactly 10 digits starting with 6-9.';
        }
      } else {
        if (!emailRegex.test(newValue)) {
          error = 'Invalid email format.';
        }
      }
      setErrors((prev) => ({ ...prev, identifier: error }));
    }

    if (name === 'password') {
      let error = '';
      if (!newValue) {
        error = 'Password is required';
      } else if (newValue.length < 8) {
        error = 'Password must be at least 8 characters';
      } else if (!passwordRegex.test(newValue)) {
        error =
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      }
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'identifier') {
      let error = '';
      if (!value) {
        error = 'Email or Phone is required';
      } else if (/^[0-9]/.test(value)) {
        if (!mobileRegex.test(value)) {
          error = 'Invalid mobile number. Must be exactly 10 digits starting with 6-9.';
        }
      } else {
        if (!emailRegex.test(value)) {
          error = 'Invalid email format.';
        }
      }
      setErrors((prev) => ({ ...prev, identifier: error }));
    }

    if (name === 'password') {
      let error = '';
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 8) {
        error = 'Password must be at least 8 characters';
      } else if (!passwordRegex.test(value)) {
        error =
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      }
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'Admin') {
      setForm({ identifier: 'admin@gmail.com', password: 'Admin@123' });
      setErrors({ identifier: '', password: '' });
    } else {
      setForm({ identifier: '', password: '' });
      setErrors({ identifier: '', password: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = form;

    if (errors.identifier || errors.password || !identifier || !password) {
      alert('Please correct the errors in the form');
      return;
    }

    if (!selectedRole) {
      alert('Please select a role: User, Admin, or Service Provider');
      return;
    }

    if (selectedRole === 'Admin') {
      if (identifier === 'admin@gmail.com' && password === 'Admin@123') {
        alert('Admin login successful');
        localStorage.setItem('token', 'admin-token-placeholder');
        localStorage.setItem('email', identifier);
        localStorage.setItem('userRole', selectedRole);
        window.location.href = '/approvals';
        return;
      } else {
        alert('Invalid Admin credentials');
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: selectedRole }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', form.identifier);
        localStorage.setItem('userRole', selectedRole);

        if (selectedRole === 'User') {
          window.location.href = '/';
        } else if (selectedRole === 'ServiceProvider') {
          window.location.href = '/services';
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
        overflow: 'hidden',
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 2 }}
      >
        <Box
          component="form"
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: { xs: '20px', sm: '30px', md: '40px' },
            backgroundImage: 'linear-gradient(to bottom, rgb(135, 202, 211), rgb(97, 103, 105))',
            
            borderRadius: '10px',
            overflow: 'hidden',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-10deg)',
            transition: 'all 0.3s ease-in-out',
            boxShadow: `
              0px 2px 4px rgba(0, 0, 0, 0.4),
              0px 7px 13px -3px rgba(0, 0, 0, 0.3),
              0px -3px 0px inset rgba(0, 0, 0, 0.2)
            `,
            animation: `${formAnimation} 0.5s ease-in-out`,
            width: { xs: '90vw', sm: '350px', md: '400px' },
            maxWidth: '400px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            mb={1}
            sx={{
              color: '#black',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            Sign In
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
            {['User', 'ServiceProvider', 'Admin'].map((role) => (
              <Tooltip title={role === 'ServiceProvider' ? 'Service Provider' : role} arrow key={role}>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant={selectedRole === role ? 'contained' : 'outlined'}
                    onClick={() => handleRoleSelect(role)}
                    sx={{
                      padding: { xs: '8px 16px', sm: '10px 20px' },
                    
                      borderRadius: '5px',
                      backgroundColor: selectedRole === role ? '#0077be' : 'transparent',
                      color: '#fff',
                      fontSize: { xs: '14px', sm: '16px' },
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateX(-10deg)',
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: `
                        0px 2px 4px rgba(0, 0, 0, 0.4),
                        0px 7px 13px -3px rgba(0, 0, 0, 0.3),
                        0px -3px 0px inset rgba(0, 0, 0, 0.2)
                      `,
                      '&:hover': {
                        backgroundColor: '#0077be',
                        fontSize: { xs: '15px', sm: '17px' },
                        transform: 'scale(1.05) rotateY(20deg) rotateX(10deg)',
                        boxShadow: `
                          0px 2px 4px rgba(0, 0, 0, 0.4),
                          0px 7px 13px -3px rgba(0, 0, 0, 0.3),
                          0px -3px 0px inset rgba(0, 0, 0, 0.2)
                        `,
                      },
                    }}
                  >
                    {role === 'ServiceProvider' ? 'SP' : role}
                  </Button>
                </motion.div>
              </Tooltip>
            ))}
          </Stack>

          <TextField
            label="Email or Phone"
            variant="outlined"
            name="identifier"
            
            value={form.identifier}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
            fullWidth
            error={!!errors.identifier}
            helperText={errors.identifier}
            required
            disabled={isLoading}
            autoComplete="email"
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                borderRadius: '5px',
                marginBottom: '10px',
                backgroundColor: 'transparent',
                transition: 'border-color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                transformStyle: 'preserve-3d',
                color: '#black',
                boxShadow: `
                  0px 2px 4px rgba(0, 0, 0, 0.4),
                  0px 7px 13px -3px rgba(0, 0, 0, 0.3),
                  0px -3px 0px inset rgba(0, 0, 0, 0.2)
                `,
                '&:hover, &.Mui-focused': {
                  borderColor: '#black',
                 
                  transform: 'scale(1.05) rotateY(20deg)',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#black',
              },
              '& .MuiInputLabel-root': {
                color: '#black',
                '&.Mui-focused': {
                  color: '#black',
                },
              },
              '& .MuiFormHelperText-root': {
                color: '#black',
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            required
            disabled={isLoading}
            autoComplete="new-password"
            sx={{
              mb: 1,
              '& .MuiInputBase-root': {
                borderRadius: '5px',
                marginBottom: '10px',
                backgroundColor: 'transparent',
                transition: 'border-color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                transformStyle: 'preserve-3d',
                color: '#black',
                boxShadow: `
                  0px 2px 4px rgba(0, 0, 0, 0.4),
                  0px 7px 13px -3px rgba(0, 0, 0, 0.3),
                  0px -3px 0px inset rgba(0, 0, 0, 0.2)
                `,
                '&:hover, &.Mui-focused': {
                  borderColor: '#black',
                 
                  transform: 'scale(1.05) rotateY(20deg)',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#black',
              },
              '& .MuiInputLabel-root': {
                color: '#black',
                '&.Mui-focused': {
                  color: '#black',
                },
              },
              '& .MuiFormHelperText-root': {
                color: '#black',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
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

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
            }}
          >
            {/* <Link
              href="/forgot-password"
              underline="hover"
              sx={{
                fontSize: { xs: 12, sm: 13 },
                color: 'blue',
                '&:hover': {
                  color: 'white',
                  transition: 'color 0.3s ease',
                },
                mb: isMobile ? 1 : 0,
              }}
            >
              Forgot Password?
            </Link> */}
            <Link
              href="/signup"
              underline="hover"
              sx={{
                fontSize: { xs: 12, sm: 14 },
                color: 'blue',
                '&:hover': {
                  color: 'white',
                  transition: 'color 0.3s ease',
                },
              }}
            >
              Don't have an account? Sign up
            </Link>
          </Box>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              fullWidth
              sx={{
                padding: { xs: '8px 16px', sm: '10px 20px' },
                border: 'none',
                borderRadius: '5px',
                backgroundImage: 'linear-gradient(to right,rgb(65, 63, 63),rgb(145, 9, 9))',
                color: '#fff',
                fontSize: { xs: '14px', sm: '16px' },
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(-10deg)',
                transition: 'all 0.3s ease-in-out',
                boxShadow: `
                  0px 2px 4px rgba(0, 0, 0, 0.4),
                  0px 7px 13px -3px rgba(0, 0, 0, 0.3),
                  0px -3px 0px inset rgba(0, 0, 0, 0.2)
                `,
                '&:hover': {
                  backgroundColor: '#0077be',
                  fontSize: { xs: '15px', sm: '17px' },
                  transform: 'scale(1.05) rotateY(20deg) rotateX(10deg)',
                  boxShadow: `
                    0px 2px 4px rgba(0, 0, 0, 0.4),
                    0px 7px 13px -3px rgba(0, 0, 0, 0.3),
                    0px -3px 0px inset rgba(0, 0, 0, 0.2)
                  `,
                },
                '&:disabled': {
                  backgroundColor: '#b0bec5',
                  color: '#fff',
                  transform: 'rotateX(-10deg)',
                },
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Login;