import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert,
  FormGroup,
  Modal,
  IconButton,
  Chip,
} from '@mui/material';
import { ExpandMore, ExpandLess, Close } from '@mui/icons-material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const BASE_URL = process.env.REACT_APP_API_URL;

const BookSlot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parlor = location.state?.parlor || {};

  // Define services based on designation
  const servicesByDesignation = {
    Salon: {
      'Hair Cut': [
        "Men's Haircut",
        "Women's Haircut",
        "Kids' Haircut",
        'Beard Trim',
        'Layered/Step Cut',
        'Fringe/Bangs Cut',
      ],
      Facial: [
        'Clean-Up Facial',
        'Fruit Facial',
        'Gold Facial',
        'Anti-Aging Facial',
        'Acne Control Facial',
        'Instant Glow Facial',
      ],
      'Hair Color': [
        'Root Touch-up',
        'Global Hair Color',
        'Highlights / Streaks',
        'Balayage',
        'Ombre',
        'Fashion Shades',
      ],
      Shaving: [
        'Regular Shave',
        'Luxury Shave (with hot towel)',
        'Beard Shaping',
        'Razor Finish',
        'Head Shaving',
      ],
    },
    Beauty_Parler: {
      'Hair Styling': [
        'Blow Dry',
        'Straightening',
        'Curling',
        'Hair Braiding',
        'Updos & Buns',
        'Temporary Hair Extensions',
      ],
      Bridal: [
        'Bridal Makeup (HD / Airbrush)',
        'Pre-Bridal Package',
        'Saree Draping',
        'Bridal Mehendi',
        'Bridal Hairdo',
      ],
      Waxing: [
        'Full Arms Waxing',
        'Full Legs Waxing',
        'Underarms Waxing',
        'Bikini Wax',
        'Full Body Wax',
        'Face Waxing (Upper Lip, Chin, Forehead)',
      ],
      Pedicure: [
        'Regular Pedicure',
        'Spa Pedicure',
        'Gel Pedicure',
        'Paraffin Pedicure',
        'French Pedicure',
        'Cracked Heel Treatment',
      ],
    },
    Doctor: {
      'Hair Treatments': [
        'PRP Therapy (Platelet-Rich Plasma)',
        'Hair Transplant',
        'Anti-Dandruff Treatment',
        'Hair Fall Control Therapy',
        'Laser Hair Regrowth',
        'Scalp Micropigmentation',
      ],
      'Skin Treatments': [
        'Chemical Peels',
        'Botox & Fillers',
        'Laser Hair Removal',
        'Pigmentation Treatment',
        'Acne Scar Removal',
        'Skin Rejuvenation Therapy',
        'Microneedling',
      ],
    },
  };

  // Initialize form data
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    service: parlor.service || '',
    amount: parlor.price || '',
    relatedServices: [],
    favoriteEmployee: '',
    duration: 60, // Base duration in minutes (1 hour)
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // State for manPower (employees)
  const [manPower, setManPower] = useState([]);

  // State for booked time slots
  const [bookedSlots, setBookedSlots] = useState([]);

  // State for modal open/close
  const [openModals, setOpenModals] = useState({});

  const timeSlots = [
    '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
    '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00',
  ];

  const fetchManPower = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/get-manpower/${encodeURIComponent(parlor.email)}`);
      setManPower(response.data);
    } catch (error) {
      console.error('Error fetching manPower:', error.response?.data?.message || error.message);
      setManPower([]);
    }
  };

  // Fetch booked time slots with duration for the selected employee on the selected date
  const fetchBookedSlots = async (employeeName, date) => {
    const userEmail = localStorage.getItem('email');
    try {
      const response = await axios.get(`${BASE_URL}/api/users/bookings/${userEmail}`);
      const filteredBookings = response.data.bookings
        .filter(
          (booking) =>
            booking.favoriteEmployee === employeeName && booking.date.split('T')[0] === date
        )
        .map((booking) => ({
          time: booking.time,
          duration: booking.duration || 60, // Default to 60 minutes if duration is not provided
        }));
      setBookedSlots(filteredBookings);
    } catch (error) {
      console.error('Error fetching booked slots:', error.response?.data?.message || error.message);
      setBookedSlots([]);
    }
  };

  // Fetch manPower data when component mounts
  useEffect(() => {
    if (parlor.email) {
      fetchManPower();
    }
  }, [parlor.email]);

  // Fetch booked slots when favoriteEmployee or date changes
  useEffect(() => {
    if (formData.favoriteEmployee && formData.date) {
      fetchBookedSlots(formData.favoriteEmployee, formData.date);
    } else {
      setBookedSlots([]);
    }
  }, [formData.favoriteEmployee, formData.date]);

  // Update duration when relatedServices change
  useEffect(() => {
    const baseDuration = 60; // 1 hour for the main service
    const additionalDuration = formData.relatedServices.length * 30; // 30 minutes per additional service
    setFormData((prev) => ({
      ...prev,
      duration: baseDuration + additionalDuration,
    }));
  }, [formData.relatedServices]);

  // Calculate total amount including related services
  const calculateTotalAmount = () => {
    const baseAmount = parseFloat(formData.amount) || 0;
    const additionalServicesCost = formData.relatedServices.length;
    return baseAmount;
  };

  // Convert time slot to minutes for comparison
  const timeToMinutes = (time) => {
    const [start] = time.split('-');
    const [hours, minutes] = start.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Check if a slot is available considering duration
  const isSlotAvailable = (slot, duration) => {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + duration;

    for (const booked of bookedSlots) {
      const bookedStart = timeToMinutes(booked.time);
      const bookedEnd = bookedStart + booked.duration;

      // Check for overlap
      if (!(slotEnd <= bookedStart || slotStart >= bookedEnd)) {
        return false;
      }
    }
    return true;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    // Reset time when changing employee or date to avoid selecting a booked slot
    if (name === 'favoriteEmployee' || name === 'date') {
      setFormData((prev) => ({ ...prev, time: '' }));
    }
  };

  // Handle checkbox changes for related services
  const handleRelatedServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const relatedServices = checked
        ? [...prev.relatedServices, value]
        : prev.relatedServices.filter((service) => service !== value);
      return { ...prev, relatedServices };
    });
  };

  // Handle removal of a selected service
  const handleRemoveService = (serviceToRemove) => {
    setFormData((prev) => ({
      ...prev,
      relatedServices: prev.relatedServices.filter((service) => service !== serviceToRemove),
    }));
  };

  // Handle modal open/close
  const handleToggleModal = (category) => {
    setOpenModals((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time slot is required';
    if (!formData.service) newErrors.service = 'Service is required';
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0)
      newErrors.amount = 'Valid amount is required';
    if (!formData.favoriteEmployee && manPower.length > 0)
      newErrors.favoriteEmployee = 'Please select an employee';
    if (formData.time && !isSlotAvailable(formData.time, formData.duration))
      newErrors.time = 'Selected time slot is not available for the required duration';
    return newErrors;
  };

  // Handle booking slot
  const handleBookSlot = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Navigate to the payment page with updated formData
      navigate('/pay', {
        state: {
          ...formData,
          parlor,
          totalAmount: calculateTotalAmount(),
          duration: formData.duration, // Include duration
        },
      });
    } catch (error) {
      console.error('Error navigating to payment:', error);
      setErrors({ ...errors, api: 'Failed to proceed to payment. Please try again.' });
    }
  };

  // Parse location for distance calculation
  const parseLocation = (location) => {
    if (!location || typeof location !== 'string') return null;
    const match = location.match(/Lat:\s*([\d.-]+),\s*Lon:\s*([\d.-]+)/i);
    if (!match) return null;
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    if (isNaN(lat) || isNaN(lon)) return null;
    return { lat, lon };
  };

  // Generate Google Maps URL
  const getGoogleMapsUrl = (location) => {
    const coords = parseLocation(location);
    if (!coords) return '#';
    return `https://www.google.com/maps?q=${coords.lat},${coords.lon}`;
  };

  // Render services in modals
  const renderServiceCheckboxes = () => {
    const designation = parlor.designation || '';
    const services = servicesByDesignation[designation] || {};

    return Object.keys(services).map((category) => (
      <Box key={category} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleToggleModal(category)}>
          <Typography variant="h6">{category}</Typography>
          <IconButton>
            {openModals[category] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Modal
          open={openModals[category] || false}
          onClose={() => handleToggleModal(category)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, maxWidth: 400, maxHeight: '80vh', overflowY: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{category}</Typography>
            <FormGroup>
              {services[category].map((service) => (
                <FormControlLabel
                  key={service}
                  control={
                    <Checkbox
                      value={service}
                      checked={formData.relatedServices.includes(service)}
                      onChange={handleRelatedServiceChange}
                    />
                  }
                  label={service}
                />
              ))}
            </FormGroup>
            <Button
              variant="contained"
              onClick={() => handleToggleModal(category)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    ));
  };

  // Render selected services with remove option
  const renderSelectedServices = () => {
    return (
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {formData.relatedServices.map((service) => (
          <Chip
            key={service}
            label={service}
            onDelete={() => handleRemoveService(service)}
            deleteIcon={<Close />}
            sx={{ bgcolor: '#e0e0e0' }}
          />
        ))}
      </Box>
    );
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Left Section - Shop Info */}
        <div className="col-12 col-md-4">
          <Box sx={{ border: '1px solid #ccc', p: 3, borderRadius: 2, height: '100%' }}>
            {Object.keys(parlor).length === 0 ? (
              <Alert severity="warning">No parlor data available. Please select a parlor.</Alert>
            ) : (
              <>
                <img
                  src={parlor.image || 'https://cdn.britannica.com/16/156416-050-909414BB/peacock-Indian-tail-feathers.jpg'}
                  alt={parlor.name || 'Shop'}
                  className="img-fluid mb-3"
                />
                <Typography variant="h5">{parlor.name || 'Shop Name'}</Typography>
                <Typography variant="subtitle1">{parlor.designation || 'Designation'}</Typography>
                <Typography>{parlor.style || 'Style'}</Typography>
                <Typography>₹{calculateTotalAmount()}</Typography>
                <Typography>Duration: {formData.duration} minutes</Typography>
                <Typography>Rating: {parlor.rating || 'N/A'}</Typography>
                <Typography>
                  Distance: {parlor.location ? 'Calculate based on user location' : 'Unknown'}
                </Typography>
                <Button
                  variant="outlined"
                  className="mt-2"
                  onClick={() => window.open(getGoogleMapsUrl(parlor.location), '_blank')}
                  disabled={!parlor.location}
                >
                  Direction
                </Button>
              </>
            )}
          </Box>
        </div>

        {/* Right Section - Payment Form */}
        <div className="col-12 col-md-8">
          <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
              Book Slot
            </Typography>

            {Object.keys(parlor).length === 0 && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Please select a parlor to proceed with booking.
              </Alert>
            )}

            {errors.api && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.api}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              error={!!errors.date}
              helperText={errors.date}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.favoriteEmployee}>
              <InputLabel>Favorite Employee</InputLabel>
              <Select
                name="favoriteEmployee"
                value={formData.favoriteEmployee}
                onChange={handleInputChange}
                label="Favorite Employee"
              >
                <MenuItem value="" disabled>
                  Select an employee
                </MenuItem>
                {manPower.map((employee) => (
                  <MenuItem key={employee._id} value={employee.name}>
                    {employee.name} ({employee.experience} years exp)
                  </MenuItem>
                ))}
              </Select>
              {errors.favoriteEmployee && (
                <Typography color="error">{errors.favoriteEmployee}</Typography>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.time}>
              <InputLabel>Available Time</InputLabel>
              <Select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                label="Available Time"
                disabled={!formData.favoriteEmployee}
              >
                <MenuItem value="" disabled>
                  Select a time slot
                </MenuItem>
                {timeSlots.map((slot) => (
                  <MenuItem
                    key={slot}
                    value={slot}
                    disabled={!isSlotAvailable(slot, formData.duration)}
                  >
                    {slot} {!isSlotAvailable(slot, formData.duration) ? '(Booked)' : ''}
                  </MenuItem>
                ))}
              </Select>
              {errors.time && <Typography color="error">{errors.time}</Typography>}
            </FormControl>
            <TextField
              fullWidth
              label="Service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
              error={!!errors.service}
              helperText={errors.service}
            />
            <TextField
              fullWidth
              label="Total Amount"
              name="totalAmount"
              type="number"
              value={calculateTotalAmount()}
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
              error={!!errors.amount}
              helperText={errors.amount}
            />
            <TextField
              fullWidth
              label="Total Duration (minutes)"
              name="duration"
              type="number"
              value={formData.duration}
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
            />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Additional Services (Aditional amount will be pay after service )
            </Typography>
            {renderServiceCheckboxes()}
            {formData.relatedServices.length > 0 && renderSelectedServices()}

            <Button
              variant="contained"
              onClick={handleBookSlot}
              fullWidth
              sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
              disabled={Object.keys(parlor).length === 0}
            >
              Book Slot
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BookSlot;