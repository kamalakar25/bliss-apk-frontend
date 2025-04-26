import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const services = [
  {
    title: 'Hair Treatment',
    description:
      'Specialized care for hair loss, dandruff, and scalp issues. Treatments include PRP, laser therapy, and regrowth plans.',
    image:
      'https://img.freepik.com/premium-photo/hair-treatment-procedure-with-professional-applying-serum_37732-6171.jpg?w=360',
    color: '#1D4ED8',
    bgColor: '#E0ECFF',
  },
  {
    title: 'Skin Treatment',
    description:
      'Advanced solutions for acne, pigmentation, and anti-aging. Services include chemical peels, laser, and rejuvenation.',
    image: 'https://img1.wsimg.com/isteam/stock/gYlVpPP',
    color: '#DB2777',
    bgColor: '#FFE3F1',
  },
];

const OurServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate('/products', { state: { designation: 'Doctor', service } });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(255, 242, 242) 0%,rgb(255, 244, 250) 100%)',
        px: { xs: 2, sm: 4 },
        py: { xs: 6, sm: 10 },
      }}
    >
      {/* Title with logo */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={8}
        flexWrap="wrap"
        gap={0.1}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
            background: 'linear-gradient(90deg, #1D4ED8, #DB2777)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            display: 'inline-block',
          }}
        >
          Our Services
        </Typography>

        <Box
          component="img"
          // src="https://png.pngtree.com/png-clipart/20230701/original/pngtree-salon-logo-vector-png-image_9244475.png"
          // alt="Salon Logo"
          sx={{
            height: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
            width: 'auto',
            ml: 1,
          }}
        />
      </Box>

      {/* Services grid */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {services.map((service, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              elevation={8}
              sx={{
                width: '100%',
                maxWidth: 420,
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: service.bgColor,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 12,
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={service.image}
                alt={service.title}
                loading="lazy"
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: service.color,
                    mb: 1.5,
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#374151', mb: 3, fontSize: '0.95rem' }}
                >
                  {service.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleServiceClick(service.title)}
                  sx={{
                    backgroundColor: service.color,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: service.color,
                      opacity: 0.9,
                    },
                    borderRadius: 3,
                    px: 4,
                    py: 1.2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`View more about ${service.title}`}
                  title={`View more about ${service.title}`}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurServices;