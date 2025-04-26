import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const BASE_URL = process.env.REACT_APP_API_URL;

const Complaints = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const [spComplaints, setSpComplaints] = useState([]);
  const [activeView, setActiveView] = useState('user'); // Default to user complaints
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/get/all/complaints`);
        setUserComplaints(res.data.userComplaints || []);
        setSpComplaints(res.data.spComplaints || []);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      }
    };

    fetchComplaints();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn(`Invalid date format: ${dateString}`);
      return '';
    }
  };

  // Pagination logic
  const dataToDisplay = activeView === 'user' ? userComplaints : spComplaints;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToDisplay.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage) || 1; // Ensure at least 1 page

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff, #f0f4f8)',
        p: { xs: '20px 10px', sm: '20px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '100px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          background: 'linear-gradient(135deg, #f0f4f8, #e0e7ff)',
          borderRadius: '12px',
          p: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          margin: '0 auto',
        }}
      >
        <Box
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
            background: 'linear-gradient(135deg, #2c3e50, #34495e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            m: 0,
            textAlign: 'center',
            mb: '20px',
          }}
        >
          Complaints Overview
        </Box>

        {/* Toggle Buttons */}
        <Box
          sx={{
            mb: '20px',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            component="button"
            onClick={() => {
              setActiveView('user');
              setCurrentPage(1);
            }}
            sx={{
              p: '8px 16px',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              minWidth: '120px',
              borderRadius: '6px',
              bgcolor: activeView === 'user' ? '#007bff' : '#6c757d',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '200px', sm: 'none' },
              '&:hover': {
                bgcolor: activeView === 'user' ? '#0056b3' : '#5a6268',
              },
            }}
          >
            User Complaints
          </Box>
          <Box
            component="button"
            onClick={() => {
              setActiveView('sp');
              setCurrentPage(1);
            }}
            sx={{
              p: '8px 16px',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              minWidth: '120px',
              borderRadius: '6px',
              bgcolor: activeView === 'sp' ? '#ffc107' : '#6c757d',
              color: activeView === 'sp' ? '#000' : '#fff',
              border: 'none',
              cursor: 'pointer',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '200px', sm: 'none' },
              '&:hover': {
                bgcolor: activeView === 'sp' ? '#e0a800' : '#5a6268',
              },
            }}
          >
            SP Complaints
          </Box>
        </Box>

        {/* Complaints Table */}
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255))',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="thead"
              sx={{
                background: 'linear-gradient(135deg, #2a9d8f, rgb(160, 101, 199))',
                color: '#fff',
              }}
            >
              <tr>
                {activeView === 'user'
                  ? [
                      '#',
                      'Customer Email',
                      'SP Email',
                      'Shop/Clinic Name',
                      'Complaint',
                      'Date',
                      'Service',
                    ].map((header, idx) => (
                      <Box
                        component="th"
                        key={idx}
                        sx={{
                          p: '12px',
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          border: '1px solid #d3d8ff',
                        }}
                      >
                        {header}
                      </Box>
                    ))
                  : ['#', 'SP Email', 'Customer Email', 'Complaint', 'Date', 'Service'].map(
                      (header, idx) => (
                        <Box
                          component="th"
                          key={idx}
                          sx={{
                            p: '12px',
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {header}
                        </Box>
                      )
                    )}
              </tr>
            </Box>
            <Box component="tbody">
              {currentItems.length > 0 ? (
                currentItems.map((c, index) => (
                  <Box
                    component="tr"
                    key={index}
                    sx={{ borderBottom: '1px solid #d3d8ff' }}
                  >
                    <Box
                      component="td"
                      sx={{
                        p: '12px',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        border: '1px solid #d3d8ff',
                      }}
                    >
                      {indexOfFirstItem + index + 1}
                    </Box>
                    {activeView === 'user' ? (
                      <>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.email}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.parlorEmail}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.parlorName}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                            background: '#dc3545',
                          }}
                        >
                          <span
                            style={{
                            //   background: '#dc3545',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              
                            }}
                          >
                            {c.complaint}
                          </span>
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {formatDate(c.date)}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.service}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.email}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.userEmail}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                            background: '#dc3545',
                          }}
                        >
                          <span
                            style={{
                             
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                            }}
                          >
                            {c.complaint}
                          </span>
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {formatDate(c.date)}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.service}
                        </Box>
                      </>
                    )}
                  </Box>
                ))
              ) : (
                <Box component="tr">
                  <Box
                    component="td"
                    colSpan={activeView === 'user' ? 7 : 6}
                    sx={{
                      textAlign: 'center',
                      p: '20px',
                      background: 'linear-gradient(135deg, #457b9d, #7209b7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: '1rem',
                      border: '1px solid #d3d8ff',
                    }}
                  >
                    No {activeView === 'user' ? 'user' : 'service provider'} complaints available
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Pagination */}
        {dataToDisplay.length > 0 && (
          <Box
            sx={{
              mt: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Box
              component="button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{
                p: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                bgcolor: currentPage === 1
                  ? 'linear-gradient(135deg, #b2bec3, #cbd5e1)'
                  : 'linear-gradient(135deg, #ffffff, #edf2f7)',
                color: currentPage === 1 ? '#8b949e' : '#2d3436',
                fontSize: '0.9rem',
                fontWeight: 'medium',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  ...(currentPage !== 1
                    ? {
                        bgcolor: 'linear-gradient(135deg, #edf2f7, #ffffff)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    : {}),
                },
              }}
            >
              Previous
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: '16px',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Page {currentPage} of {totalPages}
            </Box>
            <Box
              component="button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              sx={{
                p: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                bgcolor: currentPage === totalPages
                  ? 'linear-gradient(135deg, #b2bec3, #cbd5e1)'
                  : 'linear-gradient(135deg, #ffffff, #edf2f7)',
                color: currentPage === totalPages ? '#8b949e' : '#2d3436',
                fontSize: '0.9rem',
                fontWeight: 'medium',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  ...(currentPage !== totalPages
                    ? {
                        bgcolor: 'linear-gradient(135deg, #edf2f7, #ffffff)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    : {}),
                },
              }}
            >
              Next
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Complaints;