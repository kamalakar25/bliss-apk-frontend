import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const artists = [
  {
    name: "Sophia Rose",
    experience: 10,
    description: [
      "Specializes in bridal and glam makeup artistry",
      "Creates stunning looks for weddings and special events",
      "Expert in enhancing natural beauty",
      "Known for long-lasting makeup applications",
      "Brings elegance to every client's appearance",
    ],
    image: "https://nikky-bawa.in/wp-content/uploads/2024/04/Bridal-Makeup-Looks.jpg",
  },
  {
    name: "Liam Grace",
    experience: 8,
    description: [
      "Renowned for editorial and avant-garde styles",
      "Creates bold runway looks for fashion shows",
      "Master of innovative makeup techniques",
      "Works with top fashion photographers",
      "Pushes boundaries in creative expression",
    ],
    image: "https://images.herzindagi.info/image/2023/Nov/bridal-makeup-trend.jpg",
  },
  {
    name: "Olivia Belle",
    experience: 6,
    description: [
      "Expert in natural, glowing skin finishes",
      "Perfects looks for photoshoots and portraits",
      "Focuses on subtle enhancement techniques",
      "Creates flawless, camera-ready makeup",
      "Specializes in dewy, radiant appearances",
    ],
    image: "https://www.o3plus.com/cdn/shop/articles/The_Ultimate_Bridal_Glow.png?v=1739108575",
  },
  {
    name: "Noah Sky",
    experience: 7,
    description: [
      "Blends bold colors for unique designs",
      "Creates striking, artistic makeup styles",
      "Known for creative and vibrant looks",
      "Excels in experimental color combinations",
      "Brings personality to every creation",
    ],
    image: "https://media.istockphoto.com/id/1340302535/photo/beautiful-indian-woman-getting-ready-to-a-wedding-reception-at-the-beauty-parlor.jpg?s=612x612&w=0&k=20&c=GzhivtaqLIDXBQ69R0DlIOfwY4aOYUI67gxWKTM3ooA=",
  },
  {
    name: "Ava Luna",
    experience: 12,
    description: [
      "Master of special effects makeup",
      "Creates cinematic and theatrical looks",
      "Skilled in prosthetics and transformations",
      "Works on film and TV productions",
      "Expert in character-driven artistry",
    ],
    image: "https://www.frenchweddingstyle.com/wp-content/uploads/2024/07/theatre-of-real-life-photographer-french-wedding-style-.jpg",
  },
];

const BridalShowcase = () => {
  const [index, setIndex] = useState(0);

  const nextArtist = () => setIndex((prev) => (prev + 1) % artists.length);
  const prevArtist = () => setIndex((prev) => (prev - 1 + artists.length) % artists.length);

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, sm: 6 },
        boxSizing: 'border-box',
        background: '#fff0f6',
        minHeight: '100vh',
      }}
    >
      {/* Makeup Artists Carousel */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          p: { xs: 1, sm: 2 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem' },
            fontWeight: 'bold',
            mb: { xs: 2, sm: 3 },
            color: '#1e293b',
            textAlign: 'center',
            fontFamily: '"Playfair Display", serif',
          }}
        >
          Explore Our Makeup Artists
        </Typography>
        <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100%', sm: '90%', md: '64rem' } }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  bgcolor: '#ffffff',
                  borderRadius: '1rem',
                  boxShadow: { xs: '0 4px 10px rgba(0, 0, 0, 0.1)', sm: '0 10px 15px rgba(0, 0, 0, 0.05)' },
                  overflow: 'hidden',
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', md: '40%' },
                    height: { xs: '200px', sm: '250px', md: '383px' },
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <img
                    src={artists[index].image || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={artists[index].name}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      borderTopLeftRadius: { xs: '1rem', md: '1rem' },
                      borderTopRightRadius: { xs: '1rem', md: 0 },
                      borderBottomLeftRadius: { xs: 0, md: '1rem' },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { xs: '100%', md: '60%' },
                    p: { xs: 2, sm: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundImage: {
                      xs: 'linear-gradient(to bottom, rgba(209, 135, 172, 0.9), rgba(255, 255, 255, 0.9))',
                      md: 'linear-gradient(to bottom, rgb(209, 135, 172), rgb(255, 255, 255))',
                    },
                    borderBottomLeftRadius: { xs: '1rem', md: 0 },
                    borderBottomRightRadius: '1rem',
                    borderTopRightRadius: { xs: 0, md: '1rem' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                      mb: 1,
                      color: '#1e293b',
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {artists[index].name}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#475569',
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      mb: 1.5,
                      fontFamily: '"Lora", serif',
                    }}
                  >
                    Experience: {artists[index].experience} years
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      pl: { xs: 2, sm: 2.5 },
                      color: '#475569',
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      mb: 2,
                      lineHeight: 1.6,
                      fontFamily: '"Lora", serif',
                    }}
                  >
                    {artists[index].description.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>
                        {item}
                      </li>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: 1, sm: 2 },
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={prevArtist}
                      sx={{
                        color: '#1e293b',
                        borderColor: '#1e293b',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        px: { xs: 2, sm: 3 },
                        py: 0.5,
                        textTransform: 'none',
                        fontFamily: '"Lora", serif',
                        '&:hover': {
                          bgcolor: 'rgba(30, 41, 59, 0.05)',
                        },
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      onClick={nextArtist}
                      sx={{
                        bgcolor: '#1e293b',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        px: { xs: 2, sm: 3 },
                        py: 0.5,
                        textTransform: 'none',
                        fontFamily: '"Lora", serif',
                        '&:hover': {
                          bgcolor: '#334155',
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default BridalShowcase;