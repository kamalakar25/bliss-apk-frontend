import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [bookingDateFilter, setBookingDateFilter] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/all/bookings`);
                const data = Array.isArray(response.data) ? response.data : response.data.bookings || [];
                setBookings(data);
                setFilteredBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        let filtered = bookings;

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(b =>
                b._id?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                b.name?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                b.service?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                (Array.isArray(b.relatedServices) && b.relatedServices.some(rs => rs.toLowerCase().includes(searchQuery.trim().toLowerCase()))) ||
                b.amount?.toString().includes(searchQuery.trim().toLowerCase()) ||
                b.date?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                b.time?.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        // Booking date filter
        if (bookingDateFilter) {
            filtered = filtered.filter((booking) => {
                if (!booking.date) return false;
                try {
                    const bookingDate = new Date(booking.date);
                    if (isNaN(bookingDate.getTime())) return false;
                    const filterDate = new Date(bookingDateFilter);
                    return (
                        bookingDate.getFullYear() === filterDate.getFullYear() &&
                        bookingDate.getMonth() === filterDate.getMonth() &&
                        bookingDate.getDate() === filterDate.getDate()
                    );
                } catch (error) {
                    console.warn(`Invalid date for booking ${booking._id}:`, booking.date);
                    return false;
                }
            });
        }

        setFilteredBookings(filtered);
        setCurrentPage(1); // Reset to first page after filtering
    }, [searchQuery, bookingDateFilter, bookings]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setBookingDateFilter('');
        setFilteredBookings(bookings);
        setCurrentPage(1);
    };

    // Function to format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.warn(`Invalid date format: ${dateString}`);
            return '';
        }
    };

    const reversedBookings = [...filteredBookings].reverse();
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = reversedBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

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
                    Booking Details
                </Box>

                {/* Filter Inputs */}
                <Box
                    sx={{
                        mb: '20px',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="input"
                        type="text"
                        placeholder="Search by ID, name, service, etc."
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
                            textAlign: 'center',
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
                        <Box
                            component="label"
                            htmlFor="bookingDate"
                            sx={{
                                fontSize: '0.9rem',
                                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: '4px',
                            }}
                        >
                        </Box>
                        <Box
                            component="input"
                            id="bookingDate"
                            type="date"
                            value={bookingDateFilter}
                            onChange={(e) => setBookingDateFilter(e.target.value)}
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
                        onClick={handleClearFilters}
                        disabled={!searchQuery && !bookingDateFilter}
                        className='bg-warning text-darK'
                        sx={{
                            p: '8px 16px',
                            borderRadius: '6px',
                            border: '1px solid rgb(96, 240, 13)',
                            color: !searchQuery && !bookingDateFilter ? '#tomato' : '#tomato',
                            fontSize: '0.9rem',
                            fontWeight: 'medium',
                            cursor: !searchQuery && !bookingDateFilter ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                ...(!searchQuery && !bookingDateFilter
                                    ? {}
                                    : {
                                          bgcolor: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                                          transform: 'scale(1.05)',
                                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                      }),
                            },
                        }}
                    >
                        Clear Filters
                    </Box>
                </Box>

                <Box sx={{ overflowX: 'auto', width: '100%' }}>
                    <Box
                        component="table"
                        sx={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            background: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255))',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxLen: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Box component="thead" sx={{ background: 'linear-gradient(135deg, #2a9d8f, rgb(160, 101, 199))', color: '#fff' }}>
                            <tr>
                                {['#', 'Booking ID', 'Name', 'Booking Slot Date & Time', 'Service', 'Related Services', 'Amount'].map((header, idx) => (
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
                            {loading ? (
                                <Box component="tr">
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
                                        Loading bookings...
                                    </Box>
                                </Box>
                            ) : currentBookings.length === 0 ? (
                                <Box component="tr">
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
                                        No bookings available.
                                    </Box>
                                </Box>
                            ) : (
                                currentBookings.map((booking, index) => (
                                    <Box component="tr" key={booking._id || index}>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {indexOfFirstBooking + index + 1}
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
                                            {booking._id}
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
                                            {booking.name}
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
                                            {formatDate(booking.date)} & {booking.time}
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
                                            {booking.service}
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
                                            {Array.isArray(booking.relatedServices) ? booking.relatedServices.join(', ') : 'NA'}
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
                                            {booking.amount}
                                        </Box>
                                    </Box>
                                ))
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Pagination Section Below Table */}
                {filteredBookings.length > itemsPerPage && (
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

export default BookingDetails;