import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { Button, Fab } from '@mui/material';
import { Box, Card, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Salon1 from "../Assets/salon1.jpg";
import Salon2 from "../Assets/salon2.jpg";
import Salon3 from "../Assets/salon3.webp";
import haircut from "../Assets/salon4.jpg";
import facial from "../Assets/salon5.png";
import haircolor from "../Assets/salon6.jpg";
import shaving from "../Assets/salon7.png";
import ourwork from "../Assets/salon8.webp";
import ourwork2 from "../Assets/salon9.jpg";
import ourwork3 from "../Assets/salon10.jpg";
import ourwork4 from "../Assets/salon11.jpg";
import ourwork5 from "../Assets/salon12.jpg";
import About from "../Assets/salon13.jpg";
// New imports for additional services

import pedicure from "../Assets/pedicure.jpg";


const SalonPage = () => {
    const carouselRef = useRef(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const SalonCards = [
        { id: 1, title: "HairCut", img: haircut }, 
        { id: 2, title: "Facial", img: facial },
        { id: 3, title: "HairColor", img: haircolor },
        { id: 4, title: "Shaving", img: shaving },
    ];



    const images = [ourwork, ourwork2, ourwork3, ourwork4, ourwork5];

    const gradientBackground = {
        background: 'linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%)',
        padding: '40px 0',
    };

    const sx = {
        container: { maxWidth: '2560px', margin: '0 auto', fontFamily: 'Arial, sans-serif', overflowX: 'hidden' },
        carouselContainer: { width: '100%', marginBottom: '0' },
        carouselImage: { 
            width: '100%', 
            height: isMobile ? '300px' : '500px', 
            objectFit: 'cover' 
        },
        cardsSection: { 
            padding: isMobile ? '20px' : '40px',
            ...gradientBackground
        },
        servicesCarousel: { maxWidth: '1200px', margin: '0 auto' },
        card: {
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            height: isMobile ? '250px' : '300px',
            transition: 'transform 0.3s ease',
            marginBottom: isMobile ? '20px' : '0',
            '&:hover': {
                transform: 'scale(1.05)',
            },
        },
        cardImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'scale(1.1)',
            },
        },
        overlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '10px 0',
            textAlign: 'center',
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: '500',
            transition: 'opacity 0.3s ease',
            '&:hover': {
                opacity: 0,
            },
        },
        title: { 
            fontSize: isMobile ? '28px' : '36px', 
            marginBottom: '30px', 
            color: '#333', 
            textAlign: 'center',
            fontWeight: 'bold'
        },
        aboutSection: { 
            padding: isMobile ? '30px' : '60px', 
            backgroundColor: 'white',
            background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%, #ffffff 100%)'
        },
        workContent: { 
            maxWidth: '1200px', 
            margin: '0 auto', 
            textAlign: 'center',
            ...gradientBackground
        },
        mobileIndicator: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
            gap: '8px'
        },
        indicatorDot: {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#ccc',
            cursor: 'pointer'
        },
        activeDot: {
            backgroundColor: '#333'
        },
    };

    const handleServiceClick = (service) => {
        navigate('/products', { state: { designation: 'Salon', service: service } });
    };

    const handlePrev = () => {
        setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: activeIndex * (window.innerWidth * 0.8),
                behavior: 'smooth'
            });
        }
    }, [activeIndex]);

    return (
        <div style={sx.container}>
            <style>
                {`@keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }`}
            </style>

            {/* Hero Carousel */}
            <div style={sx.carouselContainer}>
                {isMobile ? (
                    <div style={{ position: 'relative' }}>
                        <Carousel
                            showThumbs={false}
                            autoPlay
                            infiniteLoop
                            showStatus={false}
                            showArrows={true}
                            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                hasPrev && (
                                    <button
                                        type="button"
                                        onClick={onClickHandler}
                                        title={label}
                                        style={{
                                            position: 'absolute',
                                            zIndex: 2,
                                            left: 15,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ArrowBackIosIcon fontSize="small" />
                                    </button>
                                )
                            }
                            renderArrowNext={(onClickHandler, hasNext, label) =>
                                hasNext && (
                                    <button
                                        type="button"
                                        onClick={onClickHandler}
                                        title={label}
                                        style={{
                                            position: 'absolute',
                                            zIndex: 2,
                                            right: 15,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </button>
                                )
                            }
                            selectedItem={activeIndex}
                            onChange={setActiveIndex}
                        >
                            <div><img src={Salon1} style={sx.carouselImage} alt="Salon 1" /></div>
                            <div><img src={Salon2} style={sx.carouselImage} alt="Salon 2" /></div>
                            <div><img src={Salon3} style={sx.carouselImage} alt="Salon 3" /></div>
                        </Carousel>
                        <div style={sx.mobileIndicator}>
                            {[0, 1, 2].map((index) => (
                                <div 
                                    key={index}
                                    style={{
                                        ...sx.indicatorDot,
                                        ...(activeIndex === index ? sx.activeDot : {})
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Carousel
                        showThumbs={false}
                        autoPlay
                        infiniteLoop
                        showStatus={false}
                    >
                        <div><img src={Salon1} style={sx.carouselImage} alt="Salon 1" /></div>
                        <div><img src={Salon2} style={sx.carouselImage} alt="Salon 2" /></div>
                        <div><img src={Salon3} style={sx.carouselImage} alt="Salon 3" /></div>
                    </Carousel>
                )}
            </div>

            {/* Services Section */}
            <motion.section 
                style={sx.cardsSection}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <motion.h2 style={sx.title}>Our Services</motion.h2>
                <div style={sx.servicesCarousel}>
                    <div className="row">
                        {SalonCards.map((card, i) => (
                            <motion.div 
                                key={card.id} 
                                className={isMobile ? "col-6" : "col-sm-6 col-md-4 col-lg-3 mb-4"}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                            >
                                <motion.div
                                    style={sx.card}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleServiceClick(card.title)}
                                >
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        style={sx.cardImage}
                                    />
                                    <div style={sx.overlay}>{card.title}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* About Us Section */}
            <section style={sx.aboutSection}>
                <div style={sx.aboutContent}>
                    <h2 style={sx.title}>About Us</h2>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "50px",
                            flexDirection: isMobile ? "column" : "row",
                        }}
                    >
                        {!isMobile && (
                            <Box sx={{ flex: 1, padding: "20px" }}>
                                <Typography sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, lineHeight: "1.6", marginTop: "10px" }}>
                                    Welcome to Salon, your haven of beauty and relaxation. Located in the heart of your city, we're passionate about helping you shine. Our expert stylists and beauty professionals offer personalized services, from stunning haircuts and bold colors to soothing spa treatments and intricate nail art. At our Salon, every visit is crafted to make you feel special, using premium products and cutting-edge techniques. Our mission is simple: to enhance your natural beauty while providing a warm, inviting experience. Step in for a quick refresh or a full transformation—leave feeling confident and radiant.
                                </Typography>
                            </Box>
                        )}
                        <Box sx={{ flex: 1, textAlign: "center", mb: isMobile ? 2 : 0 }}>
                            <motion.img
                                src={About}
                                alt="Salon"
                                style={{
                                    width: "100%",
                                    maxWidth: "450px",
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </Box>
                        {isMobile && (
                            <Box sx={{ flex: 1, padding: "20px" }}>
                                <Typography sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, lineHeight: "1.6", marginTop: "10px" }}>
                                    Welcome to Salon, your haven of beauty and relaxation. Our expert stylists offer personalized services using premium products and cutting-edge techniques to enhance your natural beauty.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </div>
            </section>

            {/* Our Work Section */}
            <section style={gradientBackground}>
                <div style={sx.workContent}>
                    <h2 style={sx.title}>See Our Work</h2>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: { xs: '100%', md: '1200px' },
                            margin: '0 auto',
                            padding: { xs: '0 10px', md: '0 20px' },
                        }}
                    >
                        <Box
                            ref={carouselRef}
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                scrollSnapType: 'x mandatory',
                                gap: { xs: 2, md: 4 },
                                padding: { xs: '10px 0', md: '20px 0' },
                                scrollBehavior: 'smooth',
                                WebkitOverflowScrolling: 'touch',
                                '&::-webkit-scrollbar': { display: 'none' },
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            {images.map((img, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        sx={{
                                            flex: '0 0 auto',
                                            width: isMobile ? '80vw' : '30vw',
                                            maxWidth: '350px',
                                            height: isMobile ? '40vh' : '60vh',
                                            maxHeight: '450px',
                                            scrollSnapAlign: 'center',
                                            borderRadius: 4,
                                            boxShadow: 3,
                                            overflow: 'hidden',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': { transform: 'scale(1.05)' },
                                            margin: '0 5px'
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={img}
                                            alt={`Work ${index + 1}`}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Card>
                                </motion.div>
                            ))}
                        </Box>

                        <>
                            <Button
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '10px',
                                    transform: 'translateY(-50%)',
                                    minWidth: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #2196F3 0%, #F06292 100%)',
                                    color: 'white',
                                    '&:hover': { 
                                        background: 'linear-gradient(135deg, #1976D2 0%, #D81B60 100%)'
                                    },
                                }}
                            >
                                <ArrowBackIosIcon fontSize="small" />
                            </Button>
                            <Button
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    minWidth: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #2196F3 0%, #F06292 100%)',
                                    color: 'white',
                                    '&:hover': { 
                                        background: 'linear-gradient(135deg, #1976D2 0%, #D81B60 100%)'
                                    },
                                }}
                            >
                                <ArrowForwardIosIcon fontSize="small" />
                            </Button>
                        </>
                    </Box>
                </div>
            </section>

            {/* More Salon Services Section */}
            {/* <motion.section 
                style={{
                    padding: isMobile ? '30px 20px' : '60px',
                    background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
                }}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <motion.h2 style={sx.title}>More Salon Services</motion.h2>
                <div style={sx.servicesCarousel}>
                    <div className="row">
                        {MoreSalonCards.map((card, i) => (
                            <motion.div 
                                key={card.id} 
                                className={isMobile ? "col-6" : "col-sm-6 col-md-4 col-lg-3 mb-4"}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                            >
                                <motion.div
                                    style={sx.card}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleServiceClick(card.title)}
                                >
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        style={sx.cardImage}
                                    />
                                    <div style={sx.overlay}>{card.title}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section> */}

            {/* Book Now Floating Button */}
            <Fab
                color="secondary"
                variant="extended"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: isMobile ? 20 : 60,
                    zIndex: 1000,
                    px: 3,
                }}
                onClick={() => navigate('/products', { state: { designation: 'Salon' } })}
            >
                <BookOnlineIcon sx={{ mr: 1 }} />
                Book Now
            </Fab>
        </div>
    );
};

export default SalonPage;