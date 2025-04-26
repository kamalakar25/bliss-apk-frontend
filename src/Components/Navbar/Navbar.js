import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch userRole from localStorage on mount
    const role = localStorage.getItem('userRole');
    setUserRole(role || ''); // Default to empty string if null
  }, []);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(''); // Reset state to reflect logged-out status
    window.location.href = '/login';
  };

  const renderNavLinks = () => {
    // If no userRole (not logged in), show default links
    if (!userRole) {
      return (
        <>
          <li><Link to="/"><b>Home</b></Link></li>
          <li><Link to="/salon"><b>Salon</b></Link></li>
          <li><Link to="/beauty"><b>Beauty</b></Link></li>
          <li><Link to="/skincare"><b>Skincare</b></Link></li>
          <li><Link to="/login"><b>Login</b></Link></li>
        </>
      );
    }

    // Render links based on userRole
    switch (userRole) {
      case 'Admin':
        return (
          <>
       
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/serviceProviders">Service Providers</Link></li>
            <li><Link to="/bookingDetails">Bookings</Link></li>
            <li><Link to="/revenue">Revenue</Link></li>
            <li><Link to="/approvals">Approvals</Link></li>
            <li><Link to="/complaints">Complaints</Link></li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <b style={{ color: 'red' }}>Logout</b>
              </Link>
            </li>
          </>
        );

      case 'ServiceProvider':
        return (
          <>
  
            <li><Link to="/services">Add Service</Link></li>
            <li><Link to="/AddEmployee">Emp Management</Link></li>
            <li><Link to="/SpBookingDetails">Bookings</Link></li>
            <li><Link to="/SPpaymentDetails">Payments</Link></li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <b style={{ color: 'red' }}>Logout</b>
              </Link>
            </li>
          </>
        );

      case 'User':
        return (
          <>

            <li><Link to="/"><b>Home</b></Link></li>
            <li><Link to="/salon"><b>Salon</b></Link></li>
            <li><Link to="/beauty"><b>Beauty</b></Link></li>
            <li><Link to="/skincare"><b>Skincare</b></Link></li>
            <li><Link to="/bookings"><b>Bookings</b></Link></li>
            <li><Link to="/Payments"><b>Payments</b></Link></li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <b style={{ color: 'red' }}>Logout</b>
              </Link>
            </li>
          </>
        );

      default:
        return null; // Fallback (shouldn't reach here due to !userRole check)
    }
  };

  return (
  
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 10,
       
        }}
      >
        <div className="navbar-logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: '#2e4053' }}>Beauty Bliss</h1>
          </Link>
        </div>
        <button className="navbar-toggle" onClick={toggleNav}>
          ☰
        </button>
        <ul className={`navbar-links ${isNavActive ? 'active' : ''}`}>
          {renderNavLinks()}
        </ul>
      </nav>
    
    
  );
};

export default Navbar;