import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BASE_URL = process.env.REACT_APP_API_URL;

const ConfirmationModal = ({ isOpen, onClose, booking, inputId, setInputId, isConfirmed, setIsConfirmed, error, setError, onConfirm }) => {
  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem('email');

    if (inputId === booking.pin) {
      try {
        const response = await axios.put(`${BASE_URL}/api/users/update-confirmation`, {
          email: userEmail,
          bookingId: booking._id,
        });

        setIsConfirmed(true);
        setError('');
        onConfirm(booking._id);
        console.log('Confirmation updated:', response.data);
      } catch (err) {
        console.error('Error updating booking confirmation:', err);
        setError('Failed to confirm booking. Please try again later.');
      }
    } else {
      setError('Invalid Booking ID. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        transform: 'scale(0.7)',
        animation: 'scaleIn 0.3s ease-in-out forwards',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {!isConfirmed ? (
          <>
            <h3 style={{ fontSize: '1.5rem', color: '#2c3e50', marginBottom: '20px', fontWeight: 600 }}>
              Verify Booking ID
            </h3>
            <input
              type="text"
              placeholder="Enter Booking ID"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              style={{
                padding: '10px',
                width: '100%',
                fontSize: '1rem',
                border: '2px solid #dfe6e9',
                borderRadius: '8px',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxSizing: 'border-box',
                marginBottom: '15px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1abc9c';
                e.target.style.boxShadow = '0 3px 12px rgba(26,188,156,0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#dfe6e9';
                e.target.style.boxShadow = 'none';
              }}
            />
            {error && (
              <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '15px' }}>
                {error}
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  backgroundColor: '#1abc9c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                  transform: 'scale(1)',
                  filter: 'brightness(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.filter = 'brightness(1)';
                }}
              >
                Submit
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  backgroundColor: '#7f8c8d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                  transform: 'scale(1)',
                  filter: 'brightness(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.filter = 'brightness(1)';
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '60px',
              height: '60px',
              backgroundColor: '#1abc9c',
              borderRadius: '50%',
              margin: '0 auto 20px',
              animation: 'pulse 1.5s infinite'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#2c3e50', marginBottom: '15px', fontWeight: 600 }}>
              Booking Confirmed!
            </h3>
            <p style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '20px' }}>
              PIN: {booking.pin} verif successfully.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#1abc9c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, filter 0.3s ease',
                boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                transform: 'scale(1)',
                filter: 'brightness(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ComplaintModal = ({ isOpen, onClose, booking, complaintText, setComplaintText, isSubmitted, setIsSubmitted, error, setError, onSubmit }) => {
  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem('email');

    if (complaintText.trim() === '') {
      setError('Please enter a complaint.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/users/submit-complaint`, {
        email: userEmail,
        bookingId: booking._id,
        complaint: complaintText,
      });

      setIsSubmitted(true);
      setError('');
      onSubmit(booking._id);
      console.log('Complaint submitted:', response.data);
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError('Failed to submit complaint. Please try again later.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        transform: 'scale(0.7)',
        animation: 'scaleIn 0.3s ease-in-out forwards',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {!isSubmitted ? (
          <>
            <h3 style={{ fontSize: '1.5rem', color: '#2c3e50', marginBottom: '20px', fontWeight: 600 }}>
              Submit Complaint
            </h3>
            <textarea
              placeholder="Describe your complaint..."
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              style={{
                padding: '10px',
                width: '100%',
                height: '100px',
                fontSize: '1rem',
                border: '2px solid #dfe6e9',
                borderRadius: '8px',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxSizing: 'border-box',
                marginBottom: '15px',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1abc9c';
                e.target.style.boxShadow = '0 3px 12px rgba(26,188,156,0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#dfe6e9';
                e.target.style.boxShadow = 'none';
              }}
            />
            {error && (
              <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '15px' }}>
                {error}
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  backgroundColor: '#1abc9c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                  transform: 'scale(1)',
                  filter: 'brightness(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.filter = 'brightness(1)';
                }}
              >
                Submit
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  backgroundColor: '#7f8c8d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                  transform: 'scale(1)',
                  filter: 'brightness(1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.filter = 'brightness(1)';
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '60px',
              height: '60px',
              backgroundColor: '#1abc9c',
              borderRadius: '50%',
              margin: '0 auto 20px',
              animation: 'pulse 1.5s infinite'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#2c3e50', marginBottom: '15px', fontWeight: 600 }}>
              Complaint Submitted!
            </h3>
            <p style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '20px' }}>
              Your complaint for Booking ID: {booking.pin} has been submitted.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#1abc9c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, filter 0.3s ease',
                boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                transform: 'scale(1)',
                filter: 'brightness(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [inputId, setInputId] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [complaintError, setComplaintError] = useState('');
  const [confirmedBookings, setConfirmedBookings] = useState(() => {
    const saved = localStorage.getItem('confirmedBookings');
    return saved ? JSON.parse(saved) : {};
  });
  const [complainedBookings, setComplainedBookings] = useState(() => {
    const saved = localStorage.getItem('complainedBookings');
    return saved ? JSON.parse(saved) : {};
  });
  const itemsPerPage = 5;

  useEffect(() => {
    
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('confirmedBookings', JSON.stringify(confirmedBookings));
  }, [confirmedBookings]);

  useEffect(() => {
    localStorage.setItem('complainedBookings', JSON.stringify(complainedBookings));
  }, [complainedBookings]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    fetch(`${BASE_URL}/api/users/sp/bookings/${email}`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Failed to fetch bookings:', err));
  }, []);

  const filteredBookings = [...bookings]
    .reverse()
    .filter((booking) =>
      Object.values(booking).some((value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleConfirmBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setInputId('');
    setIsConfirmed(false);
    setError('');
    setIsModalOpen(true);
  };

  const handleComplaintBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setComplaintText('');
    setIsComplaintSubmitted(false);
    setComplaintError('');
    setIsComplaintModalOpen(true);
  };

  const handleConfirmSuccess = (bookingId) => {
    setBookings(bookings.map(booking =>
      booking._id === bookingId ? { ...booking, paymentStatus: 'confirmed' } : booking
    ));
    setConfirmedBookings(prev => ({
      ...prev,
      [bookingId]: true
    }));
    setIsConfirmed(true);
  };

  const handleComplaintSuccess = (bookingId) => {
    setComplainedBookings(prev => ({
      ...prev,
      [bookingId]: true
    }));
    setIsComplaintSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
    setInputId('');
    setIsConfirmed(false);
    setError('');
  };

  const closeComplaintModal = () => {
    setIsComplaintModalOpen(false);
    setSelectedBookingId(null);
    setComplaintText('');
    setIsComplaintSubmitted(false);
    setComplaintError('');
  };

  const isMobile = screenWidth <= 768;
  const isVerySmallScreen = screenWidth <= 400;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: isMobile ? '15px 10px' : '40px 20px',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontSize: isMobile ? '1.6rem' : '2.5rem',
        color: '#2c3e50',
        marginBottom: isMobile ? '15px' : '30px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>All Bookings</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: isMobile ? '15px' : '20px',
        width: '100%',
        maxWidth: isMobile ? '90%' : '400px'
      }}>
        <input
          type="text"
          placeholder="Search by any field in bookings..."
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: isMobile ? '10px' : '10px',
            width: '100%',
            fontSize: isMobile ? '0.95rem' : '1rem',
            border: '2px solid #dfe6e9',
            borderRadius: '10px',
            color: '#2c3e50',
            outline: 'none',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#1abc9c';
            e.target.style.boxShadow = '0 3px 12px rgba(26,188,156,0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#dfe6e9';
            e.target.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)';
          }}
        />
      </div>

      <div style={{
        width: '100%',
        maxWidth: screenWidth <= 1440 ? '100%' : '1200px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: isMobile ? 'visible' : 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{
          overflowX: 'auto',
          width: '100%',
          scrollbarWidth: 'thin',
          scrollbarColor: '#1abc9c #dfe6e9'
        }}>
          <table style={{
            width: '100%',
            minWidth: '1100px', // Adjusted for new column
            borderCollapse: 'collapse',
            fontSize: screenWidth <= 1024 ? '0.85rem' : '0.95rem',
            color: '#2c3e50'
          }}>
            <thead>
              <tr style={{
                background: '#1abc9c',
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '5%' }}>S.No</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '15%' }}>Booking ID</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Customer</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '15%' }}>Customer Email</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Selected Employee</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Service</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '15%' }}>Date & Slot Time</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Paid Amount</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Remaining Amount</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Booking Confirmation</th>
                <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '10%' }}>Complaints</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((booking, index) => (
                  <tr
                    key={booking._id}
                    style={{
                      borderBottom: '1px solid #dfe6e9',
                      transition: 'background 0.3s ease',
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f3f3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f9f9f9'}
                  >
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px' }}>{indexOfFirstItem + index + 1}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking._id}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking.customerName}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking.customerEmail}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking.favoriteEmployee}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking.service}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', whiteSpace: 'nowrap' }}>{new Date(booking.date).toLocaleDateString()} & {booking.time}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking.amount}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', wordBreak: 'break-word' }}>{booking.total_amount - booking.amount}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px' }}>
                      <button
                        onClick={() => handleConfirmBooking(booking._id)}
                        disabled={booking.paymentStatus === 'confirmed' || confirmedBookings[booking._id]}
                        style={{
                          padding: screenWidth <= 1024 ? '6px 10px' : '8px 12px',
                          fontSize: screenWidth <= 1024 ? '0.8rem' : '0.9rem',
                          backgroundColor: (booking.paymentStatus === 'confirmed' || confirmedBookings[booking._id]) ? '#e0e0e0' : '#1abc9c',
                          color: (booking.paymentStatus === 'confirmed' || confirmedBookings[booking._id]) ? '#888' : '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: (booking.paymentStatus === 'confirmed' || confirmedBookings[booking._id]) ? 'not-allowed' : 'pointer',
                          transition: 'transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                          transform: 'scale(1)',
                          filter: 'brightness(1)',
                          width: '100%',
                          maxWidth: '100px'
                        }}
                        onMouseEnter={(e) => {
                          if (!(booking.paymentStatus === 'confirmed' || confirmedBookings[booking._id])) {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.filter = 'brightness(1.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.filter = 'brightness(1)';
                        }}
                      >
                        {(booking.paymentStatus === 'confirmed' || confirmedBookings[booking._id]) ? 'Confirmed' : 'Confirm'}
                      </button>
                    </td>
                    <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px' }}>
                      <button
                        onClick={() => handleComplaintBooking(booking._id)}
                        disabled={complainedBookings[booking._id]}
                        style={{
                          padding: screenWidth <= 1024 ? '6px 10px' : '8px 12px',
                          fontSize: screenWidth <= 1024 ? '0.8rem' : '0.9rem',
                          backgroundColor: complainedBookings[booking._id] ? '#e0e0e0' : '#e74c3c',
                          color: complainedBookings[booking._id] ? '#888' : '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: complainedBookings[booking._id] ? 'not-allowed' : 'pointer',
                          transition: 'transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                          transform: 'scale(1)',
                          filter: 'brightness(1)',
                          width: '100%',
                          maxWidth: '100px'
                        }}
                        onMouseEnter={(e) => {
                          if (!complainedBookings[booking._id]) {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.filter = 'brightness(1.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.filter = 'brightness(1)';
                        }}
                      >
                        {complainedBookings[booking._id] ? 'Submitted' : 'Complain'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11" // Updated for new column
                    style={{
                      padding: screenWidth <= 1024 ? '15px' : '20px',
                      textAlign: 'center',
                      color: '#7f8c8d',
                      fontStyle: 'italic',
                      fontSize: screenWidth <= 1024 ? '0.85rem' : '1rem'
                    }}
                  >
                    No Bookings Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length > itemsPerPage && (
        <div style={{
          marginTop: isMobile ? '20px' : '25px',
          display: 'flex',
          flexDirection: isVerySmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isVerySmallScreen ? '12px' : '15px',
          padding: '10px',
          width: '100%',
          maxWidth: '500px'
        }}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: screenWidth <= 1024 ? '8px 16px' : '10px 20px',
              fontSize: screenWidth <= 1024 ? '0.9rem' : '1rem',
              backgroundColor: currentPage === 1 ? '#e0e0e0' : '#1abc9c',
              color: currentPage === 1 ? '#888' : '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transform: 'scale(1)',
              filter: 'brightness(1)',
              width: isVerySmallScreen ? '140px' : 'auto',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 6px 16px rgba(26,188,156,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'brightness(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            Previous
          </button>

          <span style={{
            fontSize: screenWidth <= 1024 ? '0.95rem' : '1rem',
            fontWeight: 500,
            color: '#2c3e50',
            padding: '0 10px',
            lineHeight: '1.5'
          }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: screenWidth <= 1024 ? '8px 16px' : '10px 20px',
              fontSize: screenWidth <= 1024 ? '0.9rem' : '1rem',
              backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#1abc9c',
              color: currentPage === totalPages ? '#888' : '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transform: 'scale(1)',
              filter: 'brightness(1)',
              width: isVerySmallScreen ? '140px' : 'auto',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 6px 16px rgba(26,188,156,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'brightness(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            Next
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        booking={bookings.find(booking => booking._id === selectedBookingId)}
        inputId={inputId}
        setInputId={setInputId}
        isConfirmed={isConfirmed}
        setIsConfirmed={setIsConfirmed}
        error={error}
        setError={setError}
        onConfirm={handleConfirmSuccess}
      />

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={closeComplaintModal}
        booking={bookings.find(booking => booking._id === selectedBookingId)}
        complaintText={complaintText}
        setComplaintText={setComplaintText}
        isSubmitted={isComplaintSubmitted}
        setIsSubmitted={setIsComplaintSubmitted}
        error={complaintError}
        setError={setComplaintError}
        onSubmit={handleComplaintSuccess}
      />
    </div>
  );
};

// Inline CSS animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.7); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default BookingPage;