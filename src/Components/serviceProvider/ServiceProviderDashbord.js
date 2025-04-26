import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const SuccessMessage = ({ message, onClose, screenWidth }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isAddService = message.toLowerCase().includes('added');
  const isMobile = screenWidth <= 768;

  return createPortal(
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1001,
        animation: 'backdropFadeIn 0.4s ease-out'
      }} />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '85%' : '400px',
        maxWidth: '1000px',
        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        border: '2px solid #4caf50',
        borderRadius: '8px',
        zIndex: 1002,
        animation: isAddService ? 'riseInAdd 0.5s ease-out' : 'riseInUpdate 0.5s ease-out',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1), 0 0 10px rgba(76,175,80,0.3)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          padding: isMobile ? '12px' : '15px',
          textAlign: 'center'
        }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                background: '#4caf50',
                borderRadius: '50%',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `particleBurst${isAddService ? 'Add' : 'Update'} 0.6s ease-out ${i * 0.04}s forwards`,
                '--angle': `${Math.random() * 360}deg`
              }}
            />
          ))}
          <div style={{
            display: 'inline-block',
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            marginBottom: '0.75rem',
            background: 'linear-gradient(45deg, #4caf50, #81c784)',
            borderRadius: '50%',
            boxShadow: '0 3px 10px rgba(0,0,0,0.25), 0 0 8px rgba(76,175,80,0.5)',
            animation: isAddService ? 'pulseAdd 0.8s ease-in-out' : 'pulseUpdate 0.8s ease-in-out',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: isMobile ? '24px' : '30px',
              height: isMobile ? '24px' : '30px',
              background: '#fff',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.9)',
              animation: 'shrinkCircle 0.4s ease-out 0.2s forwards'
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: isMobile ? '20px' : '26px',
              height: isMobile ? '20px' : '26px',
              transform: 'translate(-50%, -50%)'
            }}>
              <div style={{
                position: 'absolute',
                left: isMobile ? '6px' : '8px',
                bottom: isMobile ? '3px' : '4px',
                width: '4px',
                height: isMobile ? '10px' : '12px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 3px rgba(0,0,0,0.2)',
                transform: 'rotate(-45deg)',
                transformOrigin: 'bottom',
                clipPath: 'inset(100% 0 0 0)',
                animation: 'drawTickShort 0.4s ease-out 0.6s forwards'
              }} />
              <div style={{
                position: 'absolute',
                left: isMobile ? '6px' : '8px',
                bottom: isMobile ? '3px' : '4px',
                width: isMobile ? '12px' : '14px',
                height: '4px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 3px rgba(0,0,0,0.2)',
                transform: 'rotate(-45deg)',
                transformOrigin: 'left',
                clipPath: 'inset(0 100% 0 0)',
                animation: 'drawTickLong 0.4s ease-out 0.8s forwards'
              }} />
            </div>
          </div>
          <h4 style={{
            fontSize: isMobile ? '0.85rem' : '0.9rem',
            color: '#4caf50',
            fontWeight: 700,
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {message}
          </h4>
          <p style={{
            fontSize: isMobile ? '0.8rem' : '0.85rem',
            color: '#2d3436',
            fontWeight: 400
          }}>
            Success!
          </p>
        </div>
        <div style={{
          padding: isMobile ? '8px' : '10px',
          textAlign: 'center',
          background: '#f1f3f5',
          borderTop: '1px solid #dfe6e9'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              fontSize: isMobile ? '0.8rem' : '0.85rem',
              fontWeight: 600,
              color: '#fff',
              background: '#4caf50',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#388e3c';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(76,175,80,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#4caf50';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

const AdminPage = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 4;
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [_id, set_Id] = useState(null);
  const [showTooltip, setShowTooltip] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [showDustbin, setShowDustbin] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    salary: '',
    experience: ''
  });
  const svgIconRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showDeleteModal || showSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDeleteModal, showSuccess]);

  useEffect(() => {
    return () => {
      setShowDeleteModal(false);
      setShowDustbin(false);
      setDeletingEmployeeId(null);
      setShowSuccess(false);
    };
  }, []);

  const fetchEmployees = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/get-manpower/${email}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const name = String(formData.name || '').trim();
    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(name)) {
      newErrors.name = 'Name must be 2-50 characters long and contain only letters and spaces';
      isValid = false;
    }

    const phone = String(formData.phone || '').trim();
    if (!phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits and start with 6, 7, 8, or 9';
      isValid = false;
    }

    const salaryStr = String(formData.salary || '').trim();
    if (!salaryStr) {
      newErrors.salary = 'Salary is required';
      isValid = false;
    } else {
      const salaryNum = parseFloat(salaryStr);
      if (isNaN(salaryNum) || salaryNum < 1000 || salaryNum > 1000000) {
        newErrors.salary = 'Salary must be a number between 1000 and 1000000';
        isValid = false;
      }
    }

    const experience = String(formData.experience || '').trim();
    if (!experience) {
      newErrors.experience = 'Experience is required';
      isValid = false;
    } else if (experience.length < 2 || experience.length > 100) {
      newErrors.experience = 'Experience must be 2-100 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const email = localStorage.getItem('email');
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/admin/update-manpower/${_id}`, {
          name: formData.name,
          phone: formData.phone,
          salary: parseFloat(formData.salary),
          experience: formData.experience
        });
        setSuccessMessage('Employee Updated');
        setShowSuccess(true);
        fetchEmployees();
        setIsEditing(false);
        setEditIndex(null);
      } else {
        await axios.post(`http://localhost:5000/api/admin/add-manpower/${email}`, {
          name: formData.name,
          phone: formData.phone,
          salary: parseFloat(formData.salary),
          experience: formData.experience
        });
        setSuccessMessage('Employee Added');
        setShowSuccess(true);
        fetchEmployees();
      }

      setFormData({ name: '', phone: '', salary: '', experience: '' });
      setErrors({});
      setShowForm(false);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error submitting employee data:', error);
      setErrors({ general: 'Failed to submit employee data. Please try again.' });
    }
  };

  const handleEdit = (index) => {
    const globalIndex = (currentPage - 1) * employeesPerPage + index;
    set_Id(employees[globalIndex]._id);
    setFormData({
      name: String(employees[globalIndex].name || ''),
      phone: String(employees[globalIndex].phone || ''),
      salary: String(employees[globalIndex].salary || ''),
      experience: String(employees[globalIndex].experience || '')
    });
    setIsEditing(true);
    setEditIndex(globalIndex);
    setShowForm(true);
    setErrors({});
    if (screenWidth <= 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteClick = (_id) => {
    setShowDeleteModal(true);
    setPendingDeleteId(_id);
  };

  const triggerDeleteAnimation = async (_id) => {
    setDeletingEmployeeId(_id);
    setShowDustbin(true);

    setTimeout(async () => {
      setShowDustbin(false);
      setShowDeleteModal(false);
      setDeletingEmployeeId(null);
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete-manpower/${_id}`);
        fetchEmployees();
        const totalPages = Math.ceil((employees.length - 1) / employeesPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }, 1000);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      triggerDeleteAnimation(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPendingDeleteId(null);
    setShowDustbin(false);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isMobile = screenWidth <= 768;

  const keyframes = `
    @keyframes backdropFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes riseInAdd {
      0% { opacity: 0; transform: translate(-50%, 100vh) scale(0.7); }
      50% { opacity: 0.9; transform: translate(-50%, -60%) scale(1.05); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes riseInUpdate {
      0% { opacity: 0; transform: translate(-50%, 100vh) scale(0.8); }
      50% { opacity: 0.9; transform: translate(-50%, -55%) scale(1.03); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes particleBurstAdd {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) translate(calc(80px * cos(var(--angle))), calc(80px * sin(var(--angle)))) scale(0); opacity: 0; }
    }
    @keyframes particleBurstUpdate {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) translate(calc(60px * cos(var(--angle))), calc(60px * sin(var(--angle)))) scale(0.4); opacity: 0; }
    }
    @keyframes pulseAdd {
      0% { background: linear-gradient(45deg, #4caf50, #81c784); box-shadow: 0 3px 10px rgba(0,0,0,0.25), 0 0 8px rgba(76,175,80,0.5); }
      50% { background: linear-gradient(45deg, #388e3c, #66bb6a); box-shadow: 0 6px 14px rgba(0,0,0,0.3), 0 0 12px rgba(76,175,80,0.7); }
      100% { background: linear-gradient(45deg, #4caf50, #81c784); box-shadow: 0 3px 10px rgba(0,0,0,0.25), 0 0 8px rgba(76,175,80,0.5); }
    }
    @keyframes pulseUpdate {
      0% { background: linear-gradient(45deg, #4caf50, #81c784); box-shadow: 0 3px 10px rgba(0,0,0,0.25), 0 0 8px rgba(76,175,80,0.5); }
      50% { background: linear-gradient(45deg, #2e7d32, #4caf50); box-shadow: 0 6px 14px rgba(0,0,0,0.3), 0 0 12px rgba(76,175,80,0.7); }
      100% { background: linear-gradient(45deg, #4caf50, #81c784); box-shadow: 0 3px 10px rgba(0,0,0,0.25), 0 0 8px rgba(76,175,80,0.5); }
    }
    @keyframes shrinkCircle {
      0% { width: 30px; height: 30px; box-shadow: inset 0 3px 6px rgba(255,255,255,0.9); }
      100% { width: 0; height: 0; box-shadow: inset 0 0 0 rgba(255,255,255,0); }
    }
    @keyframes drawTickShort {
      0% { clip-path: inset(100% 0 0 0); }
      100% { clip-path: inset(0 0 0 0); }
    }
    @keyframes drawTickLong {
      0% { clip-path: inset(0 100% 0 0); }
      100% { clip-path: inset(0 0 0 0); }
    }
    @keyframes fadeInScale {
      from { opacity: 0; transform: translateX(-20px) scale(0.8); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes fadeInSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes modalAppear {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes errorShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-3px); }
      75% { transform: translateX(3px); }
    }
    @keyframes openLid {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-45deg); }
    }
    @keyframes closeLid {
      0% { transform: rotate(-45deg); }
      80% { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes throwTrash {
      0% { transform: translateX(-50%) translateY(0); opacity: 1; }
      100% { transform: translateX(-50%) translateY(-25px); opacity: 0; }
    }
    @keyframes shake {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(-5deg); }
      50% { transform: rotate(5deg); }
      75% { transform: rotate(-5deg); }
      100% { transform: rotate(0deg); }
    }
  `;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: isMobile ? '15px 10px' : '30px 20px',
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
        fontSize: isMobile ? '1.5rem' : '2.2rem',
        color: '#2c3e50',
        marginBottom: isMobile ? '15px' : '20px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>Employee Management</h2>

      <button
        onClick={() => {
          setFormData({ name: '', phone: '', salary: '', experience: '' });
          setShowForm(true);
          setIsEditing(false);
          setErrors({});
        }}
        style={{
          padding: isMobile ? '6px 12px' : '8px 16px',
          fontSize: isMobile ? '0.85rem' : '0.9rem',
          backgroundColor: '#1abc9c',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: isMobile ? '15px' : '20px',
          transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
          transform: 'scale(1)',
          filter: 'brightness(1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.filter = 'brightness(1.1)';
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.filter = 'brightness(1)';
          e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        }}
      >
        + Add Employee
      </button>

      {showForm && (
        <div style={{
          background: '#fff',
          padding: isMobile ? '15px' : '20px',
          borderRadius: '12px',
          borderLeft: isMobile ? '3px solid #1abc9c' : 'none',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: isMobile ? '85%' : '400px',
          marginBottom: isMobile ? '15px' : '25px',
          boxSizing: 'border-box',
          animation: 'fadeInSlideUp 0.5s ease-out'
        }}>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                border: errors.name ? '2px solid #e74c3c' : '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.name ? '#e74c3c' : '#1abc9c';
                e.target.style.boxShadow = errors.name ? '0 2px 8px rgba(231, 76, 60, 0.3)' : '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? '#e74c3c' : '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
            {errors.name && (
              <span style={{
                color: '#e74c3c',
                fontSize: isMobile ? '0.65rem' : '0.7rem',
                marginTop: '4px',
                display: 'block',
                animation: 'errorShake 0.3s ease-out',
                fontWeight: 500
              }}>
                {errors.name}
              </span>
            )}
          </div>

          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength="10"
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                border: errors.phone ? '2px solid #e74c3c' : '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.phone ? '#e74c3c' : '#1abc9c';
                e.target.style.boxShadow = errors.phone ? '0 2px 8px rgba(231, 76, 60, 0.3)' : '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.phone ? '#e74c3c' : '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
            {errors.phone && (
              <span style={{
                color: '#e74c3c',
                fontSize: isMobile ? '0.65rem' : '0.7rem',
                marginTop: '4px',
                display: 'block',
                animation: 'errorShake 0.3s ease-out',
                fontWeight: 500
              }}>
                {errors.phone}
              </span>
            )}
          </div>

          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                border: errors.salary ? '2px solid #e74c3c' : '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.salary ? '#e74c3c' : '#1abc9c';
                e.target.style.boxShadow = errors.salary ? '0 2px 8px rgba(231, 76, 60, 0.3)' : '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.salary ? '#e74c3c' : '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
            {errors.salary && (
              <span style={{
                color: '#e74c3c',
                fontSize: isMobile ? '0.65rem' : '0.7rem',
                marginTop: '4px',
                display: 'block',
                animation: 'errorShake 0.3s ease-out',
                fontWeight: 500
              }}>
                {errors.salary}
              </span>
            )}
          </div>

          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                border: errors.experience ? '2px solid #e74c3c' : '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.experience ? '#e74c3c' : '#1abc9c';
                e.target.style.boxShadow = errors.experience ? '0 2px 8px rgba(231, 76, 60, 0.3)' : '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.experience ? '#e74c3c' : '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
            {errors.experience && (
              <span style={{
                color: '#e74c3c',
                fontSize: isMobile ? '0.65rem' : '0.7rem',
                marginTop: '4px',
                display: 'block',
                animation: 'errorShake 0.3s ease-out',
                fontWeight: 500
              }}>
                {errors.experience}
              </span>
            )}
          </div>

          {errors.general && (
            <div style={{
              color: '#e74c3c',
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              marginBottom: '12px',
              textAlign: 'center',
              animation: 'errorShake 0.3s ease-out',
              fontWeight: 500
            }}>
              {errors.general}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: isMobile ? '8px' : '10px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                backgroundColor: isEditing ? '#f1c40f' : '#1abc9c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                transform: 'scale(1)',
                filter: 'brightness(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
              }}
            >
              {isEditing ? 'Update' : 'Submit'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setIsEditing(false);
                setFormData({ name: '', phone: '', salary: '', experience: '' });
                setErrors({});
              }}
              style={{
                flex: 1,
                padding: isMobile ? '8px' : '10px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                transform: 'scale(1)',
                filter: 'brightness(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.filter = 'brightness(1)';
                e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setShowSuccess(false)}
          screenWidth={screenWidth}
        />
      )}

      {showDeleteModal && createPortal(
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeInScale 0.3s ease-out forwards',
            pointerEvents: 'auto'
          }} onClick={handleCancelDelete} />

          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: isMobile ? '85%' : '400px',
            maxWidth: '1000px',
            maxHeight: '100vh',
            overflowY: 'auto',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            padding: isMobile ? '12px' : '15px',
            animation: 'modalAppear 0.3s ease-out forwards',
            fontFamily: "'Poppins', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}
            onMouseEnter={() => {
              if (svgIconRef.current && !showDustbin) {
                svgIconRef.current.style.animation = 'bounce 0.6s ease infinite';
              }
            }}
            onMouseLeave={() => {
              if (svgIconRef.current && !showDustbin) {
                svgIconRef.current.style.animation = 'none';
              }
            }}
          >
            {!showDustbin ? (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <svg
                  ref={svgIconRef}
                  className="icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{
                    width: isMobile ? '32px' : '40px',
                    height: isMobile ? '32px' : '40px',
                    margin: '0 auto 12px',
                    fill: '#e74c3c'
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  />
                </svg>
                <h2 style={{
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  fontWeight: 700,
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Are you sure?
                </h2>
                <p style={{
                  fontSize: isMobile ? '0.8rem' : '0.85rem',
                  color: '#7f8c8d',
                  fontWeight: 400,
                  lineHeight: '1.4',
                  padding: '0 8px'
                }}>
                  Do you really want to delete this employee? This process cannot be undone.
                </p>
              </div>
            ) : (
              <div style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                borderRadius: '50%',
                backgroundColor: '#2c2c2c',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                margin: '15px auto'
              }}>
                <svg
                  style={{
                    width: isMobile ? '20px' : '24px',
                    height: isMobile ? '20px' : '24px',
                    fill: 'white'
                  }}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4" y="4" width="8" height="10" rx="1"
                    fill="white"
                  />
                  <rect
                    className="lid"
                    x="4" y="2" width="8" height="2" rx="0.5"
                    fill="white"
                    style={{
                      transformOrigin: '4 2',
                      animation: 'openLid 0.3s ease-out forwards, closeLid 0.3s ease-out 0.7s forwards'
                    }}
                  />
                  <path
                    d="M6 6H7V12H6V6Z"
                    fill="black"
                    style={{ opacity: showDustbin ? '0.5' : '1', transition: 'opacity 0.4s ease-out 0.3s' }}
                  />
                  <path
                    d="M9 6H10V12H9V6Z"
                    fill="black"
                    style={{ opacity: showDustbin ? '0.5' : '1', transition: 'opacity 0.4s ease-out 0.3s' }}
                  />
                </svg>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '3px',
                      height: '2px',
                      backgroundColor: 'white',
                      top: isMobile ? '15px' : '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      animation: 'throwTrash 0.4s ease-out forwards',
                      animationDelay: `${0.3 + i * 0.05}s`
                    }}
                  />
                ))}
              </div>
            )}

            {!showDustbin && (
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '10px',
                padding: '10px',
                justifyContent: 'center',
                width: '100%'
              }}>
                <button
                  onClick={handleCancelDelete}
                  style={{
                    flex: 1,
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    fontSize: isMobile ? '0.8rem' : '0.85rem',
                    backgroundColor: '#7f8c8d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    transform: 'scale(1)',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#6c7a89';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#7f8c8d';
                    e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#6c7a89';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#7f8c8d';
                    e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  style={{
                    flex: 1,
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    fontSize: isMobile ? '0.8rem' : '0.85rem',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    transform: 'scale(1)',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#c0392b';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#e74c3c';
                    e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#c0392b';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#e74c3c';
                    e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                  }}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </>,
        document.body
      )}

      <div style={{
        width: '100%',
        maxWidth: '1000px', // Match ServicePage
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        overflow: isMobile ? 'visible' : 'hidden',
        boxSizing: 'border-box'
      }}>
        {isMobile ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '12px'
          }}>
            {currentEmployees.map((emp, index) => (
              <div
                key={emp._id}
                style={{
                  background: '#fff',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  transform: deletingEmployeeId === emp._id ? 'translateX(-20px) scale(0.8)' : 'scale(1)',
                  opacity: deletingEmployeeId === emp._id ? 0 : 1,
                  animation: deletingEmployeeId === emp._id
                    ? 'fadeInScale 0.3s ease-out forwards'
                    : `fadeInSlideUp 0.5s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  if (deletingEmployeeId !== emp._id) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (deletingEmployeeId !== emp._id) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>Name:</strong>
                  <span style={{ color: '#2c3e50', fontSize: '0.8rem', lineHeight: 1.4, background: '#f1f3f5', padding: '6px', borderRadius: '6px' }}>{emp.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>Phone:</strong>
                  <span style={{ color: '#2c3e50', fontSize: '0.8rem', lineHeight: 1.4, background: '#f1f3f5', padding: '6px', borderRadius: '6px' }}>{emp.phone}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>Salary:</strong>
                  <span style={{ color: '#2c3e50', fontSize: '0.8rem', lineHeight: 1.4, background: '#f1f3f5', padding: '6px', borderRadius: '6px' }}>₹{emp.salary}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>Experience:</strong>
                  <span style={{ color: '#2c3e50', fontSize: '0.8rem', lineHeight: 1.4, background: '#f1f3f5', padding: '6px', borderRadius: '6px' }}>{emp.experience}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <strong style={{ color: '#1abc9c', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>Actions:</strong>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                      <button
                        onClick={() => handleEdit(index)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px 8px',
                          fontSize: isMobile ? '0.75rem' : '0.8rem',
                          fontWeight: 500,
                          color: '#fff',
                          backgroundColor: '#1abc9c',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                          transform: 'scale(1)',
                          filter: 'brightness(1)'
                        }}
                        onMouseEnter={(e) => {
                          setShowTooltip(prev => ({ ...prev, [`edit_${emp._id}`]: true }));
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.filter = 'brightness(1.1)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          setShowTooltip(prev => ({ ...prev, [`edit_${emp._id}`]: false }));
                          e.target.style.transform = 'scale(1)';
                          e.target.style.filter = 'brightness(1)';
                          e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            width: '14px',
                            height: '14px',
                            marginRight: '4px'
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-28px',
                          left: '50%',
                          transform: `translateX(-50%) translateY(${showTooltip[`edit_${emp._id}`] ? '0' : '10px'})`,
                          backgroundColor: '#2c3e50',
                          color: '#fff',
                          fontSize: isMobile ? '0.65rem' : '0.7rem',
                          fontWeight: 600,
                          padding: '4px 6px',
                          borderRadius: '4px',
                          opacity: showTooltip[`edit_${emp._id}`] ? 1 : 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }}
                      >
                        Edit
                      </span>
                    </div>

                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                      <button
                        onClick={() => handleDeleteClick(emp._id)}
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          backgroundColor: 'rgb(20, 20, 20)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          transition: 'background 0.3s ease, box-shadow 0.3s ease',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#8B0000';
                          e.target.style.boxShadow = '0 4px 12px rgba(255,165,0,0.5)';
                          const svg = e.target.querySelector('svg');
                          if (svg) svg.style.animation = 'shake 0.3s ease-in-out';
                          const lid = svg && svg.querySelector('.lid');
                          if (lid) lid.style.animation = 'openLid 0.2s ease-out forwards, closeLid 0.2s ease-out 0.4s forwards';
                          const paths = svg && svg.querySelectorAll('path');
                          paths && paths.forEach(p => p.style.opacity = '0.5');
                          paths && paths.forEach(p => p.style.transition = 'opacity 0.2s ease-out 0.2s');
                          const particles = e.target.querySelectorAll('.particle');
                          particles.forEach((p, i) => {
                            p.style.animation = `throwTrash 0.2s ease-out ${0.2 + i * 0.05}s forwards`;
                          });
                          setShowTooltip(prev => ({ ...prev, [`delete_${emp._id}`]: true }));
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                          e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                          const svg = e.target.querySelector('svg');
                          if (svg) svg.style.animation = 'none';
                          const lid = svg && svg.querySelector('.lid');
                          if (lid) lid.style.animation = 'none';
                          const paths = svg && svg.querySelectorAll('path');
                          paths && paths.forEach(p => p.style.opacity = '1');
                          paths && paths.forEach(p => p.style.transition = 'none');
                          const particles = e.target.querySelectorAll('.particle');
                          particles.forEach(p => p.style.animation = 'none');
                          setShowTooltip(prev => ({ ...prev, [`delete_${emp._id}`]: false }));
                        }}
                        onTouchStart={(e) => {
                          e.target.style.backgroundColor = '#8B0000';
                          e.target.style.boxShadow = '0 4px 12px rgba(255,165,0,0.5)';
                          const svg = e.target.querySelector('svg');
                          if (svg) svg.style.animation = 'shake 0.3s ease-in-out';
                          const lid = svg && svg.querySelector('.lid');
                          if (lid) lid.style.animation = 'openLid 0.2s ease-out forwards, closeLid 0.2s ease-out 0.4s forwards';
                          const paths = svg && svg.querySelectorAll('path');
                          paths && paths.forEach(p => p.style.opacity = '0.5');
                          paths && paths.forEach(p => p.style.transition = 'opacity 0.2s ease-out 0.2s');
                          const particles = e.target.querySelectorAll('.particle');
                          particles.forEach((p, i) => {
                            p.style.animation = `throwTrash 0.2s ease-out ${0.2 + i * 0.05}s forwards`;
                          });
                        }}
                        onTouchEnd={(e) => {
                          e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                          e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                          const svg = e.target.querySelector('svg');
                          if (svg) svg.style.animation = 'none';
                          const lid = svg && svg.querySelector('.lid');
                          if (lid) lid.style.animation = 'none';
                          const paths = svg && svg.querySelectorAll('path');
                          paths && paths.forEach(p => p.style.opacity = '1');
                          paths && paths.forEach(p => p.style.transition = 'none');
                          const particles = e.target.querySelectorAll('.particle');
                          particles.forEach(p => p.style.animation = 'none');
                        }}
                      >
                        <svg
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: 'white'
                          }}
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="4" y="4" width="8" height="10" rx="1"
                            fill="white"
                          />
                          <rect
                            className="lid"
                            x="4" y="2" width="8" height="2" rx="0.5"
                            fill="white"
                            style={{ transformOrigin: '4 2' }}
                          />
                          <path
                            d="M6 6H7V12H6V6Z"
                            fill="black"
                          />
                          <path
                            d="M9 6H10V12H9V6Z"
                            fill="black"
                          />
                        </svg>
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="particle"
                            style={{
                              position: 'absolute',
                              width: '2px',
                              height: '1px',
                              backgroundColor: 'white',
                              top: '10px',
                              left: '50%',
                              transform: 'translateX(-50%)'
                            }}
                          />
                        ))}
                      </button>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-28px',
                          left: '50%',
                          transform: `translateX(-50%) translateY(${showTooltip[`delete_${emp._id}`] ? '0' : '10px'})`,
                          backgroundColor: '#2c3e50',
                          color: '#fff',
                          fontSize: isMobile ? '0.65rem' : '0.7rem',
                          fontWeight: 600,
                          padding: '4px 6px',
                          borderRadius: '4px',
                          opacity: showTooltip[`delete_${emp._id}`] ? 1 : 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {currentEmployees.length === 0 && (
              <div style={{
                padding: '12px',
                textAlign: 'center',
                color: '#7f8c8d',
                fontStyle: 'italic',
                fontSize: isMobile ? '0.8rem' : '0.85rem',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                maxWidth: isMobile ? '80%' : '90%',
                margin: '10px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40px',
                animation: 'fadeInSlideUp 0.5s ease-out'
              }}>
                No Employees Found
              </div>
            )}
          </div>
        ) : (
          <div style={{
            overflowX: 'auto', // Match ServicePage for responsiveness
            width: '100%',
            maxWidth: '1000px', // Match ServicePage
            margin: '0 auto' // Center the table container
          }}>
            <table style={{
              width: '100%',
              minWidth: '600px', // Match ServicePage
              maxWidth: '1000px', // Match ServicePage
              margin: '0 auto',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
              color: '#2c3e50'
            }}>
              <thead>
                <tr style={{
                  background: '#1abc9c',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <th style={{ padding: screenWidth <= 1024 ? '6px' : '8px', textAlign: 'left', fontSize: '0.85rem' }}>Name</th>
                  <th style={{ padding: screenWidth <= 1024 ? '6px' : '8px', textAlign: 'left', fontSize: '0.85rem' }}>Phone</th>
                  <th style={{ padding: screenWidth <= 1024 ? '6px' : '8px', textAlign: 'left', fontSize: '0.85rem' }}>Salary</th>
                  <th style={{ padding: screenWidth <= 1024 ? '6px' : '8px', textAlign: 'left', fontSize: '0.85rem' }}>Experience</th>
                  <th style={{ padding: screenWidth <= 1024 ? '6px' : '8px', textAlign: 'left', fontSize: '0.85rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp, index) => (
                  <tr
                    key={emp._id}
                    style={{
                      borderBottom: '1px solid #dfe6e9',
                      transition: 'background 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
                      backgroundColor: (indexOfFirstEmployee + index) % 2 === 0 ? '#f9fbfc' : '#fff',
                      transform: deletingEmployeeId === emp._id ? 'translateX(-20px) scale(0.8)' : 'scale(1)',
                      opacity: deletingEmployeeId === emp._id ? 0 : 1,
                      animation: deletingEmployeeId === emp._id
                        ? 'fadeInScale 0.3s ease-out forwards'
                        : `fadeInSlideUp 0.5s ease-out ${(indexOfFirstEmployee + index) * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      if (deletingEmployeeId !== emp._id) {
                        e.currentTarget.style.backgroundColor = '#e8f4f8';
                        e.currentTarget.style.transform = 'scale(1.01)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deletingEmployeeId !== emp._id) {
                        e.currentTarget.style.backgroundColor = (indexOfFirstEmployee + index) % 2 === 0 ? '#f9fbfc' : '#fff';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <td style={{ padding: screenWidth <= 1024 ? '6px' : '8px', fontSize: '0.85rem' }}>{emp.name}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '6px' : '8px', fontSize: '0.85rem' }}>{emp.phone}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '6px' : '8px', fontSize: '0.85rem' }}>₹{emp.salary}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '6px' : '8px', fontSize: '0.85rem' }}>{emp.experience}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '6px' : '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                        <button
                          onClick={() => handleEdit(index)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: '#fff',
                            backgroundColor: '#1abc9c',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                            transform: 'scale(1)',
                            filter: 'brightness(1)'
                          }}
                          onMouseEnter={(e) => {
                            setShowTooltip(prev => ({ ...prev, [`edit_${emp._id}`]: true }));
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.filter = 'brightness(1.1)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            setShowTooltip(prev => ({ ...prev, [`edit_${emp._id}`]: false }));
                            e.target.style.transform = 'scale(1)';
                            e.target.style.filter = 'brightness(1)';
                            e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{
                              width: '14px',
                              height: '14px',
                              marginRight: '4px'
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Edit
                        </button>
                        <span
                          style={{
                            position: 'absolute',
                            top: '-28px',
                            left: '50%',
                            transform: `translateX(-50%) translateY(${showTooltip[`edit_${emp._id}`] ? '0' : '10px'})`,
                            backgroundColor: '#2c3e50',
                            color: '#fff',
                            fontSize: screenWidth <= 768 ? '0.65rem' : '0.7rem',
                            fontWeight: 600,
                            padding: '4px 6px',
                            borderRadius: '4px',
                            opacity: showTooltip[`edit_${emp._id}`] ? 1 : 0,
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                            pointerEvents: 'none',
                            zIndex: 10
                          }}
                        >
                          Edit
                        </span>
                      </div>

                      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                        <button
                          onClick={() => handleDeleteClick(emp._id)}
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(20, 20, 20)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease, box-shadow 0.3s ease',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#8B0000';
                            e.target.style.boxShadow = '0 4px 12px rgba(255,165,0,0.5)';
                            const svg = e.target.querySelector('svg');
                            if (svg) svg.style.animation = 'shake 0.3s ease-in-out';
                            const lid = svg && svg.querySelector('.lid');
                            if (lid) lid.style.animation = 'openLid 0.2s ease-out forwards, closeLid 0.2s ease-out 0.4s forwards';
                            const paths = svg && svg.querySelectorAll('path');
                            paths && paths.forEach(p => p.style.opacity = '0.5');
                            paths && paths.forEach(p => p.style.transition = 'opacity 0.2s ease-out 0.2s');
                            const particles = e.target.querySelectorAll('.particle');
                            particles.forEach((p, i) => {
                              p.style.animation = `throwTrash 0.2s ease-out ${0.2 + i * 0.05}s forwards`;
                            });
                            setShowTooltip(prev => ({ ...prev, [`delete_${emp._id}`]: true }));
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                            e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                            const svg = e.target.querySelector('svg');
                            if (svg) svg.style.animation = 'none';
                            const lid = svg && svg.querySelector('.lid');
                            if (lid) lid.style.animation = 'none';
                            const paths = svg && svg.querySelectorAll('path');
                            paths && paths.forEach(p => p.style.opacity = '1');
                            paths && paths.forEach(p => p.style.transition = 'none');
                            const particles = e.target.querySelectorAll('.particle');
                            particles.forEach(p => p.style.animation = 'none');
                            setShowTooltip(prev => ({ ...prev, [`delete_${emp._id}`]: false }));
                          }}
                          onTouchStart={(e) => {
                            e.target.style.backgroundColor = '#8B0000';
                            e.target.style.boxShadow = '0 4px 12px rgba(255,165,0,0.5)';
                            const svg = e.target.querySelector('svg');
                            if (svg) svg.style.animation = 'shake 0.3s ease-in-out';
                            const lid = svg && svg.querySelector('.lid');
                            if (lid) lid.style.animation = 'openLid 0.2s ease-out forwards, closeLid 0.2s ease-out 0.4s forwards';
                            const paths = svg && svg.querySelectorAll('path');
                            paths && paths.forEach(p => p.style.opacity = '0.5');
                            paths && paths.forEach(p => p.style.transition = 'opacity 0.2s ease-out 0.2s');
                            const particles = e.target.querySelectorAll('.particle');
                            particles.forEach((p, i) => {
                              p.style.animation = `throwTrash 0.2s ease-out ${0.2 + i * 0.05}s forwards`;
                            });
                          }}
                          onTouchEnd={(e) => {
                            e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                            e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                            const svg = e.target.querySelector('svg');
                            if (svg) svg.style.animation = 'none';
                            const lid = svg && svg.querySelector('.lid');
                            if (lid) lid.style.animation = 'none';
                            const paths = svg && svg.querySelectorAll('path');
                            paths && paths.forEach(p => p.style.opacity = '1');
                            paths && paths.forEach(p => p.style.transition = 'none');
                            const particles = e.target.querySelectorAll('.particle');
                            particles.forEach(p => p.style.animation = 'none');
                          }}
                        >
                          <svg
                            style={{
                              width: '14px',
                              height: '14px',
                              fill: 'white'
                            }}
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="4" y="4" width="8" height="10" rx="1"
                              fill="white"
                            />
                            <rect
                              className="lid"
                              x="4" y="2" width="8" height="2" rx="0.5"
                              fill="white"
                              style={{ transformOrigin: '4 2' }}
                            />
                            <path
                              d="M6 6H7V12H6V6Z"
                              fill="black"
                            />
                            <path
                              d="M9 6H10V12H9V6Z"
                              fill="black"
                            />
                          </svg>
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="particle"
                              style={{
                                position: 'absolute',
                                width: '2px',
                                height: '1px',
                                backgroundColor: 'white',
                                top: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)'
                              }}
                            />
                          ))}
                        </button>
                        <span
                          style={{
                            position: 'absolute',
                            top: '-28px',
                            left: '50%',
                            transform: `translateX(-50%) translateY(${showTooltip[`delete_${emp._id}`] ? '0' : '10px'})`,
                            backgroundColor: '#2c3e50',
                            color: '#fff',
                            fontSize: screenWidth <= 768 ? '0.65rem' : '0.7rem',
                            fontWeight: 600,
                            padding: '4px 6px',
                            borderRadius: '4px',
                            opacity: showTooltip[`delete_${emp._id}`] ? 1 : 0,
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                            pointerEvents: 'none',
                            zIndex: 10
                          }}
                        >
                          Delete
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        color: '#7f8c8d',
                        fontStyle: 'italic',
                        fontSize: '0.85rem',
                        animation: 'fadeInSlideUp 0.5s ease-out'
                      }}
                    >
                      No Employees Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {employees.length > employeesPerPage && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: isMobile ? '15px' : '20px',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              fontSize: isMobile ? '0.8rem' : '0.85rem',
              backgroundColor: currentPage === 1 ? '#dfe6e9' : '#1abc9c',
              color: currentPage === 1 ? '#7f8c8d' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              transform: 'scale(1)',
              filter: 'brightness(1)'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'brightness(1)';
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            }}
            onTouchStart={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'brightness(1)';
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            }}
          >
            Previous
          </button>
          <span style={{
            fontSize: isMobile ? '0.8rem' : '0.85rem',
            color: '#2c3e50'
          }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              fontSize: isMobile ? '0.8rem' : '0.85rem',
              backgroundColor: currentPage === totalPages ? '#dfe6e9' : '#1abc9c',
              color: currentPage === totalPages ? '#7f8c8d' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              transform: 'scale(1)',
              filter: 'brightness(1)'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'brightness(1)';
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            }}
            onTouchStart={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.filter = 'brightness(1)';
              e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;