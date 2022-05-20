/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import Modal from "./Modal";
import { animateScroll as scroll } from "react-scroll";

const Offer = styled.div`
  background-color: #aad2d3b8;
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h3`
  font-family: "Playfair Display", serif;
  color: #363636;
  font-size: 22px;
  text-shadow: 0px 16px 15px rgba(150, 150, 150, 1);
`;

const OfferForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  & > input {
    height: 1.6rem;
    width: 47%;
    outline: none;
    border: none;
    border-radius: 0.125rem;
    padding-left: 5px;
    box-shadow: 0px 11px 11px 0px rgba(50, 50, 50, 0.1);
  }

  & > button {
    width: 47%;
    height: 1.9rem;
    border: none;
    margin-left: 2%;
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

const FooterText = styled.footer`
  height: 140px;
  background-color: #a6a6a68b;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  justify-content: center;

  & > img {
    display: flex;
    justify-content: center;
    margin-left: 10rem;
  }
`;

const Social = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > a {
    font-size: 45px;
    color: #363636;
    margin-left: 10px;
    margin-right: 10px;
    :hover {
      transform: translateY(20px);
      transition: 0.5s;
    }
  }
`;

const Rights = styled.div`
  color: #ffffff;
  margin-right: 70px;
  text-align: end;
`;

export default function Footer() {
  const [modal, setModal] = useState(false);
  const email = useRef();

  const discount = (event) => {
    setModal(true);
    event.preventDefault();
    email.current.value = "";
    setTimeout(() => {
      setModal(false);
      scroll.scrollToTop();
    }, 1500);
  };

  return (
    <>
      <Offer>
        {modal && <Modal message={"Thanks for subscribe !!!"} />}
        <Text>
          Suscribe for exclusive offers and get 10% off your first order
        </Text>
        <OfferForm onSubmit={discount}>
          <input
            ref={email}
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <button>Submit</button>
        </OfferForm>
      </Offer>
      <FooterText>
        <img src="https://i.imgur.com/M7FiaJ5.png" alt="altLogo" />
        <Social>
          <a
            href="https://github.com/Rsdjsp"
            target={"_blank"}
            rel="noreferrer"
          >
            <AiOutlineGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/rsantos96/?locale=en_US"
            target={"_blank"}
            rel="noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://twitter.com/RobertS16872182"
            target={"_blank"}
            rel="noreferrer"
          >
            <AiOutlineTwitter />
          </a>
        </Social>
        <Rights>© RStore All Right Rserved</Rights>
      </FooterText>
    </>
  );
}
