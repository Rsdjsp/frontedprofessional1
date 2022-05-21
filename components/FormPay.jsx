import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styled from "styled-components";

const Form = styled.form`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  & > button {
    margin: auto;
    margin-top: 50px;
    width: 50%;
    height: 50px;
    border: none;
    font-size: 15px;
    text-transform: uppercase;
    color: #ffffff;
    background-color: #e4563c;
    border-radius: 0.125rem;
    box-shadow: 0px 11px 11px 0px rgba(50, 50, 50, 0.1);
    cursor: pointer;
    :hover {
      background-color: #f7a293;
      font-size: 16px;
    }
  }
`;

export default function FormPayment() {
  const [ready, setReady] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const makePayment = async (event) => {
    event.preventDefault();
    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    console.log(response);
  };
  return (
    <>
      {stripe && (
        <Form onSubmit={makePayment}>
          <PaymentElement onReady={() => setReady(true)} id="pay" />
          {ready && <button>Pay</button>}
        </Form>
      )}
    </>
  );
}
