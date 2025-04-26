import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Alert,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Payment, // For Cards
  AccountBalance, // For Net Banking
  AccountBalanceWallet, // For Wallets
  CreditCard, // For EMI
  QrCode, // For UPI
} from "@mui/icons-material"; // Import Material-UI icons

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    parlor,
    totalAmount,
    service,
    relatedServices,
    name,
    date,
    time,
    favoriteEmployee,
  } = location.state || {};

  const [paymentAmountOption, setPaymentAmountOption] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [animatedAmount, setAnimatedAmount] = useState(0);

  useEffect(() => {
    if (
      !totalAmount ||
      !name ||
      !service ||
      !date ||
      !time ||
      !favoriteEmployee
    ) {
      setError(
        "Missing booking details. Please start the booking process again."
      );
      setTimeout(() => navigate("/bookslot"), 3000);
    }
  }, [totalAmount, name, service, date, time, favoriteEmployee, navigate]);

  useEffect(() => {
    if (paymentAmountOption) {
      const targetAmount = calculatePaymentAmount();
      let start = 0;
      const duration = 1000; // 1 second animation
      const increment = targetAmount / (duration / 16); // 60fps
      const animate = () => {
        start += increment;
        if (start >= targetAmount) {
          setAnimatedAmount(targetAmount);
          return;
        }
        setAnimatedAmount(start);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    } else {
      setAnimatedAmount(0);
    }
  }, [paymentAmountOption, totalAmount]);

  const handlePaymentAmountChange = (e) => {
    setPaymentAmountOption(e.target.value);
    setError("");
  };

  const calculatePaymentAmount = () => {
    if (!totalAmount) return 0;
    return paymentAmountOption === "25%" ? totalAmount * 0.25 : totalAmount;
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    if (!paymentAmountOption) {
      setError("Please select a payment amount (25% or Full).");
      setIsProcessing(false);
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      setError("Invalid total amount. Please try again.");
      setIsProcessing(false);
      return;
    }

    if (!window.Razorpay) {
      setError("Razorpay SDK not loaded. Please refresh the page.");
      setIsProcessing(false);
      return;
    }

    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        setError("User email not found. Please log in again.");
        setIsProcessing(false);
        return;
      }

      const bookingData = {
        parlorEmail: parlor.email,
        parlorName: parlor.name,
        name,
        date,
        time,
        service,
        amount: calculatePaymentAmount(),
        total_amount: totalAmount,
        relatedServices,
        favoriteEmployee,
        userEmail,
      };

      console.log("Sending booking data to /order:", bookingData);
      const response = await axios.post(
        "http://localhost:5000/api/razorpay/order",
        bookingData
      );
      const { order, bookingId } = response.data;

      console.log("Received response from /order:", { order, bookingId });

      if (!order || !bookingId) {
        throw new Error("Failed to create order or booking");
      }

      const options = {
        key: "rzp_test_MXI4WZ4saBJ7Jb",
        amount: order.amount,
        currency: order.currency,
        name: "Parlor Booking",
        description: `Payment for booking ${bookingId}`,
        order_id: order.id,
        handler: async function (response) {
          console.log("Razorpay payment response:", response);
          let pin = Math.floor(Math.random() * 90000) + 10000;
          try {
            const validationResponse = await axios.post(
              "http://localhost:5000/api/razorpay/order/validate",
              {
                pin,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userEmail,
                bookingId,
              }
            );
            console.log("Payment validated:", validationResponse.data);
            navigate(
              `/payment/callback?order_id=${response.razorpay_order_id}`,
              {
                state: {
                  ...location.state,
                  bookingId,
                  paymentStatus: "PAID",
                  transactionId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  currency: order.currency,
                  amount: bookingData.amount,
                  total_amount: bookingData.total_amount,
                  Payment_Mode:
                    validationResponse.data.paymentMethod || "UNKNOWN",
                  createdAt: new Date().toISOString(),
                },
              }
            );
          } catch (err) {
            console.error(
              "Payment validation error:",
              err.response?.data || err
            );
            setError(
              `Payment verification failed: ${
                err.response?.data?.error || err.message
              }`
            );
            navigate(
              `/payment/callback?order_id=${response.razorpay_order_id}`,
              {
                state: {
                  ...location.state,
                  bookingId,
                  paymentStatus: "FAILED",
                  transactionId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  failureReason:
                    err.response?.data?.reason || "Validation failed",
                  currency: order.currency,
                  amount: bookingData.amount,
                  total_amount: bookingData.total_amount,
                  Payment_Mode: "UNKNOWN",
                  createdAt: new Date().toISOString(),
                },
              }
            );
          }
        },
        prefill: {
          name,
          email: userEmail,
          contact: "9234567890",
        },
        notes: { bookingId, userEmail },
        theme: { color: "#0288d1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", async function (response) {
        console.error("Razorpay payment failed:", response.error);
        const failureReason = response.error.description || "Payment failed";
        setError(`Payment failed: ${failureReason}`);
        try {
          const errorResponse = await axios.post(
            "http://localhost:5000/api/razorpay/order/validate",
            {
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id,
              razorpay_signature: "",
              userEmail,
              bookingId,
              failureReason,
            }
          );
          console.log("Failed payment status updated:", errorResponse.data);
        } catch (err) {
          console.error(
            "Failed to update failed payment status:",
              err.response?.data || err
          );
        }
        navigate(
          `/payment/callback?order_id=${response.error.metadata.order_id}`,
          {
            state: {
              ...location.state,
              bookingId,
              paymentStatus: "FAILED",
              transactionId: response.error.metadata.payment_id,
              orderId: response.error.metadata.order_id,
              failureReason,
              currency: order.currency,
              amount: bookingData.amount,
              total_amount: bookingData.total_amount,
              Payment_Mode: "UNKNOWN",
              createdAt: new Date().toISOString(),
            },
          }
        );
      });
      rzp.open();

      setShowSuccess(true);
      setError("");
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error("Error during payment or booking:", err);
      setError(`Error processing request: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Animation for typewriter effect
  const typewriterVariants = {
    hidden: { width: 0 },
    visible: {
      width: "auto",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  // Payment methods as text only
  const paymentMethods = [
    { name: "UPI", icon: <QrCode sx={{ fontSize: "1.2rem", color: "#0288d1" }} /> },
    {
      name: "Cards (Visa, MasterCard, Rupay)",
      icon: <Payment sx={{ fontSize: "1.2rem", color: "#0288d1" }} />,
    },
    {
      name: "Net Banking",
      icon: <AccountBalance sx={{ fontSize: "1.2rem", color: "#0288d1" }} />,
    },
    {
      name: "Wallets (Paytm, PhonePe, etc.)",
      icon: <AccountBalanceWallet sx={{ fontSize: "1.2rem", color: "#0288d1" }} />,
    },
    { name: "EMI", icon: <CreditCard sx={{ fontSize: "1.2rem", color: "#0288d1" }} /> },
  ];

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 3 }, // Reduced padding for zoomed-in effect
        maxWidth: 450, // Slightly smaller container for zoomed-in feel
        mx: "auto",
        minHeight: "100vh", // Fits within one scroll
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: `linear-gradient(135deg, #b3e5fc 0%, #e1bee7 50%, #ffccbc 100%), url('') no-repeat center/cover`, // Rich gradient with background image
        backgroundBlendMode: "overlay", // Blend gradient with image
        fontFamily: "'Poppins', sans-serif",
        mb: 2,
      }}
    >
      <Typography
        variant="h5" // Smaller font size
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: 600,
          color: "#0288d1",
          letterSpacing: 1,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: "1.5rem", // Explicitly smaller
        }}
      >
        Secure Payment
      </Typography>

      {/* Booking Details Card */}
      {/* Booking Details Card */}
<motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <Card
    sx={{
      mb: 3,
      borderRadius: 4,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      background: "linear-gradient(135deg, #ffffff 0%, #bbdefb 100%)",
      border: "1px solid rgba(255,215,0,0.3)",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
    }}
  >
    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h6"
        sx={{ mb: 1.5, fontWeight: 600, color: "#37474f", fontSize: "1rem" }}
      >
        Booking Details
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.8, color: "#37474f", fontSize: "0.85rem" }}>
        <strong>Parlor:</strong> {parlor?.name || "N/A"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.8, color: "#37474f", fontSize: "0.85rem" }}>
        <strong>Service:</strong> {service || "N/A"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.8, color: "#37474f", fontSize: "0.85rem" }}>
        <strong>Customer:</strong> {name || "N/A"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.8, color: "#37474f", fontSize: "0.85rem" }}>
        <strong>Date:</strong> {date || "N/A"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.8, color: "#37474f", fontSize: "0.85rem" }}>
        <strong>Time:</strong> {time || "N/A"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.8, color: "#37474f", fontSize: "0.85rem" }}>
        <strong>Employee:</strong> {favoriteEmployee || "N/A"}
      </Typography>
      {relatedServices?.length > 0 && (
        <>
          <Typography
            variant="body2"
            sx={{ mb: 0.8, color: "#37474f", fontWeight: 500, fontSize: "0.85rem" }}
          >
            <strong>Additional Services:</strong>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.5 }}>
            {relatedServices.map((service) => (
              <motion.div
                key={service}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Chip
                  label={service}
                  sx={{
                    bgcolor: "#0288d1",
                    color: "white",
                    fontWeight: 500,
                    boxShadow: "0 2px 5px rgba(2,136,209,0.3)",
                    fontSize: "0.75rem",
                    "&:hover": {
                      bgcolor: "#0277bd",
                      boxShadow: "0 4px 10px rgba(2,136,209,0.5)",
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </>
      )}
      <motion.div
        key={totalAmount}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Typography
          variant="h6"
          sx={{ mt: 1.5, fontWeight: 600, color: "#37474f", fontSize: "1rem" }}
        >
          Total Amount: ₹{totalAmount || "N/A"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 0.8, color: "#4caf50", fontWeight: 500, fontSize: "0.85rem" }}
        >
          Amount to Pay: ₹{animatedAmount.toFixed(2) || "N/A"}
        </Typography>
      </motion.div>
    </CardContent>
  </Card>
</motion.div>

      {/* Payment Amount Selection */}
      <Typography
        variant="h6"
        sx={{ mb: 1.5, fontWeight: 600, color: "#37474f", fontSize: "1rem" }}
      >
        Select Payment Amount
      </Typography>
      <RadioGroup
        value={paymentAmountOption}
        onChange={handlePaymentAmountChange}
        sx={{ mb: 2 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <FormControlLabel
            value="25%"
            control={<Radio color="primary" />}
            label={`Minimum Payment (₹${
              totalAmount ? (totalAmount * 0.25).toFixed(2) : "N/A"
            })`}
            sx={{
              bgcolor: paymentAmountOption === "25%" ? "#e3f2fd" : "transparent",
              p: 1,
              borderRadius: 2,
              mb: 0.8,
              border:
                paymentAmountOption === "25%"
                  ? "1px solid #0288d1"
                  : "1px solid transparent",
              "& .MuiTypography-root": { fontSize: "0.85rem" }, // Smaller font
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <FormControlLabel
            value="full"
            control={<Radio color="primary" />}
            label={`Full Payment (₹${totalAmount || "N/A"})`}
            sx={{
              bgcolor: paymentAmountOption === "full" ? "#e3f2fd" : "transparent",
              p: 1,
              borderRadius: 2,
              border:
                paymentAmountOption === "full"
                  ? "1px solid #0288d1"
                  : "1px solid transparent",
              "& .MuiTypography-root": { fontSize: "0.85rem" }, // Smaller font
            }}
          />
        </motion.div>
      </RadioGroup>

      {/* Enhanced Payment Bar */}
      <AnimatePresence>
        {paymentAmountOption && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Box
              sx={{
                position: "relative",
                height: 20, // Slightly smaller for compact look
                borderRadius: 20,
                bgcolor: "#e0e0e0",
                boxShadow:
                  "inset 0 2px 5px rgba(0,0,0,0.2), 0 4px 15px rgba(0,0,0,0.1)",
                mb: 2,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${paymentAmountOption === "25%" ? 25 : 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background:
                    paymentAmountOption === "full"
                      ? "linear-gradient(90deg, #388e3c, #81c784)" // Richer green
                      : "linear-gradient(90deg, #0277bd, #4fc3f7)", // Richer blue
                  borderRadius: 20,
                  position: "relative",
                  boxShadow:
                    paymentAmountOption === "full"
                      ? "0 0 15px rgba(76,175,80,0.7)"
                      : "0 0 15px rgba(2,136,209,0.7)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "23%",
                    left: "15px",
                    transform: "translateY(-50%)",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.8rem", // Smaller font
                    
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: 1,
                    }}
                  >
                    ₹
                  </motion.span>
                  <Typography
                    sx={{ ml: 0.5, color: "white", fontWeight: 500, fontSize: "0.8rem" }}
                  >
                    {animatedAmount.toFixed(2)}
                  </Typography>
                </motion.div>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Methods as Text */}
   {/* Payment Methods as Text */}
   <motion.div
        variants={typewriterVariants}
        initial="hidden"
        animate="visible"
        style={{ overflow: "hidden" }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 1.5, fontWeight: 600, color: "#37474f", fontSize: "1rem" }}
        >
          Payment Methods
        </Typography>
        <Box sx={{ mb: 2 }}>
          {paymentMethods.map((method) => (
            <motion.div
              key={method.name}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#37474f",
                  mb: 0.8,
                  p: 0.5,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "#e3f2fd",
                  },
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  sx={{ mr: 1 }}
                >
                  {method.icon}
                </motion.div>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  {method.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Success/Error Alerts */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Alert
              severity="success"
              sx={{
                mb: 1.5,
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(76,175,80,0.2)",
                "& .MuiAlert-message": { fontSize: "0.85rem" }, // Smaller font
              }}
            >
              Initiating payment...
            </Alert>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 1.5,
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(211,47,47,0.2)",
                "& .MuiAlert-message": { fontSize: "0.85rem" }, // Smaller font
              }}
            >
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proceed to Payment Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!paymentAmountOption || !totalAmount || isProcessing}
          sx={{
            mt: 1.5,
            py: 0.8,
            borderRadius: 3,
            background: isProcessing
              ? "linear-gradient(90deg, #0288d1, #4fc3f7)"
              : "linear-gradient(90deg, #0288d1, #d81b60)", // Richer gradient
            "&:hover": {
              background: "linear-gradient(90deg, #0277bd, #ad1457)", // Richer hover
              boxShadow: "0 6px 20px rgba(2,136,209,0.4)",
            },
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(2,136,209,0.3)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem", // Smaller font
          }}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  position: "absolute",
                  width: "50%",
                  height: "100%",
                  background: "rgba(255,255,255,0.3)",
                  transform: "skewX(-20deg)",
                }}
              />
              Processing Payment...
            </>
          ) : (
            <>
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ₹
              </motion.span>
              Proceed to Payment
            </>
          )}
        </Button>
      </motion.div>
    </Box>
  );
};

export default Pay;