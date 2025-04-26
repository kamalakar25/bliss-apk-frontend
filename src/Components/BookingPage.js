import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredBookingId, setHoveredBookingId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [complaint, setComplaint] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const email = localStorage.getItem('email');

      try {
        const res = await axios.get(`http://localhost:5000/api/users/coustomer/bookings/${email}`);
        const users = res.data;

        const allBookings = users.flatMap(user =>
          user.bookings.map((booking, index) => ({
            _id: booking._id,
            customerName: booking.name,
            serviceName: booking.service,
            bookingDate: booking.date,
            bookingTime: booking.time,
            status: booking.paymentStatus,
            parlorName: booking.parlorName,
            totalAmount: booking.total_amount,
            PaidAmount: booking.amount,
            RemainingAmount: booking.total_amount - booking.amount,
            paymentMode: booking.Payment_Mode,
            relatedServices: booking.relatedServices?.join(', '),
            bookingId: booking.bookingId || booking._id,
            rating: booking.userRating || null,
            comment: booking.userReview || null,
            orderId: booking.orderId,
            pin: booking.pin,
            complaint: booking.userComplaint || null
          }))
        );

        setBookings(allBookings.reverse());
        setFilteredBookings(allBookings.reverse());
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter(booking => booking.status?.toLowerCase() === filterStatus.toLowerCase())
      );
    }
  }, [filterStatus, bookings]);

  useEffect(() => {
    if (!isMobile || !hoveredBookingId) return;

    const handleClickOutside = (event) => {
      const ratingContainer = document.querySelector(`.rating-container[data-booking-id="${hoveredBookingId}"]`);
      const commentPopup = document.querySelector(`.comment-popup[data-booking-id="${hoveredBookingId}"]`);
      const complaintContainer = document.querySelector(`.complaint-container[data-booking-id="${hoveredBookingId}"]`);
      const complaintPopup = document.querySelector(`.complaint-popup[data-booking-id="${hoveredBookingId}"]`);

      if (
        !ratingContainer?.contains(event.target) &&
        !commentPopup?.contains(event.target) &&
        !complaintContainer?.contains(event.target) &&
        !complaintPopup?.contains(event.target)
      ) {
        setHoveredBookingId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, hoveredBookingId]);

  const getStatusColor = (status) => {
    if (!status) return '#666';
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'completed') return '#4CAF50';
    if (lowerStatus === 'pending') return '#FFC107';
    if (lowerStatus === 'cancelled') return '#F44336';
    if (lowerStatus === 'paid') return '#4CAF50';
    return '#666';
  };

  const isPastDate = (bookingDate) => {
    if (!bookingDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const booking = new Date(bookingDate);
    booking.setHours(0, 0, 0, 0);
    return booking < today;
  };

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setRating(0);
    setComment('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
    setRating(0);
    setComment('');
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal') {
      closeModal();
      closeComplaintModal();
    }
  };

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (!selectedBookingId) return;

    const email = localStorage.getItem('email');
    const selectedBooking = bookings.find(booking => booking._id === selectedBookingId);
    if (!selectedBooking) return;

    try {
      const response = await axios.post('http://localhost:5000/api/users/update/booking/rating', {
        email,
        orderId: selectedBooking.orderId,
        userRating: rating,
        userReview: comment
      });

      if (response.status === 200) {
        setBookings(bookings.map(booking =>
          booking._id === selectedBookingId
            ? { ...booking, rating, comment }
            : booking
        ));
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  const handleRatingClick = (bookingId) => {
    if (isMobile) {
      setHoveredBookingId(hoveredBookingId === bookingId ? null : bookingId);
    }
  };

  const openComplaintModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setComplaint('');
    setIsComplaintModalOpen(true);
  };

  const closeComplaintModal = () => {
    setIsComplaintModalOpen(false);
    setSelectedBookingId(null);
    setComplaint('');
  };

  const handleComplaintSubmit = async () => {
    if (!selectedBookingId || !complaint) {
      alert('Please provide a complaint.');
      return;
    }

    const email = localStorage.getItem('email');
    const selectedBooking = bookings.find(booking => booking._id === selectedBookingId);
    if (!selectedBooking) return;

    try {
      const response = await axios.post('http://localhost:5000/api/users/update/booking/complaint', {
        email,
        orderId: selectedBooking.orderId,
        userComplaint: complaint
      });

      if (response.status === 200) {
        setBookings(bookings.map(booking =>
          booking._id === selectedBookingId
            ? { ...booking, complaint }
            : booking
        ));
        alert('Complaint submitted successfully.');
        closeComplaintModal();
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  const handleComplaintClick = (bookingId) => {
    if (isMobile) {
      setHoveredBookingId(hoveredBookingId === bookingId ? null : bookingId);
    }
  };

  const handlePaidBookings = () => {
    setFilterStatus('paid');
  };

  const handlePendingBookings = () => {
    setFilterStatus('pending');
  };

  const handleAllBookings = () => {
    setFilterStatus('all');
  };

  return (
    <div style={{
      padding: '1rem',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(255,228,225,0.9) 0%, rgba(240,248,255,0.9) 50%, rgba(220,240,255,0.9) 100%)',
      animation: 'gradientAnimation 15s ease infinite',
      backgroundSize: '400% 400%'
    }}>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
            animation: fadeIn 0.3s ease-out;
          }
          .star-rating {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .star {
            font-size: 1.5rem;
            color: #ccc;
            cursor: pointer;
            transition: color 0.2s;
          }
          .star.filled {
            color: gold;
          }
          .modal-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }
          .modal-buttons button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            font-size: 0.9rem;
          }
          .modal-buttons .post-btn {
            background: #667eea;
            color: white;
          }
          .modal-buttons .cancel-btn {
            background: #F44336;
            color: white;
          }
          textarea {
            width: 100%;
            min-height: 80px;
            resize: vertical;
            margin-bottom: 1rem;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 0.9rem;
          }
          .rating-container, .complaint-container {
            position: relative;
            display: inline-block;
          }
          .comment-popup, .complaint-popup {
            position: absolute;
            background: white;
            padding: 0.8rem;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 100;
            max-width: 150px;
            white-space: normal;
            top: -100%;
            left: 50%;
            transform: translate(-50%, -100%);
            font-size: 0.8rem;
          }
          @media (min-width: 769px) {
            .comment-popup, .complaint-popup {
              display: none;
            }
            .rating-container:hover .comment-popup,
            .complaint-container:hover .complaint-popup {
              display: block;
            }
          }
          @media (max-width: 768px) {
            .comment-popup, .complaint-popup {
              display: ${hoveredBookingId ? 'block' : 'none'};
            }
          }
          .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
            justify-content: center;
          }
          .filter-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            font-size: 0.9rem;
            transition: background 0.3s ease;
            flex: 1;
            text-align: center;
            max-width: 150px;
          }
          .filter-btn.active {
            background: #667eea;
            color: white;
          }
          .filter-btn:hover {
            background: #764ba2;
            color: white;
          }
          .table-container {
            width: 100%;
            overflow-x: hidden;
            background: rgba(255, 255, 255, 0.85);
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
            backdrop-filter: blur(8px);
            padding: 1rem;
            margin-top: 1rem;
            animation: fadeIn 0.8s ease-out;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
          }
          th, td {
            padding: 0.8rem;
            text-align: left;
            border-bottom: 1px solid rgba(200, 200, 255, 0.3);
            white-space: normal;
            word-wrap: break-word;
            font-size: 0.9rem;
          }
          th {
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          td {
            color: #333;
            font-weight: 500;
          }
          tr:hover {
            background: rgba(200, 220, 255, 0.6);
            transform: scale(1.005);
          }
          .secret-pin-paid {
            color: #4CAF50;
            font-weight: 600;
          }
          /* Tablet (768px - 600px) */
          @media (max-width: 768px) {
            .table-container {
              padding: 0.5rem;
            }
            th, td {
              padding: 0.5rem;
              font-size: 0.8rem;
            }
            /* Hide less critical columns */
            th:nth-child(4), td:nth-child(4), /* Related Services */
            th:nth-child(10), td:nth-child(10) /* Secret Pin */ {
              display: none;
            }
            .filter-btn {
              font-size: 0.8rem;
              padding: 0.4rem 0.8rem;
              max-width: 120px;
            }
          }
          /* Mobile (below 600px) - Stacked layout */
          @media (max-width: 600px) {
            table, thead, tbody, th, td, tr {
              display: block;
            }
            thead {
              display: none; /* Hide table headers */
            }
            tr {
              margin-bottom: 1rem;
              border: 1px solid rgba(200, 200, 255, 0.3);
              border-radius: 8px;
              background: rgba(255, 255, 255, 0.9);
              padding: 0.5rem;
            }
            td {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem;
              font-size: 0.8rem;
              border: none;
              position: relative;
            }
            td::before {
              content: attr(data-label);
              font-weight: 600;
              color: #667eea;
              flex: 1;
              padding-right: 0.5rem;
            }
            td:not(:last-child) {
              border-bottom: 1px solid rgba(200, 200, 255, 0.2);
            }
            /* Show only critical columns */
            td:nth-child(4), /* Related Services */
            td:nth-child(10) /* Secret Pin */ {
              display: none;
            }
            .table-container {
              padding: 0.5rem;
            }
            .filter-buttons {
              flex-direction: column;
              gap: 0.3rem;
            }
            .filter-btn {
              font-size: 0.75rem;
              padding: 0.3rem;
              max-width: none;
            }
            .modal-content {
              padding: 1rem;
              max-width: 95%;
            }
            .star {
              font-size: 1.2rem;
            }
            .modal-buttons button {
              font-size: 0.8rem;
              padding: 0.4rem 0.8rem;
            }
            textarea {
              font-size: 0.8rem;
              min-height: 60px;
            }
          }
        `}
      </style>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={handleAllBookings}
        >
          All Bookings
        </button>
        <button
          className={`filter-btn ${filterStatus === 'paid' ? 'active' : ''}`}
          onClick={handlePaidBookings}
        >
          Confirmed Bookings
        </button>
        <button
          className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={handlePendingBookings}
        >
          Pending Bookings
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <th style={headerCellStyle}>S.No</th>
              <th style={headerCellStyle}>Booking ID</th>
              <th style={headerCellStyle}>Service</th>
              <th style={headerCellStyle}>Related Services</th>
              <th style={headerCellStyle}>Date</th>
              <th style={headerCellStyle}>Time</th>
              <th style={headerCellStyle}>Parlor Name</th>
              <th style={headerCellStyle}>Paid Amount</th>
              <th style={headerCellStyle}>Remaining Amount</th>
              <th style={headerCellStyle}>Secret Pin</th>
              <th style={headerCellStyle}>Complaint</th>
              <th style={headerCellStyle}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={booking._id} style={{
                  transition: 'all 0.3s ease',
                  ...(index % 2 === 1 && { background: 'rgba(240, 240, 255, 0.5)' })
                }}>
                  <td style={tableCellStyle} data-label="S.No">{index + 1}</td>
                  <td style={tableCellStyle} data-label="Booking ID">{booking.bookingId || "NA"}</td>
                  <td style={tableCellStyle} data-label="Service">{booking.serviceName || "NA"}</td>
                  <td style={tableCellStyle} data-label="Related Services">{booking.relatedServices || "NA"}</td>
                  <td style={tableCellStyle} data-label="Date">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "NA"}</td>
                  <td style={{ ...tableCellStyle, whiteSpace: 'nowrap' }} data-label="Time">{booking.bookingTime || "NA"}</td>
                  <td style={tableCellStyle} data-label="Parlor Name">{booking.parlorName || "NA"}</td>
                  <td style={tableCellStyle} data-label="Paid Amount">{booking.PaidAmount || "NA"}</td>
                  <td style={tableCellStyle} data-label="Remaining Amount">{booking.RemainingAmount || "0"}</td>
                  <td style={tableCellStyle} data-label="Secret Pin">
                    <span
                      className={booking.status?.toLowerCase() === 'paid' ? 'secret-pin-paid' : ''}
                    >
                      {booking.pin || "NA"}
                    </span>
                  </td>
                  <td style={tableCellStyle} data-label="Complaint">
                    {booking.complaint ? (
                      <div
                        className="complaint-container"
                        data-booking-id={booking._id}
                        onMouseEnter={() => !isMobile && setHoveredBookingId(booking._id)}
                        onMouseLeave={() => !isMobile && setHoveredBookingId(null)}
                        onClick={() => handleComplaintClick(booking._id)}
                      >
                        View <i className="fa-solid fa-eye" style={{ color: "green" }}></i>
                        {hoveredBookingId === booking._id && booking.complaint && (
                          <div className="complaint-popup" data-booking-id={booking._id}>
                            {booking.complaint}
                          </div>
                        )}
                      </div>
                    ) : isPastDate(booking.bookingDate) ? (
                      <span
                        onClick={() => openComplaintModal(booking._id)}
                        style={{ cursor: 'pointer', color: '#F44336' }}
                      >
                        File <i className="fa-solid fa-pen" style={{ color: "#F44336" }}></i>
                      </span>
                    ) : (
                      <span style={{ color: '#ccc' }}>
                        File <i className="fa-solid fa-pen" style={{ color: "#ccc" }}></i>
                      </span>
                    )}
                  </td>
                  <td style={tableCellStyle} data-label="Rating">
                    {booking.rating ? (
                      <div
                        className="rating-container"
                        data-booking-id={booking._id}
                        onMouseEnter={() => !isMobile && setHoveredBookingId(booking._id)}
                        onMouseLeave={() => !isMobile && setHoveredBookingId(null)}
                        onClick={() => handleRatingClick(booking._id)}
                      >
                        {booking.rating} <i className="fa-solid fa-star" style={{ color: "gold" }}></i>
                        {hoveredBookingId === booking._id && booking.comment && (
                          <div className="comment-popup" data-booking-id={booking._id}>
                            {booking.comment}
                          </div>
                        )}
                      </div>
                    ) : isPastDate(booking.bookingDate) ? (
                      <span
                        onClick={() => openModal(booking._id)}
                        style={{ cursor: 'pointer', color: '#667eea' }}
                      >
                        Rate <i className="fa-regular fa-star" style={{ color: "gold" }}></i>
                      </span>
                    ) : (
                      <span style={{ color: '#ccc' }}>
                        Rate <i className="fa-regular fa-star" style={{ color: "#ccc" }}></i>
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#666',
                  fontSize: '1.1rem',
                  background: 'rgba(255, 255, 255, 0.7)',
                  display: 'block'
                }}>
                  No {filterStatus === 'paid' ? 'paid' : filterStatus === 'pending' ? 'pending' : ''} bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleBackdropClick}>
          <div className="modal-content">
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.2rem' }}>Rate This Service</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Add your comments..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="post-btn" onClick={handleSubmit}>
                Post
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isComplaintModalOpen && (
        <div className="modal" onClick={handleBackdropClick}>
          <div className="modal-content">
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.2rem' }}>File a Complaint</h3>
            <textarea
              placeholder="Describe your issue..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="post-btn" onClick={handleComplaintSubmit}>
                Submit
              </button>
              <button className="cancel-btn" onClick={closeComplaintModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const headerCellStyle = {
  textAlign: 'left',
  fontWeight: '600',
  letterSpacing: '0.5px'
};

const tableCellStyle = {
  borderBottom: '1px solid rgba(200, 200, 255, 0.3)',
  color: '#333',
  fontWeight: '500'
};

export default BookingPage;