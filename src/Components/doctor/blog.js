import React from 'react';
import {
  Container, Card, CardMedia, CardContent, Typography,
  Box, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Modern Heading with Blue-to-Pink Gradient
const ModernHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3rem',
  letterSpacing: '1.5px',
  background: 'linear-gradient(90deg, #ff6f91 0%, #6a11cb 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textTransform: 'uppercase',
  padding: '0.8rem 2rem',
  borderRadius: '15px',
  display: 'inline-block',
  background: 'linear-gradient(135deg, #2196F3 0%, #F06292 100%)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    padding: '0.6rem 1.5rem',
  },
}));

// Blog data with 4 points per post
const blogPosts = [
  {
    id: 1,
    title: 'Top Hair Care Tips by Experts',
    category: 'Hair Care',
    points: [
      'Trim regularly to prevent split ends',
      'Use deep conditioning weekly',
      'Massage scalp for better circulation',
      'Limit heat styling to protect hair'
    ],
    image: 'https://img.freepik.com/free-photo/woman-doing-herself-scalp-massage_23-2151228494.jpg',
  },
  {
    id: 2,
    title: 'Dermatologist-Approved Skincare Routine',
    category: 'Skincare',
    points: [
      'Cleanse gently twice daily',
      'Moisturize to lock in hydration',
      'Apply sunscreen every morning',
      'Use serums at night for repair'
    ],
    image: 'https://img.freepik.com/free-photo/front-view-woman-applying-face-cream_23-2148708051.jpg',
  },
  {
    id: 3,
    title: 'Top Natural Oils for Healthy Skin',
    category: 'Skincare',
    points: [
      'Jojoba oil balances skin',
      'Argan oil hydrates deeply',
      'Rosehip oil reduces scars',
      'Coconut oil soothes irritation'
    ],
    image: 'https://img.freepik.com/free-photo/spa-composition-with-natural-oils_23-2148578912.jpg',
  },
  {
    id: 4,
    title: 'Best Anti-Aging Skincare Products',
    category: 'Skincare',
    points: [
      'Retinol boosts cell turnover',
      'Vitamin C brightens skin',
      'Hyaluronic acid plumps skin',
      'Peptides firm and tighten'
    ],
    image: 'https://img.freepik.com/free-photo/top-view-gua-sha-face-products_23-2149401501.jpg',
  },
  {
    id: 5,
    title: 'Hair Transplant: What to Expect',
    category: 'Hair Treatment',
    points: [
      'Consult with a specialist',
      'Prepare for minor surgery',
      'Recover in 7–10 days',
      'See results in 6–12 months'
    ],
    image: 'https://img.freepik.com/free-photo/man-getting-hair-loss-treatment_23-2149152760.jpg',
  },
  {
    id: 6,
    title: 'Foods That Boost Hair and Skin Health',
    category: 'Nutrition',
    points: [
      'Eat fatty fish for omega-3s',
      'Add nuts for vitamin E',
      'Include greens for antioxidants',
      'Avocados support skin hydration'
    ],
    image: 'https://img.freepik.com/free-photo/flat-lay-delicious-food-arrangement_23-2149235837.jpg',
  }
];

// Single card style for uniformity
const cardStyle = {
  sx: {
    borderRadius: '25px',
    background: 'linear-gradient(135deg, #e6f0ff 0%, #f0e6ff 100%)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), inset 0 0 10px rgba(255, 255, 255, 0.3)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
    },
    transition: 'all 0.4s ease',
    width: '100%',
    maxWidth: 400,
    minHeight: 450,
    display: 'flex',
    flexDirection: 'column',
  },
  imageSx: {
    height: 220,
    borderRadius: '25px',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    '&:hover': { transform: 'scale(1.1)' },
  },
  contentSx: {
    flexGrow: 1,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 200,
    textAlign: 'center', // Center all content
  }
};

// Blog Cards component
const BlogCardsWithDropdown = () => {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, rgb(255, 242, 242) 0%, rgb(255, 244, 250) 100%)',
      py: 8,
      minHeight: '100vh'
    }}>
      <Container sx={{ py: 4 }}>
        {/* Animated Modern Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
            <ModernHeading variant="h4" align="center">
              Hair & Skincare Blog
            </ModernHeading>
          </Box>
        </motion.div>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, 
          gap: 4
        }}>
          <AnimatePresence>
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    ...cardStyle.sx,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={cardStyle.imageSx}
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={cardStyle.contentSx}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Chip 
                        label={post.category} 
                        size="small" 
                        sx={{ 
                          background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)',
                          color: '#fff',
                          fontWeight: 600,
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 2, 
                        background: 'linear-gradient(45deg, #333 30%, #666 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        minHeight: 60,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'center',
                      }}
                    >
                      {post.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.1) }}
                          sx={{
                            mb: 1,
                            fontSize: { xs: '0.85rem', sm: '0.95rem' },
                            fontWeight: 500,
                            color: 'text.primary',
                            '&::before': {
                              content: '"• "',
                              color: 'text.secondary',
                            },
                          }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogCardsWithDropdown;