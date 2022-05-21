/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { credentials } from "../../../config/index";
import { post } from "../../../config/axios";
import FormPay from "../../../components/FormPay";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const stripe = loadStripe(credentials.stripe_pk);

const CheckoutForm = styled.div`
  position: absolute;
  z-index: 20;
  width: 100vw;
  height: 70vh;
  background: linear-gradient(to right, #e9e9e9 50%, #f2f2f2 100%);
  padding-top: 122px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  & > div {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    overflow-y: auto;

    & > h3 {
      margin-bottom: 30px;
      font-weight: 300;
      font-size: 22px;
      & > span {
        font-weight: bold;
      }
    }

    & > article {
      display: flexbox;
      width: 80%;
      position: relative;
      height: fit-content;
      margin-bottom: 15px;
      & > img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
      & > h2 {
        font-family: "Playfair Display", serif;
        font-weight: 200;
        width: 50%;
        height: fit-content;
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-size: 20px;
      }
      & > p {
        position: absolute;
        top: 56%;
        left: 28%;
        font-size: 13px;
      }
    }
  }
`;

export function getServerSideProps(context) {
  const { amount } = context.params;

  return {
    props: {
      amount,
    },
  };
}

export default function Payment({ amount }) {
  const { products } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState("");
  const checkout = Math.round(amount) * 10;
  useEffect(() => {
    post("/api/payments/intent", {
      amount: checkout,
    }).then(({ data }) => setClientSecret(data));
  }, [amount, checkout]);

  return (
    <CheckoutForm>
      {clientSecret && (
        <Elements stripe={stripe} options={{ clientSecret }}>
          <div>
            <h3>
              You are about to pay $ <span>{amount}</span> for this products:
            </h3>

            {products &&
              products.map(({ id, quantity, img, name }) => {
                return (
                  <article key={id}>
                    <img src={img} alt="product" />
                    <h2>{name}</h2>
                    <p>
                      X <span>{quantity}</span>
                    </p>
                  </article>
                );
              })}
          </div>
          <FormPay />
        </Elements>
      )}
    </CheckoutForm>
  );
}
