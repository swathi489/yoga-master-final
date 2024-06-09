import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import Swal from "sweetalert2"; // Import SweetAlert

const CheckoutPayment = ({ price, cartItm }) => {
  const URL = `https://yoga-master-server-991u.onrender.com/payment-info?${
    cartItm && `classId=${cartItm}`
  }`;
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const [succeeded, setSucceeded] = useState("");
  const [cart, setCart] = useState([]);

  if (price < 0 || !price) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    axiosSecure.get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setCart(classesId);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: price })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (event) => {
    setMessage('');
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      setMessage(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name || "unknown",
            email: currentUser?.email || "Anonymous",
          },
        },
      });

      if (confirmError) {
        console.log("[Confirm Error]", confirmError);
      } else {
        console.log("[payment Intent]", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          const transactionId = paymentIntent.id;
          const paymentMethod = paymentIntent.payment_method;
          const amount = paymentIntent.amount / 100;
          const paymentStatus = paymentIntent.status;
          const userName = currentUser?.name;
          const userEmail = currentUser?.email;

          const data = {
            transactionId,
            paymentMethod,
            amount,
            paymentStatus,
            userName,
            userEmail,
            classesId: cartItm ? [cartItm] : cart,
            date: new Date(),
          };

          fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
          })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId && res.updatedResult.modifiedCount > 0) {
              setSucceeded("Payment Successful");
              Swal.fire({
                title: "Payment Successful!",
                text: "Your classes will be scheduled soon and you will receive an email with further details.",
                icon: "success",
                confirmButtonText: "OK"
              });
            } else {
              setSucceeded('Payment Failed, Please try again...');
            }
          })
          .catch(err => console.log(err));
        }
      }
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Payment Amount:<span className="text-secondary">{price}$</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div id="payment-element" style={paymentElementStyle}>
          <CardElement style={cardElementStyle} />
        </div>
        <button type="submit" style={buttonStyle} disabled={isLoading || !stripe || !clientSecret}>
          Pay
        </button>
        {message && <div id="payment-message" style={messageStyle}>{message}</div>}
        {succeeded && <div id="payment-message" style={messageStyle}>{succeeded}</div>}
      </form>
    </div>
  );
};

const formStyle = {
  width: "30vw",
  minWidth: "500px",
  alignSelf: "center",
  alignContent: "center",
  boxShadow:
    "0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)",
  borderRadius: "7px",
  padding: "40px",
};

const paymentElementStyle = {
  marginBottom: "24px",
};

const cardElementStyle = {
  fontSize: "16px",
  color: "#424770",
  '::placeholder': {
    color: "#aab7c4",
  },
};

const buttonStyle = {
  background: "#5469d4",
  fontFamily: "Arial, sans-serif",
  color: "#ffffff",
  borderRadius: "4px",
  border: "0",
  padding: "12px 16px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  display: "block",
  transition: "all 0.2s ease",
  boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
  width: "100%",
};

const messageStyle = {
  color: "rgb(105, 115, 134)",
  fontSize: "16px",
  lineHeight: "20px",
  paddingTop: "12px",
  textAlign: "center",
};

export default CheckoutPayment;
