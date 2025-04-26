import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';

const Approvals = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [providersPerPage] = useState(5); // Adjust number of providers per page as needed

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/main/admin/service-providers/pending')
      .then((res) => {
        setProviders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching service providers:', err);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to approve this service provider?');
    if (isConfirmed) {
      axios
        .post(`http://localhost:5000/api/main/admin/service-providers/approve/${id}`)
        .then((res) => {
          setProviders((prev) => prev.filter((provider) => provider._id !== id));
        })
        .catch((err) => console.error('Error approving provider:', err));
    }
  };

  const handleReject = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to reject this service provider?');
    if (isConfirmed) {
      axios
        .post(`http://localhost:5000/api/main/admin/service-providers/reject/${id}`)
        .then((res) => {
          setProviders((prev) => prev.filter((provider) => provider._id !== id));
        })
        .catch((err) => console.error('Error rejecting provider:', err));
    }
  };

  // Pagination logic
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = providers.slice(indexOfFirstProvider, indexOfLastProvider);
  const totalPages = Math.ceil(providers.length / providersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          Pending Service Provider Approvals
        </Box>

        {loading ? (
          <Box
            sx={{
              fontSize: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #34495e, #4a5568)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Loading...
          </Box>
        ) : providers.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              mt: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="All approved"
              sx={{ width: '120px', opacity: 0.6 }}
            />
            <Box
              component="h5"
              sx={{
                mt: '16px',
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              All service providers are approved!
            </Box>
          </Box>
        ) : (
          <>
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
                    {[
                      'Sl. No',
                      'Name',
                      'Email',
                      'Phone',
                      'Designation',
                      'Shop Name',
                      'Location',
                      'Actions',
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
                    ))}
                  </tr>
                </Box>
                <Box component="tbody">
                  {currentProviders.map((provider, index) => (
                    <Box
                      component="tr"
                      key={provider._id}
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
                        {indexOfFirstProvider + index + 1}
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
                        {provider.name}
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
                        {provider.email}
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
                        {provider.phone}
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
                        {provider.designation}
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
                        {provider.shopName}
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
                        {provider.location}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          p: '12px',
                          fontSize: '0.9rem',
                          textAlign: 'center',
                          border: '1px solid #d3d8ff',
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                      >
                        <Button
                          onClick={() => handleApprove(provider._id)}
                          sx={{
                            p: '6px 12px',
                            fontSize: '0.8rem',
                            fontWeight: 'medium',
                            borderRadius: '6px',
                            border: '1px solid #e0e7ff',
                            background: 'linear-gradient(135deg,rgb(71, 212, 205),rgb(102, 235, 109))',
                            color: '#2d3436',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg,rgb(125, 165, 204),rgb(184, 125, 125))',
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            },
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(provider._id)}
                          sx={{
                            p: '6px 12px',
                            fontSize: '0.8rem',
                            fontWeight: 'medium',
                            borderRadius: '6px',
                            border: '1px solid #e0e7ff',
                            background: 'linear-gradient(135deg,rgb(235, 85, 85),rgb(214, 71, 178))',
                            color: '#2d3436',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg,rgb(250, 11, 11), #ffffff)',
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            },
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            {providers.length > 0 && (
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default Approvals;