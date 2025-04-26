import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const BASE_URL = process.env.REACT_APP_API_URL;

const RevenuePage = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/main/admin/revenue`);
                const flatData = response.data.flat().reverse();
                setRevenueData(flatData);
                setFilteredData(flatData);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };
        fetchRevenue();
    }, []);

    const handleFilter = () => {
        if (!fromDate || !toDate) {
            alert("Please select both From and To dates.");
            return;
        }

        const from = new Date(fromDate);
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);

        const filtered = revenueData.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= from && bookingDate <= to;
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const clearFilter = () => {
        setFromDate('');
        setToDate('');
        setFilteredData(revenueData);
        setCurrentPage(1);
    };

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

    const totalAmount = filteredData.reduce((sum, booking) => sum + (booking.amount || 0), 0);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
                    Revenue Report
                </Box>

                {/* Filter Section */}
                <Box
                    sx={{
                        mb: '20px',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        gap: { xs: '16px', sm: '20px' },
                        justifyContent: { xs: 'center', sm: 'center' },
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: { xs: '100%', sm: 'auto' },
                            maxWidth: { xs: '200px', sm: '200px' },
                        }}
                    >
                        <Box
                            component="label"
                            htmlFor="fromDate"
                            sx={{
                                fontSize: '0.9rem',
                                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: '4px',
                            }}
                        >
                            From Date
                        </Box>
                        <Box
                            component="input"
                            id="fromDate"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            sx={{
                                p: '8px',
                                borderRadius: '6px',
                                border: '1px solid #e0e7ff',
                                background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                                fontSize: '0.9rem',
                                width: '100%',
                                maxWidth: '200px',
                                textAlign: 'center',
                                color: '#2d3436',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: { xs: '100%', sm: 'auto' },
                            maxWidth: { xs: '200px', sm: '200px' },
                        }}
                    >
                        <Box
                            component="label"
                            htmlFor="toDate"
                            sx={{
                                fontSize: '0.9rem',
                                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: '4px',
                            }}
                        >
                            To Date
                        </Box>
                        <Box
                            component="input"
                            id="toDate"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            sx={{
                                p: '8px',
                                borderRadius: '6px',
                                border: '1px solid #e0e7ff',
                                background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                                fontSize: '0.9rem',
                                width: '100%',
                                maxWidth: '200px',
                                textAlign: 'center',
                                color: '#2d3436',
                            }}
                        />
                    </Box>
                    <Box
                        marginTop={3}
                        component="button"
                        className="btn btn-primary"
                        onClick={handleFilter}
                        sx={{
                            p: '8px 16px',
                            fontSize: '0.9rem',
                            fontWeight: 'medium',
                            minWidth: '120px',
                            borderRadius: '6px',
                            bgcolor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            width: { xs: '100%', sm: 'auto' },
                            maxWidth: { xs: '200px', sm: 'none' },
                            '&:hover': {
                                bgcolor: '#0056b3',
                            },
                        }}
                    >
                        Apply Filter
                    </Box>
                    <Box
                        marginTop={3}
                        component="button"
                        className="btn btn-secondary"
                        onClick={clearFilter}
                        sx={{
                            p: '8px 16px',
                            fontSize: '0.9rem',
                            fontWeight: 'medium',
                            minWidth: '120px',
                            borderRadius: '6px',
                            bgcolor: '#6c757d',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            width: { xs: '100%', sm: 'auto' },
                            maxWidth: { xs: '200px', sm: 'none' },
                            '&:hover': {
                                bgcolor: '#5a6268',
                            },
                        }}
                    >
                        Clear Filter
                    </Box>
                </Box>

                {/* Total Amount */}
                <Box
                    component="h5"
                    sx={{
                        fontSize: '1.2rem',
                        background: 'linear-gradient(135deg, #34495e, #4a5568)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        mb: '20px',
                    }}
                >
                    Total Revenue: ₹{totalAmount}
                </Box>

                {/* Revenue Table */}
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
                        <Box component="thead" sx={{ background: 'linear-gradient(135deg, #2a9d8f, rgb(160, 101, 199))', color: '#fff' }}>
                            <tr>
                                {['#', 'Booking ID', 'User','Date', 'Amount' ].map((header, idx) => (
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
                            {currentItems.length > 0 ? (
                                currentItems.map((booking, index) => (
                                    <Box component="tr" key={booking._id} sx={{ borderBottom: '1px solid #d3d8ff' }}>
                                        <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                                            {indexOfFirstItem + index + 1}
                                        </Box>
                                        <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                                            {booking._id}
                                        </Box>
                                        <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                                            {booking.name || booking.user?.name || 'N/A'}
                                        </Box>
                                        <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                                            {formatDate(booking.date)}
                                        </Box>
                                        <Box component="td" sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}>
                                            ₹{booking.amount || 0}
                                        </Box>
                                       
                                    </Box>
                                ))
                            ) : (
                                <Box component="tr">
                                    <Box
                                        component="td"
                                        colSpan="5"
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
                                        No revenue data available
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Pagination */}
                {filteredData.length > itemsPerPage && (
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

export default RevenuePage;