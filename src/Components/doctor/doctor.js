import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Fade, Grow, Slide, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import images with fallback
import DermatologyBanner from '../Assets/dermatology-banner.jpg';
import DermatologyBanner1 from '../Assets/banner.jpg';

// Fallback image
const fallbackImage = 'https://via.placeholder.com/1200x600?text=Fallback+Image';

// Slider content array (image + text)
const sliderContent = [
  {
    image: DermatologyBanner,
    title: "Skin Care",
    description: "Professional skin care treatments for all skin types"
  },
  {
    image: DermatologyBanner1,
    title: "Hair Transplantation",
    description: "Advanced hair restoration techniques for natural results"
  }
];

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: { xs: 8, sm: 16 },
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      color: '#ff69b4',
      '&:hover': {
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        color: '#ff85c1',
      },
      p: 1,
      transition: 'background-color 0.3s, color 0.3s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}
    aria-label="Previous slide"
  >
    <ArrowBackIosIcon />
  </IconButton>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: { xs: 8, sm: 16 },
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      color: '#ff69b4',
      '&:hover': {
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        color: '#ff85c1',
      },
      p: 1,
      transition: 'background-color 0.3s, color 0.3s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}
    aria-label="Next slide"
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

// Book Now Button Component
const BookNowButton = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  return (
    <Zoom
      in={true}
      timeout={1500}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 20, sm: 55 },
          right: { xs: 12, sm: 24 },
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          size={isMobile ? 'small' : 'medium'}
          sx={{
            bgcolor: '#ff1493',
            color: '#fff',
            fontSize: {
              xs: '0.7rem',
              sm: '0.85rem',
              md: '0.9rem',
              lg: '0.95rem',
            },
            px: { xs: 2, sm: 2.5, md: 3 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: '25px',
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '0.5px',
            boxShadow: '0 4px 15px rgba(255, 20, 147, 0.3)',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
            minWidth: 'auto',
            '&:hover': {
              bgcolor: '#ff40a7',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(255, 20, 147, 0.5)',
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: '0.4s',
            },
            '&:hover:before': {
              left: '100%',
            },
          }}
          onClick={() => navigate('/products', { state: { designation: 'Doctor' } })}
        >
          Book Now
        </Button>
      </Box>
    </Zoom>
  );
};

const Doctor = () => {
  const [validContent, setValidContent] = useState([{ image: fallbackImage, title: "Service", description: "" }]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const isLargeScreen = useMediaQuery('(min-width:1800px)');

  useEffect(() => {
    const loadImages = async () => {
      const loadedContent = [];
      for (const content of sliderContent) {
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = content.image;
            img.onload = () => resolve(content);
            img.onerror = () => reject(new Error(`Failed to load ${content.image}`));
          });
          loadedContent.push(content);
        } catch (error) {
          console.error(error.message);
          loadedContent.push({
            ...content,
            image: fallbackImage
          });
        }
      }
      setValidContent(loadedContent.length > 0 ? loadedContent : [{ image: fallbackImage, title: "Service", description: "" }]);
    };
    loadImages();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? validContent.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === validContent.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle scroll to OurServices section
  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate dynamic height based on screen size
  const getSliderHeight = () => {
    if (isMobile) return '50vh'; // Mobile devices
    if (isTablet) return '60vh'; // Tablets
    if (isLargeScreen) return '80vh'; // Large screens
    return '70vh'; // Default for desktop
  };

   const navigate = useNavigate();
  
    const handleServiceClick = (service) => {
      navigate('/products', { state: { designation: 'Doctor', service } });
    };
  

  return (
    <div id="home">
      <Fade in={true} timeout={2000}>
        <Box
          sx={{
            position: 'relative',
            height: getSliderHeight(),
            width: '100vw',
            maxWidth: '100%',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {validContent.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                bgcolor: 'grey.900',
              }}
            >
              {/* Navigation Arrows */}
              <PrevArrow onClick={handlePrev} />
              <NextArrow onClick={handleNext} />

              {/* Slides */}
              {validContent.map((content, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: activeIndex === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={content.image}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                      position: 'absolute',
                    }}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0, 0, 0, 0.3)',
                    }}
                  />
                  {/* Text Content */}
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      textAlign: 'center',
                      px: 2,
                      maxWidth: '800px',
                      mb: 4
                    }}
                  >
                    <Typography
                      variant={isMobile ? 'h5' : 'h2'}
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: '#ffffff',
                        fontSize: {
                          xs: '1.25rem',
                          sm: '2rem',
                          md: '2.55rem',
                          lg: '3.25rem'
                        },
                        lineHeight: 1.2,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        '&::after': {
                          content: '""',
                          display: 'block',
                          width: '80px',
                          height: '4px',
                          background: '#ff69b4',
                          margin: '12px auto',
                          borderRadius: '2px'
                        }
                      }}
                    >
                      {content.title}
                    </Typography>
                    <Typography
                      variant={isMobile ? 'body1' : 'h6'}
                      component="p"
                      sx={{
                        mb: 3,
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: {
                          xs: '0.75rem',
                          sm: '1rem',
                          md: '1.2rem',
                          lg: '1.3rem'
                        },
                        lineHeight: 1.6,
                        fontWeight: 400,
                        maxWidth: '90%',
                        mx: 'auto',
                        fontStyle: 'italic',
                        px: 2,
                        textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                      }}
                    >
                      {content.description}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Dots */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                  zIndex: 2,
                }}
              >
                {validContent.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: activeIndex === index ? '#ff69b4' : 'grey.500',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        bgcolor: activeIndex === index ? '#ff85c1' : 'grey.400',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Explore Button */}
          <Grow
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
            style={{ transformOrigin: 'center center' }}
          >
            <Slide
              in={true}
              direction="up"
              timeout={1000}
              mountOnEnter
              unmountOnExit
            >
              <Box sx={{
                width: 'auto',
                zIndex: 3,
                position: 'relative',
                px: 2,
                textAlign: 'center'
              }}>
                <Button
                  variant="contained"
                  size={isMobile ? 'medium' : 'large'}
                  onClick={() => handleServiceClick()}
                  sx={{
                    bgcolor: '#ff69b4',
                    color: '#fff',
                    fontSize: {
                      xs: '0.75rem',
                      sm: '0.9rem',
                      md: '1rem',
                      lg: '1.1rem',
                      xl: '1.2rem'
                    },
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 1, sm: 1.25, md: 1.5 },
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#ff85c1',
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                    },
                    transition:
                      'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    borderRadius: 1,
                    mt: 22,
                    whiteSpace: 'nowrap',
                    minWidth: 'max-content'
                  }}
                >
                  Explore Services
                </Button>
              </Box>
            </Slide>
          </Grow>

          {/* Book Now Button */}
          <BookNowButton />
        </Box>
      </Fade>
    </div>
  );
};

export default Doctor;