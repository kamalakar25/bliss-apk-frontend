import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const SuccessMessage = ({ message, onClose, screenWidth }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isAddService = message.toLowerCase().includes('added');

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
        width: screenWidth <= 768 ? '85%' : '20rem',
        maxWidth: '22rem',
        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        border: '2px solid #4caf50',
        borderRadius: '1rem',
        zIndex: 1002,
        animation: isAddService ? 'riseInAdd 0.5s ease-out' : 'riseInUpdate 0.5s ease-out',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2), 0 0 10px rgba(76,175,80,0.3)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          padding: '1.25rem',
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
                animation: `particleBurst${isAddService ? 'Add' : 'Update'} 0.6s ease-out ${i * 0.04}s forwards`
              }}
            />
          ))}
          <div style={{
            display: 'inline-block',
            width: '44px',
            height: '44px',
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
              width: '30px',
              height: '30px',
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
              width: '26px',
              height: '26px',
              transform: 'translate(-50%, -50%)'
            }}>
              <div style={{
                position: 'absolute',
                left: '8px',
                bottom: '4px',
                width: '4px',
                height: '12px',
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
                left: '8px',
                bottom: '4px',
                width: '14px',
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
            fontSize: '1.1rem',
            color: '#4caf50',
            fontWeight: 700,
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {message}
          </h4>
          <p style={{
            fontSize: '0.85rem',
            color: '#2d3436',
            fontWeight: 400
          }}>
            Success!
          </p>
        </div>
        <div style={{
          padding: '0.5rem',
          textAlign: 'center',
          background: '#f1f3f5',
          borderTop: '1px solid #dfe6e9'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#fff',
              background: '#4caf50',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 6px rgba(76,175,80,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#388e3c';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 10px rgba(76,175,80,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#4caf50';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 6px rgba(76,175,80,0.3)';
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

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [role, setRole] = useState('');
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [showDustbin, setShowDustbin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 4;
  const itemRefs = useRef({});
  const svgIconRef = useRef(null);

  const [formData, setFormData] = useState({
    serviceName: '',
    style: '',
    price: '',
    imageFile: null,
    imagePreview: ''
  });

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getRole = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:5000/api/users/role/${email}`);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    getRole();
  }, []);

  const fetchServices = async () => {
    const userEmail = localStorage.getItem('email');
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/get-services/${userEmail}`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleEdit = (index) => {
    setFormData({
      serviceName: services[index].serviceName,
      style: services[index].style || '',
      price: services[index].price,
      imageFile: null,
      imagePreview: services[index].shopImage ? `http://localhost:5000/${services[index].shopImage}` : ''
    });
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleCreate = async () => {
    const form = new FormData();
    form.append('serviceName', formData.serviceName);
    form.append('style', formData.style);
    form.append('price', formData.price);
    form.append('shopImage', formData.imageFile);

    const userEmail = localStorage.getItem('email');

    try {
      const response = await axios.post(`http://localhost:5000/api/admin/add-service/${userEmail}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200) {
        setServices(response.data.services);
        setShowForm(false);
        setFormData({ serviceName: '', style: '', price: '', imageFile: null, imagePreview: '' });
        setSuccessMessage('Service added successfully!');
        setShowSuccess(true);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append('serviceName', formData.serviceName);
    form.append('style', formData.style);
    form.append('price', formData.price);
    if (formData.imageFile) {
      form.append('shopImage', formData.imageFile);
    }

    const serviceId = services[editIndex]._id;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-service/${serviceId}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.status === 200) {
        const updatedService = response.data.updatedService;
        const updatedServices = [...services];
        updatedServices[editIndex] = updatedService;
        setServices(updatedServices);
        setShowForm(false);
        setIsEditing(false);
        setFormData({ serviceName: '', style: '', price: '', imageFile: null, imagePreview: '' });
        setSuccessMessage('Service updated successfully!');
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteClick = (_id) => {
    setShowDeleteModal(true);
    setPendingDeleteId(_id);
  };

  const triggerDeleteAnimation = async (_id) => {
    setDeletingServiceId(_id);
    setShowDustbin(true);

    setTimeout(async () => {
      setShowDustbin(false);
      setShowDeleteModal(false);
      setDeletingServiceId(null);
      try {
        await axios.delete(`http://localhost:5000/api/admin/deleteService/${_id}`);
        fetchServices();
        const totalPages = Math.ceil(services.length / servicesPerPage);
        if (currentPage > totalPages && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Error deleting service:', error);
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

  const isMobile = screenWidth <= 768;
  const isVerySmallScreen = screenWidth <= 400;

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);

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
      100% { transform: translate(-50%, -50%) translate(calc(80px * cos(${Math.random() * 360}deg)), calc(80px * sin(${Math.random() * 360}deg))) scale(0); opacity: 0; }
    }
    @keyframes particleBurstUpdate {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) translate(calc(60px * cos(${Math.random() * 360}deg)), calc(60px * sin(${Math.random() * 360}deg))) scale(0.4); opacity: 0; }
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
    @keyframes modalAppear {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes openLid {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-45deg); }
    }
    @keyframes closeLid {
      0% { transform: rotate(-45deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes throwTrash {
      0% { transform: translateX(-50%) translateY(0); opacity: 1; }
      100% { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      75% { transform: translateX(2px); }
    }
    @keyframes fadeInScale {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
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

      {showSuccess && createPortal(
        <SuccessMessage
          message={successMessage}
          onClose={() => setShowSuccess(false)}
          screenWidth={screenWidth}
        />,
        document.body
      )}

      <h2 style={{
        fontSize: isMobile ? '1.5rem' : '2rem',
        color: '#2c3e50',
        marginBottom: isMobile ? '15px' : '30px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        animation: 'fadeInSlideUp 0.5s ease-out'
      }}>Service Management</h2>

      <button
        onClick={() => {
          setFormData({ serviceName: '', style: '', price: '', imageFile: null, imagePreview: '' });
          setShowForm(true);
          setIsEditing(false);
        }}
        style={{
          padding: isMobile ? '10px 20px' : '12px 24px',
          fontSize: isMobile ? '0.9rem' : '0.95rem',
          backgroundColor: '#1abc9c',
          color: '#fff',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          marginBottom: isMobile ? '15px' : '25px',
          transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transform: 'scale(1)',
          filter: 'brightness(1)',
          animation: 'fadeInScale 0.5s ease-out'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.filter = 'brightness(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.filter = 'brightness(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
        onTouchStart={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.filter = 'brightness(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        }}
        onTouchEnd={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.filter = 'brightness(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
      >
        + Add Service
      </button>

      {showForm && (() => {
        const roleOptions = {
          Salon: ["HairCut", "Facial", "HairColor", "Shaving"],
          Beauty_Parler: ["HairCut", "Bridal", "Waxing", "Pedicure"],
          Doctor: ["Hair Treatment", "Skin Treatment"]
        };
        const options = roleOptions[role] || [];

        return (
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
            <select
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                marginBottom: '12px',
                border: '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1abc9c';
                e.target.style.boxShadow = '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <option value="" disabled>Select Service</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="style"
              placeholder="Style (e.g. Layer Cut, Balayage)"
              value={formData.style}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                marginBottom: '12px',
                border: '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1abc9c';
                e.target.style.boxShadow = '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                marginBottom: '12px',
                border: '2px solid #dfe6e9',
                borderRadius: '8px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1abc9c';
                e.target.style.boxShadow = '0 2px 8px rgba(26,188,156,0.3)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#dfe6e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: '100%',
                padding: isMobile ? '8px' : '10px',
                marginBottom: '12px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#2c3e50',
                boxSizing: 'border-box'
              }}
            />

            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                style={{
                  width: isMobile ? '80px' : '100px',
                  height: isMobile ? '80px' : '100px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  animation: 'fadeInScale 0.5s ease-out',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                  console.error('Error loading preview image:', formData.imagePreview);
                }}
              />
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
                  filter: 'brightness(1)',
                  animation: 'fadeInScale 0.5s ease-out'
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
                  filter: 'brightness(1)',
                  animation: 'fadeInScale 0.5s ease-out'
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
        );
      })()}

      {showDeleteModal && createPortal(
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            height: '-webkit-fill-available',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeInScale 0.3s ease-out forwards',
            pointerEvents: 'auto'
          }} onClick={handleCancelDelete} />

          <div style={{
            position: 'fixed',
            top: screenWidth <= 320 ? '45%' : screenWidth <= 375 ? '45%' : screenWidth <= 480 ? '45%' : screenWidth <= 768 ? '45%' : screenWidth <= 1024 ? '45%' : '50%',
            left: screenWidth <= 320 ? '50%' : screenWidth <= 375 ? '50%' : screenWidth <= 480 ? '50%' : screenWidth <= 768 ? '50%' : screenWidth <= 1024 ? '50%' : '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: screenWidth <= 480 ? '90%' : screenWidth <= 768 ? '85%' : screenWidth <= 1024 ? '80%' : screenWidth <= 1440 ? '350px' : '400px',
            maxWidth: screenWidth <= 480 ? '260px' : screenWidth <= 768 ? '300px' : screenWidth <= 1024 ? '340px' : screenWidth <= 1440 ? '350px' : '400px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#fff',
            borderRadius: '12px',
            borderLeft: screenWidth <= 768 ? '3px solid #1abc9c' : 'none',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            padding: screenWidth <= 480 ? '14px' : screenWidth <= 768 ? '16px' : '20px',
            animation: 'modalAppear 0.3s ease-out forwards',
            willChange: 'opacity, transform',
            fontFamily: "'Poppins', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            margin: 0
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
                    width: screenWidth <= 480 ? '32px' : screenWidth <= 768 ? '36px' : screenWidth <= 1024 ? '40px' : '48px',
                    height: screenWidth <= 480 ? '32px' : screenWidth <= 768 ? '36px' : screenWidth <= 1024 ? '40px' : '48px',
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
                  fontSize: screenWidth <= 480 ? '0.95rem' : screenWidth <= 768 ? '1rem' : '1.1rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>
                  Are you sure?
                </h2>
                <p style={{
                  fontSize: screenWidth <= 480 ? '0.7rem' : screenWidth <= 768 ? '0.75rem' : '0.8rem',
                  color: '#7f8c8d',
                  fontWeight: 500,
                  lineHeight: '1.5',
                  padding: '0 6px'
                }}>
                  Do you really want to delete this service? This process cannot be undone.
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
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
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
                      top: isMobile ? '18px' : '22px',
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
                flexDirection: screenWidth <= 768 ? 'column' : 'row',
                gap: screenWidth <= 768 ? '10px' : '12px',
                padding: '10px',
                justifyContent: 'center',
                width: '100%'
              }}>
                <button
                  onClick={handleCancelDelete}
                  style={{
                    flex: 1,
                    padding: screenWidth <= 768 ? '8px' : '10px',
                    fontSize: screenWidth <= 480 ? '0.75rem' : screenWidth <= 768 ? '0.8rem' : '0.85rem',
                    backgroundColor: '#7f8c8d',
                    color: '#fff',
                    border: '2px solid #7f8c8d',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transform: 'scale(1)',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#6c7a89';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#7f8c8d';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#6c7a89';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#7f8c8d';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  style={{
                    flex: 1,
                    padding: screenWidth <= 768 ? '8px' : '10px',
                    fontSize: screenWidth <= 480 ? '0.75rem' : screenWidth <= 768 ? '0.8rem' : '0.85rem',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: '2px solid #e74c3c',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transform: 'scale(1)',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#c0392b';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#e74c3c';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#c0392b';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#e74c3c';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
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
        maxWidth: screenWidth <= 1024 ? '100%' : '1000px',
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
            {currentServices.map((svc, index) => (
              <div
                key={svc._id}
                ref={(el) => (itemRefs.current[svc._id] = el)}
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
                  overflow: 'visible',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  transform: deletingServiceId === svc._id ? 'translateX(-20px) scale(0.8)' : 'scale(1)',
                  opacity: deletingServiceId === svc._id ? 0 : 1,
                  animation: deletingServiceId === svc._id
                    ? 'fadeInScale 0.3s ease-out forwards'
                    : `fadeInSlideUp 0.5s ease-out ${(indexOfFirstService + index) * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  if (deletingServiceId !== svc._id) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (deletingServiceId !== svc._id) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
                  }
                }}
                onTouchStart={(e) => {
                  if (deletingServiceId !== svc._id) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                  }
                }}
                onTouchEnd={(e) => {
                  if (deletingServiceId !== svc._id) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
                  }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Service Name:</strong>
                  <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{svc.serviceName}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Style:</strong>
                  <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>{svc.style || '-'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Price:</strong>
                  <span style={{ color: '#2c3e50', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>₹{svc.price}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                  <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Image:</strong>
                  {svc.shopImage ? (
                    <img
                      src={`http://localhost:5000/${svc.shopImage}`}
                      alt={svc.serviceName}
                      style={{
                        width: isVerySmallScreen ? '60px' : '80px',
                        height: isVerySmallScreen ? '45px' : '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        animation: 'fadeInScale 0.5s ease-out',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                        console.error('Error loading image:', svc.shopImage);
                      }}
                    />
                  ) : (
                    <span style={{ color: '#7f8c8d', fontSize: isVerySmallScreen ? '0.8rem' : '0.85rem', lineHeight: 1.5, background: '#f1f3f5', padding: '5px', borderRadius: '5px' }}>No Image</span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                  <strong style={{ color: '#1abc9c', fontSize: isVerySmallScreen ? '0.85rem' : '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>Actions:</strong>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                      <button
                        onClick={() => handleEdit(indexOfFirstService + index)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: isMobile ? '6px 12px' : '5px 10px',
                          fontSize: isMobile ? '0.8rem' : '0.85rem',
                          fontWeight: 500,
                          color: '#fff',
                          backgroundColor: '#1abc9c',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          transform: 'scale(1)',
                          filter: 'brightness(1)',
                          animation: 'fadeInScale 0.5s ease-out'
                        }}
                        onMouseEnter={(e) => {
                          setShowTooltip(prev => ({ ...prev, [`edit_${svc._id}`]: true }));
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.filter = 'brightness(1.1)';
                          e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          setShowTooltip(prev => ({ ...prev, [`edit_${svc._id}`]: false }));
                          e.target.style.transform = 'scale(1)';
                          e.target.style.filter = 'brightness(1)';
                          e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                        }}
                        onTouchStart={(e) => {
                          setShowTooltip(prev => ({ ...prev, [`edit_${svc._id}`]: true }));
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.filter = 'brightness(1.1)';
                          e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                        }}
                        onTouchEnd={(e) => {
                          setShowTooltip(prev => ({ ...prev, [`edit_${svc._id}`]: false }));
                          e.target.style.transform = 'scale(1)';
                          e.target.style.filter = 'brightness(1)';
                          e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            width: isMobile ? '14px' : '12px',
                            height: isMobile ? '14px' : '12px',
                            marginRight: '5px'
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
                          top: isMobile ? '-28px' : '-32px',
                          left: '50%',
                          transform: `translateX(-50%) translateY(${showTooltip[`edit_${svc._id}`] ? '0' : '10px'})`,
                          backgroundColor: '#2c3e50',
                          color: '#fff',
                          fontSize: isMobile ? '0.65rem' : '0.7rem',
                          fontWeight: 600,
                          padding: isMobile ? '4px 6px' : '5px 8px',
                          borderRadius: '4px',
                          opacity: showTooltip[`edit_${svc._id}`] ? 1 : 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                          pointerEvents: 'none',
                          zIndex: 10
                        }}
                      >
                        Edit
                      </span>
                    </div>

                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                      <button
                        onClick={() => handleDeleteClick(svc._id)}
                        style={{
                          width: isMobile ? '35px' : '40px',
                          height: isMobile ? '35px' : '40px',
                          borderRadius: '50%',
                          backgroundColor: 'rgb(20, 20, 20)',
                          border: 'none',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.164)',
                          cursor: 'pointer',
                          transition: 'background 0.3s ease, box-shadow 0.3s ease',
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#8B0000';
                          e.target.style.boxShadow = '0 0 12px #FFA500';
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
                          setShowTooltip(prev => ({ ...prev, [`delete_${svc._id}`]: true }));
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                          e.target.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.164)';
                          const svg = e.target.querySelector('svg');
                          if (svg) svg.style.animation = 'none';
                          const lid = svg && svg.querySelector('.lid');
                          if (lid) lid.style.animation = 'none';
                          const paths = svg && svg.querySelectorAll('path');
                          paths && paths.forEach(p => p.style.opacity = '1');
                          paths && paths.forEach(p => p.style.transition = 'none');
                          const particles = e.target.querySelectorAll('.particle');
                          particles.forEach(p => p.style.animation = 'none');
                          setShowTooltip(prev => ({ ...prev, [`delete_${svc._id}`]: false }));
                        }}
                        onTouchStart={(e) => {
                          e.target.style.backgroundColor = '#8B0000';
                          e.target.style.boxShadow = '0 0 12px #FFA500';
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
                          setShowTooltip(prev => ({ ...prev, [`delete_${svc._id}`]: true }));
                        }}
                        onTouchEnd={(e) => {
                          e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                          e.target.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.164)';
                          const svg = e.target.querySelector('svg');
                          if (svg) svg.style.animation = 'none';
                          const lid = svg && svg.querySelector('.lid');
                          if (lid) lid.style.animation = 'none';
                          const paths = svg && svg.querySelectorAll('path');
                          paths && paths.forEach(p => p.style.opacity = '1');
                          paths && paths.forEach(p => p.style.transition = 'none');
                          const particles = e.target.querySelectorAll('.particle');
                          particles.forEach(p => p.style.animation = 'none');
                          setShowTooltip(prev => ({ ...prev, [`delete_${svc._id}`]: false }));
                        }}
                      >
                        <svg
                          style={{
                            width: isMobile ? '14px' : '16px',
                            height: isMobile ? '14px' : '16px',
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
                              top: isMobile ? '10px' : '12px',
                              left: '50%',
                              transform: 'translateX(-50%)'
                            }}
                          />
                        ))}
                      </button>
                      <span
                        style={{
                          position: 'absolute',
                          top: isMobile ? '-28px' : '-32px',
                          left: '50%',
                          transform: `translateX(-50%) translateY(${showTooltip[`delete_${svc._id}`] ? '0' : '10px'})`,
                          backgroundColor: '#2c3e50',
                          color: '#fff',
                          fontSize: isMobile ? '0.65rem' : '0.7rem',
                          fontWeight: 600,
                          padding: isMobile ? '4px 6px' : '5px 8px',
                          borderRadius: '4px',
                          opacity: showTooltip[`delete_${svc._id}`] ? 1 : 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
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
            {currentServices.length === 0 && (
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
                No Services Found
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
              minWidth: screenWidth <= 1024 ? '800px' : 'auto',
              borderCollapse: 'collapse',
              fontSize: screenWidth <= 1024 ? '0.85rem' : '0.9rem',
              color: '#2c3e50'
            }}>
              <thead>
                <tr style={{
                  background: '#1abc9c',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  <th style={{ padding: screenWidth <= 1024 ? '8px' : '10px', textAlign: 'left', width: '25%' }}>Service Name</th>
                  <th style={{ padding: screenWidth <= 1024 ? '8px' : '10px', textAlign: 'left', width: '25%' }}>Style</th>
                  <th style={{ padding: screenWidth <= 1024 ? '8px' : '10px', textAlign: 'left', width: '15%' }}>Price</th>
                  <th style={{ padding: screenWidth <= 1024 ? '8px' : '10px', textAlign: 'left', width: '20%' }}>Image</th>
                  <th style={{ padding: screenWidth <= 1024 ? '8px' : '10px', textAlign: 'left', width: '15%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((svc, index) => (
                  <tr
                    key={svc._id}
                    ref={(el) => (itemRefs.current[svc._id] = el)}
                    style={{
                      borderBottom: '1px solid #dfe6e9',
                      transition: 'background 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
                      backgroundColor: (                      indexOfFirstService + index) % 2 === 0 ? '#f9fbfc' : '#fff',
                      transform: deletingServiceId === svc._id ? 'translateX(-20px) scale(0.8)' : 'scale(1)',
                      opacity: deletingServiceId === svc._id ? 0 : 1,
                      animation: deletingServiceId === svc._id
                        ? 'fadeInScale 0.3s ease-out forwards'
                        : `fadeInSlideLeft 0.5s ease-out ${(indexOfFirstService + index) * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      if (deletingServiceId !== svc._id) {
                        e.currentTarget.style.backgroundColor = '#e8f4f8';
                        e.currentTarget.style.transform = 'scale(1.01)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deletingServiceId !== svc._id) {
                        e.currentTarget.style.backgroundColor = (indexOfFirstService + index) % 2 === 0 ? '#f9fbfc' : '#fff';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <td style={{ padding: screenWidth <= 1024 ? '8px' : '10px', fontSize: '0.85rem' }}>{svc.serviceName}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '8px' : '10px', fontSize: '0.85rem' }}>{svc.style || '-'}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '8px' : '10px', fontSize: '0.85rem' }}>₹{svc.price}</td>
                    <td style={{ padding: screenWidth <= 1024 ? '8px' : '10px' }}>
                      {svc.shopImage ? (
                        <img
                          src={`http://localhost:5000/${svc.shopImage}`}
                          alt={svc.serviceName}
                          style={{
                            width: '60px',
                            height: '45px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            animation: 'fadeInScale 0.5s ease-out',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                            console.error('Error loading image:', svc.shopImage);
                          }}
                        />
                      ) : (
                        <span style={{ color: '#7f8c8d', fontSize: '0.85rem' }}>No Image</span>
                      )}
                    </td>
                    <td style={{ padding: screenWidth <= 1024 ? '8px' : '10px', position: 'relative' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => handleEdit(indexOfFirstService + index)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '5px 10px',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              color: '#fff',
                              backgroundColor: '#1abc9c',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                              transform: 'scale(1)',
                              filter: 'brightness(1)'
                            }}
                            onMouseEnter={(e) => {
                              setShowTooltip(prev => ({ ...prev, [`edit_${svc._id}`]: true }));
                              e.target.style.transform = 'scale(1.05)';
                              e.target.style.filter = 'brightness(1.1)';
                              e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                              setShowTooltip(prev => ({ ...prev, [`edit_${svc._id}`]: false }));
                              e.target.style.transform = 'scale(1)';
                              e.target.style.filter = 'brightness(1)';
                              e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{
                                width: '12px',
                                height: '12px',
                                marginRight: '5px'
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
                              top: '-32px',
                              left: '50%',
                              transform: `translateX(-50%) translateY(${showTooltip[`edit_${svc._id}`] ? '0' : '10px'})`,
                              backgroundColor: '#2c3e50',
                              color: '#fff',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              padding: '5px 8px',
                              borderRadius: '4px',
                              opacity: showTooltip[`edit_${svc._id}`] ? 1 : 0,
                              transition: 'opacity 0.3s ease, transform 0.3s ease',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                              pointerEvents: 'none',
                              zIndex: 10
                            }}
                          >
                            Edit
                          </span>
                        </div>

                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => handleDeleteClick(svc._id)}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: 'rgb(20, 20, 20)',
                              border: 'none',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.164)',
                              cursor: 'pointer',
                              transition: 'background 0.3s ease, box-shadow 0.3s ease',
                              overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#8B0000';
                              e.target.style.boxShadow = '0 0 12px #FFA500';
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
                              setShowTooltip(prev => ({ ...prev, [`delete_${svc._id}`]: true }));
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgb(20, 20, 20)';
                              e.target.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.164)';
                              const svg = e.target.querySelector('svg');
                              if (svg) svg.style.animation = 'none';
                              const lid = svg && svg.querySelector('.lid');
                              if (lid) lid.style.animation = 'none';
                              const paths = svg && svg.querySelectorAll('path');
                              paths && paths.forEach(p => p.style.opacity = '1');
                              paths && paths.forEach(p => p.style.transition = 'none');
                              const particles = e.target.querySelectorAll('.particle');
                              particles.forEach(p => p.style.animation = 'none');
                              setShowTooltip(prev => ({ ...prev, [`delete_${svc._id}`]: false }));
                            }}
                          >
                            <svg
                              style={{
                                width: '16px',
                                height: '16px',
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
                                  top: '12px',
                                  left: '50%',
                                  transform: 'translateX(-50%)'
                                }}
                              />
                            ))}
                          </button>
                          <span
                            style={{
                              position: 'absolute',
                              top: '-32px',
                              left: '50%',
                              transform: `translateX(-50%) translateY(${showTooltip[`delete_${svc._id}`] ? '0' : '10px'})`,
                              backgroundColor: '#2c3e50',
                              color: '#fff',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              padding: '5px 8px',
                              borderRadius: '4px',
                              opacity: showTooltip[`delete_${svc._id}`] ? 1 : 0,
                              transition: 'opacity 0.3s ease, transform 0.3s ease',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                              pointerEvents: 'none',
                              zIndex: 10
                            }}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {currentServices.length === 0 && (
              <div style={{
                padding: '15px',
                textAlign: 'center',
                color: '#7f8c8d',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                maxWidth: '50%',
                margin: '15px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50px',
                animation: 'fadeInSlideUp 0.5s ease-out'
              }}>
                No Services Found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        marginTop: '15px',
        padding: isMobile ? '10px' : '12px',
        width: '100%',
        maxWidth: screenWidth <= 1024 ? '100%' : '1200px',
        boxSizing: 'border-box'
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
            borderRadius: '6px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
            boxShadow: currentPage === 1 ? 'none' : '0 2px 8px rgba(0,0,0,0.2)',
            transform: 'scale(1)',
            filter: 'brightness(1)',
            animation: 'fadeInScale 0.5s ease-out'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.filter = 'brightness(1.1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1)';
            e.target.style.boxShadow = currentPage === 1 ? 'none' : '0 2px 8px rgba(0,0,0,0.2)';
          }}
          onTouchStart={(e) => {
            if (currentPage !== 1) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.filter = 'brightness(1.1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }
          }}
          onTouchEnd={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1)';
            e.target.style.boxShadow = currentPage === 1 ? 'none' : '0 2px 8px rgba(0,0,0,0.2)';
          }}
        >
          Previous
        </button>
        <span style={{
          fontSize: isMobile ? '0.85rem' : '0.9rem',
          color: '#2c3e50',
          fontWeight: 500
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
            borderRadius: '6px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
            boxShadow: currentPage === totalPages ? 'none' : '0 2px 8px rgba(0,0,0,0.2)',
            transform: 'scale(1)',
            filter: 'brightness(1)',
            animation: 'fadeInScale 0.5s ease-out'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.filter = 'brightness(1.1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1)';
            e.target.style.boxShadow = currentPage === totalPages ? 'none' : '0 2px 8px rgba(0,0,0,0.2)';
          }}
          onTouchStart={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.filter = 'brightness(1.1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }
          }}
          onTouchEnd={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1)';
            e.target.style.boxShadow = currentPage === totalPages ? 'none' : '0 2px 8px rgba(0,0,0,0.2)';
          }}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ServicePage;