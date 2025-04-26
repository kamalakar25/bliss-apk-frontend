import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added import
import { Box, Typography, useMediaQuery } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import bannerImage from '../Assets/beauty1.png';
import BeforeMakeup from '../Assets/before.jpg';
import AfterMakeup from '../Assets/after.jpg';
import { Fab } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const BannerSplitHover = () => {
  const navigate = useNavigate(); // Added navigate hook
  const [hovered, setHovered] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const isMobile = useMediaQuery('(max-width:720px)');
  const isTablet = useMediaQuery('(min-width:320px) and (max-width:1024px)');
  const leftControls = useAnimation();
  const rightControls = useAnimation();

  useEffect(() => {
    if (isMobile) {
      leftControls.set({ x: '0%' });
      rightControls.set({ x: '0%' });
    } else {
      leftControls.set({ x: '-100%' });
      rightControls.set({ x: '100%' });

      const timer = setTimeout(() => {
        leftControls.start({
          x: '0%',
          transition: { duration: 1.6, ease: 'easeInOut' },
        });
        rightControls.start({
          x: '0%',
          transition: { duration: 1.6, ease: 'easeInOut' },
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMobile, leftControls, rightControls]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    setHovered(true);
    leftControls.start({ x: '-100%', transition: { duration: 1.6, ease: 'easeInOut' } });
    rightControls.start({ x: '100%', transition: { duration: 1.6, ease: 'easeInOut' } });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHovered(false);
    leftControls.start({ x: '0%', transition: { duration: 1.6, ease: 'easeInOut' } });
    rightControls.start({ x: '0%', transition: { duration: 1.6, ease: 'easeInOut' } });
  };

  const handleClick = () => {
    if (!isTablet) return;
    const isOpen = hovered;
    setHovered(!isOpen);
    leftControls.start({
      x: isOpen ? '0%' : '-100%',
      transition: { duration: 1.6, ease: 'easeInOut' },
    });
    rightControls.start({
      x: isOpen ? '0%' : '100%',
      transition: { duration: 1.6, ease: 'easeInOut' },
    });
  };

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  const handleServiceClick = (service) => {
    navigate(`/Services?Service=${encodeURIComponent(service)}`);
  };

  return (
    <Box sx={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 200, sm: 260, md: 320, lg: 400, xl: 480 },
          width: '100%',
          mt: { xs: 2, sm: 3 },
          mx: 'auto',
        }}
      >
        {/* Text Content */}
        <Box
          sx={{
            position: 'absolute',
            zIndex: 3,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              zIndex: 5,
              fontWeight: 'bold',
              color: '#414911',
              textShadow: '1px 1px 5px rgba(15, 15, 15, 0.4)',
              fontSize: {
                xs: '1.2rem',
                sm: '1.6rem',
                md: '2.2rem',
                lg: '2.8rem',
                xl: '3.2rem',
              },
            }}
          >
            Bliss Beauty Spa
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              color: 'tomato',
              textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
              fontSize: {
                xs: '0.75rem',
                sm: '0.9rem',
                md: '1.1rem',
                lg: '1.2rem',
              },
            }}
          >
            Where self-care meets elegance
          </Typography>
        </Box>

        {/* Split Image Animation */}
        <motion.div
          // animate={{ rotate: 0, opacity: 1 }}
          // transition={{ duration: 1.2, ease: 'easeOut' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            cursor: isTablet ? 'pointer' : 'default',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
              borderRadius: { xs: 1.5, sm: 2, md: 3 },
              overflow: 'hidden',
              boxShadow: 6,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #FFF3E0, #FFD180)',
                zIndex: 0,
              }}
            />

            <motion.div
              animate={leftControls}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left center',
                backgroundRepeat: 'no-repeat',
                zIndex: 5,
              }}
            />

            <motion.div
              animate={rightControls}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
                zIndex: 5,
              }}
            />
          </Box>
        </motion.div>
      </Box>

      {/* Before and After Comparison Section */}
      <motion.div
        // initial={{ opacity: 0, y: 50 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 1.2, ease: 'easeOut', delay: 1.8 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Playfair Display, serif',
            color: '#c2185b',
            textAlign: 'center',
            mb: 6,
            mt: 3,
          }}
        >
          Before And After Comparison
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '90%',
            maxWidth: '800px',
            margin: '0 auto 40px',
            p: { xs: 2, sm: 4 },
            border: '6px solid #f5f5f5',
            borderRadius: '20px',
            backgroundImage: 'linear-gradient(to bottom,rgb(219, 189, 125),rgb(223, 217, 206))',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            },
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', borderRadius: '12px', aspectRatio: '16/9' }}>
            <img
              src={AfterMakeup}
              alt="After Makeup"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: '12px',
              }}
            />

            <img
              src={BeforeMakeup}
              alt="Before Makeup"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                transition: 'clip-path 0.2s ease-out',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: '12px',
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPosition}%`,
                width: '3px',
                backgroundColor: 'white',
                transform: 'translateX(-50%)',
                zIndex: 2,
                transition: 'left 0.2s ease-out',
                pointerEvents: 'none',
              }}
            />

            {/* Labels */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '15px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 4,
                backdropFilter: 'blur(4px)',
              }}
            >
              Before
            </div>
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 4,
                backdropFilter: 'blur(4px)',
              }}
            >
              After
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                zIndex: 3,
                cursor: 'ew-resize',
              }}
            />
          </Box>
        </Box>
        <Fab
                color="secondary"
                variant="extended"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 60,
                    zIndex: 1000,
                    px: 3,
                }}
                onClick={() => navigate('/products', { state: { designation: 'Beauty_Parler' } })}
            >
                <BookOnlineIcon sx={{ mr: 1 }} />
                Book Now
            </Fab>
      </motion.div>
    </Box>
  );
};

export default BannerSplitHover;