import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf";

const BASE_URL = process.env.REACT_APP_API_URL;

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const orderId = query.get("order_id");
  const [paymentStatus, setPaymentStatus] = useState(location.state || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;
  const retryDelay = 3000;

  const verifyPayment = async (orderId) => {
    try {
  
      const response = await axios.get(
        `${BASE_URL}/api/razorpay/verify?order_id=${orderId}`
      );
      console.log("Payment verification response from /verify:", response.data);
      return response.data.data;
    } catch (err) {
      console.error("Payment verification error:", err.response?.data || err);
      throw err;
    }
  };

  useEffect(() => {

    console.log("Current paymentStatus:", paymentStatus);

    const attemptVerification = async () => {
      if (!orderId) {
        setError(
          "No order ID provided. Please try initiating the payment again."
        );
        setLoading(false);
        return;
      }

      try {
        const statusData = await verifyPayment(orderId);

        if (statusData.paymentStatus === "PENDING" && retryCount < maxRetries) {
          console.log(
            `Retry ${
              retryCount + 1
            }/${maxRetries} for order ${orderId}: Status PENDING`
          );
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, retryDelay);
          return;
        }

        console.log("Updated paymentStatus from verify:", statusData);
        setPaymentStatus(statusData);
        setLoading(false);
        if (statusData.paymentStatus === "PAID") {
          console.log(
            `Payment successful for order ${orderId}, transactionId: ${statusData.transactionId}`
          );
        } else if (statusData.paymentStatus === "FAILED") {
          setError(
            `Payment failed: ${statusData.failureReason || "Unknown reason"}`
          );
        }
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message;
        setError(`Failed to verify payment: ${errorMessage}`);
        setLoading(false);
      }
    };

    // Only verify if no state is provided or status is PENDING
    if (!paymentStatus || paymentStatus.paymentStatus === "PENDING") {
      attemptVerification();
    } else {
      setLoading(false);
      if (paymentStatus.paymentStatus === "FAILED") {
        setError(
          `Payment failed: ${paymentStatus.failureReason || "Unknown reason"}`
        );
      }
    }
  }, [orderId, retryCount, paymentStatus, location.state]);

  const handleTryAgain = () => {
    navigate("/pay", { state: location.state });
  };

  const handleRefreshStatus = async () => {
    setLoading(true);
    setError("");
    setRetryCount(0);
    try {
      const statusData = await verifyPayment(orderId);
      console.log("Updated paymentStatus from refresh:", statusData);
      setPaymentStatus(statusData);
      setLoading(false);
      if (statusData.paymentStatus === "PAID") {
        console.log(
          `Payment successful after refresh for order ${orderId}, transactionId: ${statusData.transactionId}`
        );
      } else if (statusData.paymentStatus === "FAILED") {
        setError(
          `Payment failed: ${statusData.failureReason || "Unknown reason"}`
        );
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(`Failed to refresh payment status: ${errorMessage}`);
      setLoading(false);
    }
  };

  const generateReceiptPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payment Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Parlor: ${paymentStatus?.parlorName || "N/A"}`, 20, 40);
    doc.text(`Customer: ${paymentStatus?.name || "N/A"}`, 20, 50);
    doc.text(`Service: ${paymentStatus?.service || "N/A"}`, 20, 60);
    if (paymentStatus?.relatedServices?.length > 0) {
      doc.text(
        `Additional Services: ${paymentStatus.relatedServices.join(", ")}`,
        20,
        70
      );
    }
    doc.text(
      `Date: ${paymentStatus?.date ? new Date(paymentStatus.date).toLocaleDateString() : "N/A"}`,
      20,
      80
    );
    doc.text(`Time: ${paymentStatus?.time || "N/A"}`, 20, 90);
    doc.text(`Employee: ${paymentStatus?.favoriteEmployee || "N/A"}`, 20, 100);
    doc.text(
      `Total Amount: ${paymentStatus?.currency || "INR"} ${paymentStatus?.total_amount || "N/A"}`,
      20,
      110
    );
    doc.text(
      `Amount Paid: ${paymentStatus?.currency || "INR"} ${paymentStatus?.amount || "N/A"}`,
      20,
      120
    );
    doc.text(
      `Payment Method: ${paymentStatus?.Payment_Mode || "N/A"}`,
      20,
      130
    );
    doc.text(
      `Transaction ID: ${paymentStatus?.transactionId || "N/A"}`,
      20,
      140
    );
    doc.text(`Order ID: ${paymentStatus?.orderId || "N/A"}`, 20, 150);
    doc.text(`Status: ${paymentStatus?.paymentStatus || "N/A"}`, 20, 160);
    doc.text(
      `Date: ${paymentStatus?.createdAt ? new Date(paymentStatus.createdAt).toLocaleString() : "N/A"}`,
      20,
      170
    );
    if (paymentStatus?.paymentStatus === "FAILED") {
      doc.text(`Reason: ${paymentStatus?.failureReason || "Unknown"}`, 20, 180);
    }
    doc.save(`receipt_${paymentStatus?.orderId || "unknown"}.pdf`);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Payment Status
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Checking payment status, please wait...
          </Typography>
        </Box>
      ) : error ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={handleTryAgain}
            sx={{ mt: 2, mr: 2 }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Alert
            severity={
              paymentStatus?.paymentStatus === "PAID"
                ? "success"
                : paymentStatus?.paymentStatus === "FAILED"
                ? "error"
                : "warning"
            }
            sx={{ mb: 2 }}
          >
            {paymentStatus?.paymentStatus === "PAID"
              ? `Payment Successful for order: ${orderId}`
              : paymentStatus?.paymentStatus === "FAILED"
              ? `Payment Failed for order: ${orderId}: ${
                  paymentStatus.failureReason || "Unknown reason"
                }`
              : `Payment is still processing for order: ${orderId}. Please wait or refresh the status.`}
          </Alert>
          {paymentStatus && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">Receipt</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>
                Parlor: {paymentStatus.parlor.name || "N/A"}
              </Typography>
              <Typography>Customer: {paymentStatus.name || "N/A"}</Typography>
              <Typography>Service: {paymentStatus.service || "N/A"}</Typography>
              {paymentStatus.relatedServices?.length > 0 && (
                <Typography>
                  Additional Services:{" "}
                  {paymentStatus.relatedServices.join(", ")}
                </Typography>
              )}
              <Typography>
                Date:{" "}
                {paymentStatus.date
                  ? new Date(paymentStatus.date).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography>Time: {paymentStatus.time || "N/A"}</Typography>
              <Typography>
                Employee: {paymentStatus.favoriteEmployee || "N/A"}
              </Typography>
              <Typography>
                Total Amount: {paymentStatus.currency || "INR"} {paymentStatus.total_amount || "N/A"}
              </Typography>
              <Typography>
                Amount Paid: {paymentStatus.currency || "INR"} {paymentStatus.amount || "N/A"}
              </Typography>
              <Typography>
                Payment Method: {paymentStatus.Payment_Mode || "N/A"}
              </Typography>
              <Typography>
                Transaction ID: {paymentStatus.transactionId || "N/A"}
              </Typography>
              <Typography>
                Order ID: {paymentStatus.orderId || "N/A"}
              </Typography>
              <Typography>
                Status: {paymentStatus.paymentStatus || "N/A"}
              </Typography>
              <Typography>
                Created At:{" "}
                {paymentStatus.createdAt
                  ? new Date(paymentStatus.createdAt).toLocaleString()
                  : "N/A"}
              </Typography>
              {paymentStatus.paymentStatus === "FAILED" && (
                <Typography color="error">
                  Reason: {paymentStatus.failureReason || "Unknown"}
                </Typography>
              )}
            </Paper>
          )}
          {paymentStatus?.paymentStatus === "PAID" && (
            <Button
              variant="contained"
              onClick={generateReceiptPDF}
              sx={{ mt: 2, mr: 2 }}
            >
              Download Receipt
            </Button>
          )}
          {paymentStatus?.paymentStatus === "PENDING" && (
            <Button
              variant="contained"
              onClick={handleRefreshStatus}
              sx={{ mt: 2, mr: 2 }}
            >
              Refresh Status
            </Button>
          )}
          {paymentStatus?.paymentStatus === "FAILED" && (
            <Button
              variant="contained"
              onClick={handleTryAgain}
              sx={{ mt: 2, mr: 2 }}
            >
              Try Again
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PaymentCallback;