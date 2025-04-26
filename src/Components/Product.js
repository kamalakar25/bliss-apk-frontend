import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Modal,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const BASE_URL = process.env.REACT_APP_API_URL;

// Styled component for hover effects
const StyledCard = styled(Card)(({ theme }) => ({
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[10],
  },
  transition: 'transform 0.2s, box-shadow 0.2s',
}));

// Styled component for the modal
const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: theme.shadows[24],
  p: 4,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2 || isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    console.warn('Invalid coordinates for distance calculation:', { lat1, lon1, lat2, lon2 });
    return null;
  }
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return parseFloat(distance.toFixed(1)); // Return distance in km with 1 decimal place
};

// Convert decimal degrees to DMS format
const decimalToDMS = (decimal, isLat) => {
  const direction = isLat ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'W');
  const absDecimal = Math.abs(decimal);
  const degrees = Math.floor(absDecimal);
  const minutesFloat = (absDecimal - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = ((minutesFloat - minutes) * 60).toFixed(1);
  return `${degrees}°${minutes}'${seconds}"${direction}`;
};

// Convert DMS to decimal degrees
const dmsToDecimal = (dms) => {
  const match = dms.match(/(\d+)°(\d+)'([\d.]+)"([NS])\s*(\d+)°(\d+)'([\d.]+)"([EW])/i);
  if (!match) {
    return null;
  }
  const [, degLat, minLat, secLat, dirLat, degLon, minLon, secLon, dirLon] = match;
  const lat = parseFloat(degLat) + parseFloat(minLat) / 60 + parseFloat(secLat) / 3600;
  const lon = parseFloat(degLon) + parseFloat(minLon) / 60 + parseFloat(secLon) / 3600;
  return {
    lat: dirLat.toUpperCase() === 'N' ? lat : -lat,
    lon: dirLon.toUpperCase() === 'E' ? lon : -lon,
  };
};

const ParlorCard = ({ parlor, onImageClick, userLocation }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Parse location to extract lat and lon
  const parseLocation = (location) => {
    if (!location || typeof location !== 'string') {
      console.warn(`Invalid or missing location: ${location}`);
      return null;
    }
    const match = location.match(/Lat:\s*([\d.-]+),\s*Lon:\s*([\d.-]+)/i);
    if (!match) {
      console.warn(`Invalid location format: ${location}`);
      return null;
    }
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    if (isNaN(lat) || isNaN(lon)) {
      console.warn(`Invalid coordinates: Lat=${match[1]}, Lon=${match[2]}`);
      return null;
    }
    return { lat, lon };
  };

  // Generate Google Maps URL
  const getGoogleMapsUrl = (location) => {
    const coords = parseLocation(location);
    if (!coords) return '#';
    return `https://www.google.com/maps?q=${coords.lat},${coords.lon}`;
  };

  // Calculate and format distance display
  const getDistanceDisplay = () => {
    if (!userLocation) {
      return 'Please set your location';
    }
    if (!parlor.location) {
      console.log('Missing parlor location:', parlor);
      return 'Unknown';
    }
    const parlorCoords = parseLocation(parlor.location);
    if (!parlorCoords) return 'Invalid parlor location';
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lon,
      parlorCoords.lat,
      parlorCoords.lon
    );
    if (distance === null) {
      console.warn(`Distance calculation failed for parlor: ${parlor.name}`);
      return 'Unknown';
    }
    return `${distance} km`;
  };

  // Handle modal open/close
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setCredentials({ identifier: '', password: '' });
    setError('');
  };

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle login form submission
// Handle login form submission
const handleLogin = async (e) => {
  e.preventDefault();
  const { identifier, password } = credentials;

  if (!identifier || !password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/login`,
      {
        identifier,
        password,
        role: 'User', // Hardcoding role to 'User' for this modal
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // Axios automatically parses JSON, so response.data contains the parsed response
    const data = response.data;

    if (response.status === 200) {
      // Successful login
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', identifier);
      localStorage.setItem('userRole', 'User');
      handleCloseModal();
      // Navigate to payment page with parlor data
      navigate('/bookslot', { state: { parlor } });
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError(err.response?.data?.message || 'Server error');
  }
};

  // Handle booking/.
  const handleBooking = async () => {
    try {
      const email1 = localStorage.getItem('email');
  
      if (!email1) {
        alert('Login data not found. Please login first.');
        handleOpenModal(); // Open modal instead of navigating
        return;
      }
  
      const response = await axios.get(`${BASE_URL}/api/users/check/login/${email1}`);
  
      if (response.status === 200 && response.data.loginData) {
        // Pass parlor data to the payment page
        navigate('/bookslot', { state: { parlor } });
      } else {
        alert('Login data not found. Please login first.');
        handleOpenModal(); // Open modal instead of navigating
      }
    } catch (error) {
      console.error('Login check failed:', error);
      alert(`Something went wrong: ${error.message || error}`);
      handleOpenModal(); // Open modal on error
    }
  };

  return (
    <>
      <StyledCard sx={{ maxWidth: 300, m: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={parlor.image}
          alt={parlor.name}
          onClick={() => onImageClick(parlor)}
          sx={{ cursor: 'pointer' }}
        />
        <CardContent>
          <Typography variant="h6">
            {parlor.name} || {parlor.designation}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {parlor.service} | ₹{parlor.price}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'red' }}>
            {parlor.style}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2">{parlor.rating}</Typography>
            <i className="fa fa-star" style={{ marginLeft: '4px', color: '#fbc02d' }}></i>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Distance: {getDistanceDisplay()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button size="small" variant="contained" onClick={handleBooking}>
              Book
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => window.open(getGoogleMapsUrl(parlor.location), '_blank')}
              startIcon={<i className="fa fa-location-dot"></i>}
            >
              Direction
            </Button>
          </Box>
        </CardContent>
      </StyledCard>

      {/* Login Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="login-modal-title"
        sx={{
          backdropFilter: 'blur(5px)',
        }}
      >
        <ModalContent
          sx={{
            backgroundColor: 'rgb(232, 240, 253)',
            padding: '20px',
          }}
        >
          <Typography id="login-modal-title" variant="h5" component="h2" textAlign="center">
            User Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email or Phone"
              variant="outlined"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2', fontSize: 14 }}>
                Forgot Password?
              </Link>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
            <Typography textAlign="center" fontSize={14} mt={2}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Sign up
              </Link>
            </Typography>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

const Product = () => {
  const [selectedParlor, setSelectedParlor] = useState(null);
  const [detailedParlor, setDetailedParlor] = useState(null);
  const [beautyParlors, setBeautyParlors] = useState([]);
  const [filteredParlors, setFilteredParlors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);
  
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Role-based service options
  const roleOptions = {
    Salon: ['HairCut', 'Facial', 'HairColor', 'Shaving'],
    Beauty_Parler: ['HairCut', 'Bridal', 'Waxing', 'Pedicure'],
    Doctor: ['Hair Treatment', 'Skin Treatment'],
  };

  // Combined services for "All Products"
  const allServices = Array.from(
    new Set([
      ...roleOptions.Salon,
      ...roleOptions.Beauty_Parler,
      ...roleOptions.Doctor,
    ])
  );

  // Rating options for dropdown
  const ratingOptions = [
    { value: 0, label: 'All Ratings', stars: '' },
    { value: 1, label: '1+', stars: '★' },
    { value: 2, label: '2+', stars: '★★' },
    { value: 3, label: '3+', stars: '★★★' },
    { value: 4, label: '4+', stars: '★★★★' },
    { value: 5, label: '5', stars: '★★★★★' },
  ];

  // Get designation and service from navigation state or URL path
  const getActiveDesignation = () => {
    if (location.state?.designation) {
      return location.state.designation;
    }
    const path = location.pathname.toLowerCase();
    if (path.includes('salon')) return 'Salon';
    if (path.includes('beauty')) return 'Beauty_Parler';
    if (path.includes('skincare')) return 'Doctor';
    return '';
  };

  // Parse location input (DMS or Lat, Lon format)
  const parseLocationInput = (input) => {
    const dmsCoords = dmsToDecimal(input);
    if (dmsCoords) {
      return dmsCoords;
    }
    const coordMatch = input.match(/Lat:\s*([\d.-]+),\s*Lon:\s*([\d.-]+)/i);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lon = parseFloat(coordMatch[2]);
      if (!isNaN(lat) && !isNaN(lon)) {
        return { lat, lon };
      }
    }
    return null;
  };

  // Generate Google Maps URL from coordinates
  const getGoogleMapsUrlFromCoords = (lat, lon) => {
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      return '#';
    }
    return `https://www.google.com/maps?q=${lat},${lon}`;
  };

  // Get current location automatically
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lon: longitude };
          setUserLocation(newLocation);
          const latDMS = decimalToDMS(latitude, true);
          const lonDMS = decimalToDMS(longitude, false);
          setLocationInput(`${latDMS} ${lonDMS}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to get location. Please enter manually.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location permission denied. Please enable it or enter manually.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = 'Location unavailable. Please enter manually.';
          }
          alert(errorMessage);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle manual location input
  const handleLocationInputChange = (e) => {
    const input = e.target.value;
    setLocationInput(input);
    const parsed = parseLocationInput(input);
    setUserLocation(parsed);
  };

  // Generate Google Maps URL for user location
  const getUserGoogleMapsUrl = () => {
    const coords = parseLocationInput(locationInput);
    if (coords) {
      return getGoogleMapsUrlFromCoords(coords.lat, coords.lon);
    }
    return '#';
  };

  // Fetch data from backend and get location on mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/users/cards/services`)
      .then((response) => {
        const parsed = response.data.map((item, index) => ({
          id: index + 1,
          name: item.shopName || 'No Name',
          image: item.shopImage ? `${BASE_URL}/${item.shopImage}` : 'placeholder.jpg',
          location: item.location || null,
          service: item.serviceName || 'Service',
          rating: item.rating || 0,
          style: item.style || 'No Style',
          email: item.email || 'No Email',
          price: item.price || 0,
          designation: item.designation || 'Salon',
        }));
          
        
        setBeautyParlors(parsed);
        setFilteredParlors(parsed);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

    getCurrentLocation();
  }, []);

  // Update active designation and service when path or state changes
  useEffect(() => {
    const newDesignation = getActiveDesignation();
    const newService = location.state?.service || '';
    setDesignationFilter(newDesignation);
    setServiceFilter(newService);
  }, [location.pathname, location.state]);

  // Apply filters
  useEffect(() => {
    let filtered = beautyParlors;

    if (designationFilter && designationFilter !== 'All Products') {
      filtered = filtered.filter((parlor) => parlor.designation === designationFilter);
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter((parlor) => parlor.rating >= ratingFilter);
    }

    if (distanceFilter !== 'all' && userLocation) {
      filtered = filtered.filter((parlor) => {
        const match = parlor.location?.match(/Lat:\s*([\d.-]+),\s*Lon:\s*([\d.-]+)/i);
        if (!match) {
          return false;
        }
        const parlorLat = parseFloat(match[1]);
        const parlorLon = parseFloat(match[2]);
        if (isNaN(parlorLat) || isNaN(parlorLon)) {
          return false;
        }
        const dist = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          parlorLat,
          parlorLon
        );
        if (dist === null) return false;
        if (distanceFilter === '0-1') return dist <= 1;
        if (distanceFilter === '0-3') return dist > 0 && dist <= 3;
        if (distanceFilter === '0-5') return dist > 0 && dist <= 5;
        if (distanceFilter === 'more') return dist > 0;
        return true;
      });
    }

    if (serviceFilter) {
      filtered = filtered.filter((parlor) => parlor.service === serviceFilter);
    }

    setFilteredParlors(filtered);
  }, [beautyParlors, designationFilter, ratingFilter, distanceFilter, serviceFilter, userLocation]);

  // Handle filter changes
  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistanceFilter(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServiceFilter(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignationFilter(event.target.value);
    setServiceFilter('');
  };

  return (
    <Box
      sx={{
        bgcolor: 'linear-gradient(135deg, #f7e9f5 0%, #d5e8f7 100%)',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            color: 'transparent',
            background: 'linear-gradient(45deg, #9b59b6, #3498db)',
            WebkitBackgroundClip: 'text',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem', lg: '4rem' },
          }}
        >
          Our Services
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Your Location (DMS or Lat, Lon)"
              value={locationInput}
              onChange={handleLocationInputChange}
              sx={{ minWidth: 300 }}
              placeholder="e.g., 17°20'53.5N 78°33'24.7E"
            />
            <IconButton
              onClick={() => window.open(getUserGoogleMapsUrl(), '_blank')}
              disabled={!parseLocationInput(locationInput)}
              color="primary"
            >
              <i className="fa fa-map"></i>
            </IconButton>
          </Box>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Designation</InputLabel>
            <Select
              value={designationFilter}
              onChange={handleDesignationChange}
              label="Designation"
            >
              <MenuItem value="All Products">All Products</MenuItem>
              <MenuItem value="Salon">Salon</MenuItem>
              <MenuItem value="Beauty_Parler">Beauty Parlor</MenuItem>
              <MenuItem value="Doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={ratingFilter}
              onChange={handleRatingChange}
              label="Rating"
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#fbc02d', mr: 1 }}>
                      {option.stars}
                    </Typography>
                    <Typography>{option.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Distance</InputLabel>
            <Select value={distanceFilter} onChange={handleDistanceChange} label="Distance">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="0-1">0-1 km</MenuItem>
              <MenuItem value="0-3">0-3 km</MenuItem>
              <MenuItem value="0-5">0-5 km</MenuItem>
              <MenuItem value="more">More than 5 km</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Service</InputLabel>
            <Select value={serviceFilter} onChange={handleServiceChange} label="Service">
              <MenuItem value="">All Services</MenuItem>
              {(designationFilter === 'All Products' ? allServices : roleOptions[designationFilter] || []).map(
                (service) => (
                  <MenuItem key={service} value={service}>
                    {service}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <Typography variant="h6" align="center">
              Loading...
            </Typography>
          ) : filteredParlors.length === 0 ? (
            <Typography variant="h6" align="center">
              Services Not Found
            </Typography>
          ) : (
            filteredParlors.map((parlor) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={parlor.id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ParlorCard
                  parlor={parlor}
                  onImageClick={setDetailedParlor}
                  userLocation={userLocation}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;