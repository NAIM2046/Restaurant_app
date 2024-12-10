import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../useMenu/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import useCards from "../../useMenu/useCards";
import { useNavigate } from "react-router-dom";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QNsOTF9vXHEmaiAwq7tDZA5llUGcm9NiejszudjmXurAT7sHPvtmF30cbQCSUl3EPG8Nfz1sO4jTKG0m5E4ZwyP000IaCmCbC"
);

const CheckoutFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [card, refetch] = useCards();
  const navigate = useNavigate();

  // Ensure `card` is always an array
  const safeCard = Array.isArray(card) ? card : [];
  const totalPrice = safeCard.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  // Generate client secret for Stripe
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error generating payment intent:", err);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card information is not available.");
      return;
    }

    // Create PaymentMethod
    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (paymentError) {
      console.error("[PaymentMethod Error]", paymentError);
      setError(paymentError.message);
      return;
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      console.log("Payment succeeded, transaction ID:", paymentIntent.id);
      setTransactionId(paymentIntent.id);

      // Save payment information to the server
      const paymentData = {
        email: user?.email || "anonymous",
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: safeCard.map((item) => item._id),
        menuItemIds: safeCard.map((item) => item.menuId),
        status: "pending",
      };
      console.log(paymentData);
      const res = await axiosSecure.post("/payments", paymentData);
      console.log("payment saved", res.data);
      refetch();
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for the taka paisa",
          showConfirmButton: false,
          timer: 1500,
        });
        //navigate("/dashboard/paymentHistory");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {transactionId && (
        <p className="text-green-500">
          Payment successful! Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

const Payment = () => {
  return (
    <div>
      <SectionTitle heading={"Payment"} subHeading={"Pay to eat"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutFrom />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
