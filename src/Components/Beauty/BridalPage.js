import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

// Sample images (replace with actual assets)
import hairCutImg from '../Assets/haircut.jpeg';
import bridalImg from '../Assets/bridal.jpg';
import waxingImg from '../Assets/waxing.webp';
import pedicureImg from '../Assets/pedicure.jpg';
import flower3 from '../Assets/flower3.png';
import flower5 from '../Assets/flower5.png';
import bride1 from '../Assets/bride.avif';

const trialSections = [
  {
    title: 'HairCut',
    description:
      'Discover the perfect haircut with our trial session, tailored to enhance your unique style.',
    img: hairCutImg,
    flower: flower3,
    bg: 'linear-gradient(135deg, #e0f7fa, #80deea)',
    info: [
      'Personalized consultation to match your style.',
      'Expert stylists with years of experience.',
      'Variety of cuts: bob, layered, pixie, and more.',
      'High-quality products for lasting results.',
      'Relaxing salon atmosphere for your comfort.',
    ],
  },
  {
    title: 'Bridal',
    description:
      'Experience a trial makeup session to find the ideal bridal look for your special day.',
    img: bride1,
    flower: flower5,
    bg: 'linear-gradient(135deg, #f8cdd0, #fce4ec)',
    info: [
      'Customized makeup to enhance natural beauty.',
      'Trial session to perfect your bridal look.',
      'Skilled artists specializing in bridal styling.',
      'Long-lasting products for all-day wear.',
      'Includes hair and makeup coordination.',
    ],
  },
  {
    title: 'Waxing',
    description:
      'Try our waxing services to achieve smooth, radiant skin with a personalized approach.',
    img: waxingImg,
    flower: flower3,
    bg: 'linear-gradient(135deg, #f0f4c3, #dce775)',
    info: [
      'Gentle waxing for sensitive skin types.',
      'Professional techniques for minimal discomfort.',
      'Options for arms, legs, and full-body waxing.',
      'Hygienic practices with premium products.',
      'Smooth results lasting up to weeks.',
    ],
  },
  {
    title: 'Pedicure',
    description:
      'Relax with a trial pedicure session to pamper your feet and find your perfect treatment.',
    img: pedicureImg,
    flower: flower5,
    bg: 'linear-gradient(135deg, #bbdefb, #90caf9)',
    info: [
      'Soothing foot soak and exfoliation.',
      'Choose from spa or gel pedicure styles.',
      'Nail shaping and cuticle care included.',
      'Relaxing massage for ultimate comfort.',
      'Vibrant polish options for a polished look.',
    ],
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate('/products', { state: { designation: 'Beauty_Parler', service } });
  };

  return (
    <Box
      sx={{
        overflowY: 'auto',
        px: 2,
        py: 6,
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, #fff5f7, #e0f7fa)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Playfair Display, serif',
          color: '#c2185b',
          textAlign: 'center',
          mb: 6,
        }}
      >
        Our Beauty Services
      </Typography>

      {/* Trial Sections */}
      {trialSections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Box
            sx={{
              background: section.bg,
              borderRadius: '40px',
              p: { xs: 3, md: 6 },
              mx: 'auto',
              mt: 5,
              maxWidth: '1200px',
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box
              component="img"
              src={section.flower}
              alt="floral"
              sx={{ position: 'absolute', top: -60, left: -60, width: 240, zIndex: 0 }}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              style={{ zIndex: 1, flex: 1 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#8B0000',
                  fontWeight: 'bold',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '18px',
                  color: '#4e4e4e',
                  mb: 3,
                }}
              >
                {section.description}
              </Typography>
              <Box sx={{ mb: 3 }}>
                {section.info.map((line, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '16px',
                      color: '#4e4e4e',
                      lineHeight: 1.5,
                    }}
                  >
                    • {line}
                  </Typography>
                ))}
              </Box>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => handleServiceClick(section.title)}
                sx={{
                  borderRadius: '50px',
                  border: '2px solid #b71c1c',
                  color: '#b71c1c',
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#b71c1c', color: '#fff' },
                }}
              >
                Book Now
              </Button>
            </motion.div>

            <Box
              sx={{
                position: 'relative',
                width: { xs: '80%', md: '40%' },
                maxWidth: '320px',
                aspectRatio: '3 / 4',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  width: '100%',
                  height: '100%',
                  transform: 'rotate(-6deg)',
                  backgroundColor: '#37474f',
                  borderRadius: '8px',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  width: '100%',
                  height: '100%',
                  transform: 'rotate(3deg)',
                  backgroundColor: '#ffccbc',
                  borderRadius: '8px',
                  zIndex: 1,
                }}
              />
              <motion.img
                src={section.img}
                alt={section.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  position: 'relative',
                  zIndex: 2,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}