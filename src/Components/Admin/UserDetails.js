import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// DeleteButton component (unchanged)
const DeleteButton = ({ onClick }) => {
  return (
    <Box
      component="button"
      className="button"
      onClick={onClick}
      sx={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2c3e50, #34495e)',
        border: 'none',
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.164)',
        cursor: 'pointer',
        transitionDuration: '0.3s',
        overflow: 'hidden',
        position: 'relative',
        gap: '1px',
        '&:hover': {
          width: '140px',
          borderRadius: '50px',
          transitionDuration: '0.3s',
          background: 'linear-gradient(135deg, #ff6b6b, #ff8c8c)',
          alignItems: 'center',
          gap: '0',
        },
        '&:before': {
          position: 'absolute',
          top: '-20px',
          content: '"Delete"',
          color: 'white',
          transitionDuration: '0.3s',
          fontSize: '2px',
        },
        '&:hover:before': {
          fontSize: '13px',
          opacity: 1,
          transform: 'translateY(35px)',
          transitionDuration: '0.3s',
        },
        '& .svgIcon': {
          width: '12px',
          transitionDuration: '0.3s',
          '& path': {
            fill: 'white',
          },
        },
        '&:hover .bin-bottom': {
          width: '50px',
          transitionDuration: '0.3s',
          transform: 'translateY(60%)',
        },
        '& .bin-top': {
          transformOrigin: 'bottom right',
        },
        '&:hover .bin-top': {
          width: '50px',
          transitionDuration: '0.3s',
          transform: 'translateY(60%) rotate(160deg)',
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 69 14"
        className="svgIcon bin-top"
      >
        <g clipPath="url(#clip0_35_24)">
          <path
            fill="black"
            d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_35_24">
            <rect fill="white" height="14" width="69"></rect>
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 69 57"
        className="svgIcon bin-bottom"
      >
        <g clipPath="url(#clip0_35_22)">
          <path
            fill="black"
            d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_35_22">
            <rect fill="white" height="57" width="69"></rect>
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/get/all/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter by name or email
    if (searchQuery.trim()) {
      filtered = filtered.filter((user) =>
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.dob?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.createdAt?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Date filter
    if (startDateFilter || endDateFilter) {
      filtered = filtered.filter((user) => {
        if (!user.createdAt) return false;
        try {
          const joinDate = new Date(user.createdAt);
          if (isNaN(joinDate.getTime())) return false;
          const startDate = startDateFilter ? new Date(startDateFilter) : null;
          const endDate = endDateFilter ? new Date(endDateFilter) : null;
          if (endDate) endDate.setHours(23, 59, 59, 999);
          if (startDate && endDate) {
            return joinDate >= startDate && joinDate <= endDate;
          } else if (startDate) {
            return joinDate >= startDate;
          } else if (endDate) {
            return joinDate <= endDate;
          }
          return true;
        } catch (error) {
          console.warn(`Invalid date for user ${user._id}:`, user.createdAt);
          return false;
        }
      });
    }
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, startDateFilter, endDateFilter, users]);

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userToDelete}`);
        setUsers(users.filter((user) => user._id !== userToDelete));
        setShowModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeDeleteModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn(`Invalid date: ${dateString}`);
      return 'Invalid Date';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStartDateFilter('');
    setEndDateFilter('');
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: '20px',
            gap: '20px',
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
            }}
          >
            User Details
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: { sm: 'wrap' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, sm: 3 },
              width: '100%',
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mt: { xs: 0, sm: '25px' },
                textAlign: 'center',
              }}
            >
              Total Users: <strong>{filteredUsers.length}</strong>
            </Box>
            <Box
              component="input"
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                p: '8px',
                borderRadius: '6px',
                border: '1px solid #e0e7ff',
                background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                fontSize: '0.9rem',
                width: { xs: '100%', sm: '200px' },
                maxWidth: '200px',
                color: '#2d3436',
                mt: { xs: 0, sm: '25px' },
                textAlign: 'center',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
              <Box
                component="label"
                htmlFor="startDate"
                sx={{
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #34495e, #4a5568)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: '4px',
                  zIndex: 3,
                }}
              >
                From
              </Box>
              <Box
                component="input"
                id="startDate"
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                sx={{
                  p: '8px',
                  borderRadius: '6px',
                  border: '1px solid #e0e7ff',
                  background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                  fontSize: '0.9rem',
                  width: '100%',
                  maxWidth: { xs: '150px', sm: '200px' },
                  textAlign: 'center',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
              <Box
                component="label"
                htmlFor="endDate"
                sx={{
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #34495e, #4a5568)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: '4px',
                }}
              >
                To
              </Box>
              <Box
                component="input"
                id="endDate"
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                min={startDateFilter || undefined}
                max={new Date().toISOString().split('T')[0]}
                sx={{
                  p: '8px',
                  borderRadius: '6px',
                  border: '1px solid #e0e7ff',
                  background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                  fontSize: '0.9rem',
                  width: '100%',
                  maxWidth: { xs: '150px', sm: '200px' },
                  textAlign: 'center',
                  color: '#2d3436',
                }}
              />
            </Box>
            <Box
              component="button"
              onClick={clearFilters}
              disabled={!searchQuery && !startDateFilter && !endDateFilter}
              className='bg-warning text-darK'
              sx={{
                p: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgb(96, 240, 13)',

                fontSize: '0.9rem',
                fontWeight: 'medium',
                cursor: !searchQuery && !startDateFilter && !endDateFilter ? 'not-allowed' : 'pointer',
                mt: { xs: 0, sm: '25px' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  ...(searchQuery || startDateFilter || endDateFilter
                    ? {
                      bgcolor: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgb(9, 66, 255)',
                    }
                    : {}),
                },
              }}
            >
              Clear Filters
            </Box>
          </Box>
        </Box>
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255))',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #d3d8ff',
            }}
          >
            <Box component="thead" sx={{ background: 'linear-gradient(135deg, #2a9d8f,rgb(160, 101, 199))', color: '#fff' }}>
              <tr>
                {['Sl. No', 'Name', 'Email', 'Phone', 'DOB', 'Date of Joining', 'Actions'].map(
                  (header, idx) => (
                    <Box
                      component="th"
                      key={idx}
                      sx={{
                        p: '12px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        border: '1px solid #d3d8ff',
                        ...(header === 'Actions' ? { width: '150px' } : {}),
                      }}
                    >
                      {header}
                    </Box>
                  )
                )}
              </tr>
            </Box>
            <Box component="tbody">
              {currentUsers.map((user, index) => (
                <tr
                  key={user._id}
                  style={{ borderBottom: '1px solid #d3d8ff' }}
                >
                  <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                    {indexOfFirstUser + index + 1}
                  </Box>
                  <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                    {user.name || 'N/A'}
                  </Box>
                  <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                    {user.email || 'N/A'}
                  </Box>
                  <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                    {user.phone || 'N/A'}
                  </Box>
                  <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                    {formatDate(user.dob)}
                  </Box>
                  <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                    {formatDate(user.createdAt)}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: '12px',
                      textAlign: 'center',
                      width: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      border: '1px solid #d3d8ff',
                    }}
                  >
                    <DeleteButton onClick={() => openDeleteModal(user._id)} />
                  </Box>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <Box
                    component="td"
                    colSpan="7"
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
                    No users found.
                  </Box>
                </tr>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 3,
          }}
        >
          <Box
            component="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}

            sx={{
              p: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #e0e7ff',
              color: '#black',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                ...(currentPage !== 1
                  ? {
                    bgcolor: 'linear-gradient(135deg, #2563eb, #3b82f6)',
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
              fontSize: '0.9rem',
              background: 'linear-gradient(135deg, #34495e, #4a5568)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Page {currentPage} of {totalPages}
          </Box>
          <Box
            component="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              p: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #e0e7ff',
              color: '#black',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                ...(currentPage !== totalPages
                  ? {
                    bgcolor: 'linear-gradient(135deg, #2563eb, #3b82f6)',
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
      </Box>

      {showModal && (
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '400px', md: '450px' },
              maxWidth: '450px',
              background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
              borderRadius: '12px',
              p: { xs: 3, sm: 4 },
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              animation: 'slideIn 0.3s ease-out',
              '@keyframes slideIn': {
                from: { transform: 'translateY(-20px)', opacity: 0 },
                to: { transform: 'translateY(0)', opacity: 1 },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 3,
                '&:hover .delete-icon': {
                  transform: 'scale(1.2)',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <DeleteIcon
                className="delete-icon"
                sx={{
                  fontSize: { xs: 48, sm: 56 },
                  background: 'linear-gradient(135deg, #ff6b6b, #ff8c8c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
            <Box
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1f2937, #374151)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Are You Sure?
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                background: 'linear-gradient(135deg, #6b7280, #9ca3af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
                px: { xs: 2, sm: 0 },
              }}
            >
              Do you really want to delete this user? This process cannot be undone.
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Box
                component="button"
                onClick={closeDeleteModal}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 auto' },
                  background: 'linear-gradient(135deg,rgb(55, 65, 81), #4b5563)',
                  color: '#d1d5db',
                  px: 4,
                  py: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  borderRadius: '9999px',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg,rgb(75, 85, 99), #6b7280)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                onClick={handleDelete}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 auto' },
                  background: 'linear-gradient(135deg, #ff6b6b, #ff8c8c)',
                  color: '#ffffff',
                  px: 4,
                  py: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  borderRadius: '9999px',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ef4444, #f87171)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                Confirm
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;