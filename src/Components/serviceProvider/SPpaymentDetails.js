import React, { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_API_URL;

const SPpaymentDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const itemsPerPage = 5;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isMobile = screenWidth <= 768;
  const isVerySmallScreen = screenWidth <= 400;

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeInSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInSlideLeft {
      0% { opacity: 0; transform: translateX(20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
  `;

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
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <style>{keyframes}</style>

      <h2 style={{
        fontSize: isMobile ? '1.5rem' : '2rem',
        color: '#2c3e50',
        marginBottom: isMobile ? '15px' : '30px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        animation: 'fadeInSlideUp 0.5s ease-out'
      }}>
        All Payments
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: isMobile ? '15px' : '25px',
        width: isMobile ? '85%' : '360px',
        maxWidth: '360px'
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
            width: '100%',
            padding: isMobile ? '8px' : '10px',
            border: '1.5px solid #dfe6e9',
            borderRadius: '5px',
            fontSize: isMobile ? '0.85rem' : '0.9rem',
            color: '#2c3e50',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
            boxSizing: 'border-box',
            animation: 'fadeInSlideUp 0.5s ease-out'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#1abc9c';
            e.target.style.boxShadow = '0 1px 5px rgba(26,188,156,0.3)';
            e.target.style.transform = 'scale(1.01)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#dfe6e9';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'scale(1)';
          }}
        />
      </div>

      <div style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '1200px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        overflow: isMobile ? 'visible' : 'auto',
        boxSizing: 'border-box',
        animation: 'fadeInSlideUp 0.5s ease-out'
      }}>
        {isMobile ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '12px'
          }}>
            {currentItems.length > 0 ? (
              currentItems.map((booking, index) => (
                <div
                  key={booking._id || index}
                  style={{
                    background: '#fff',
                    borderRadius: '10px',
                    padding: '15px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                    borderLeft: '3px solid #1abc9c',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    animation: `fadeInSlideUp 0.5s ease-out ${(indexOfFirstItem + index) * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>S.no:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{indexOfFirstItem + index + 1}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Transaction ID:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{booking.transactionId || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Customer:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{booking.customerName}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Customer Email:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{booking.customerEmail}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Selected Employee:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{booking.favoriteEmployee}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Service:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{booking.service}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Payment Date:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Payment Status:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{booking.paymentStatus}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Amount:</strong>
                    <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>₹{booking.amount}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                padding: isMobile ? '12px' : '15px',
                textAlign: 'center',
                color: '#7f8c8d',
                fontStyle: 'italic',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                borderLeft: '3px solid #1abc9c',
                maxWidth: isMobile ? '80%' : '50%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50px',
                animation: 'fadeInSlideUp 0.5s ease-out'
              }}>
                No Bookings Found
              </div>
            )}
          </div>
        ) : (
          <div style={{
            overflowX: screenWidth <= 1024 ? 'auto' : 'hidden',
            width: '100%'
          }}>
            <table style={{
              width: '100%',
              minWidth: screenWidth <= 1024 ? '1100px' : 'auto',
              borderCollapse: 'collapse',
              fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem',
              color: '#2c3e50'
            }}>
              <thead>
                <tr style={{
                  background: '#1abc9c',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '6%' }}>S.no</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '17%' }}>Transaction ID</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '17%' }}>Customer</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '22%' }}>Customer Email</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '17%' }}>Selected Employee</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '17%' }}>Service</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '12%' }}>Payment Date</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '12%' }}>Payment Status</th>
                  <th style={{ padding: screenWidth <= 1024 ? '10px' : '12px', textAlign: 'left', width: '15%' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((booking, index) => (
                    <tr
                      key={booking._id || index}
                      style={{
                        borderBottom: '1px solid #dfe6e9',
                        transition: 'background 0.3s ease, transform 0.3s ease',
                        backgroundColor: (indexOfFirstItem + index) % 2 === 0 ? '#f9fbfc' : '#fff',
                        animation: `fadeInSlideLeft 0.5s ease-out ${(indexOfFirstItem + index) * 0.1}s both`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e8f4f8';
                        e.currentTarget.style.transform = 'scale(1.01)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = (indexOfFirstItem + index) % 2 === 0 ? '#f9fbfc' : '#fff';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{indexOfFirstItem + index + 1}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{booking.transactionId || 'N/A'}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{booking.customerName}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{booking.customerEmail}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{booking.favoriteEmployee}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{booking.service}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>{booking.paymentStatus}</td>
                      <td style={{ padding: screenWidth <= 1024 ? '10px' : '12px', fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem' }}>₹{booking.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{
                      padding: '15px',
                      textAlign: 'center',
                      color: '#7f8c8d',
                      fontStyle: 'italic',
                      fontSize: screenWidth <= 1024 ? '0.9rem' : '0.95rem',
                      background: '#fff'
                    }}>
                      No Bookings Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredBookings.length > itemsPerPage && (
        <div style={{
          marginTop: isMobile ? '15px' : '20px',
          display: 'flex',
          flexDirection: isVerySmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isVerySmallScreen ? '10px' : '12px',
          padding: '8px',
          width: '100%',
          maxWidth: '450px',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: screenWidth <= 1024 ? '6px 12px' : '8px 16px',
              fontSize: screenWidth <= 1024 ? '0.8rem' : '0.85rem',
              backgroundColor: currentPage === 1 ? '#e0e0e0' : '#1abc9c',
              color: currentPage === 1 ? '#888' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
              transform: 'scale(1)',
              filter: 'brightness(1)',
              width: isVerySmallScreen ? '120px' : 'auto',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 14px rgba(26,188,156,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
              }
            }}
            onTouchStart={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 14px rgba(26,188,156,0.3)';
              }
            }}
            onTouchEnd={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
              }
            }}
            onFocus={(e) => {
              if (currentPage !== 1) {
                e.target.style.boxShadow = '0 5px 14px rgba(26,188,156,0.3)';
              }
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
            }}
          >
            Previous
          </button>

          <span style={{
            fontSize: screenWidth <= 1024 ? '0.8rem' : '0.85rem',
            fontWeight: 500,
            color: '#2c3e50',
            padding: '0 8px',
            lineHeight: '1.5'
          }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: screenWidth <= 1024 ? '6px 12px' : '8px 16px',
              fontSize: screenWidth <= 1024 ? '0.8rem' : '0.85rem',
              backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#1abc9c',
              color: currentPage === totalPages ? '#888' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
              transform: 'scale(1)',
              filter: 'brightness(1)',
              width: isVerySmallScreen ? '120px' : 'auto',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 14px rgba(26,188,156,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
              }
            }}
            onTouchStart={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 14px rgba(26,188,156,0.3)';
              }
            }}
            onTouchEnd={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
              }
            }}
            onFocus={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.boxShadow = '0 5px 14px rgba(26,188,156,0.3)';
              }
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SPpaymentDetails;