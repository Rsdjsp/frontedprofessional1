/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/dist/client/link";
import styled from "styled-components";
import Carousel from "../components/Carousel";

const Cover = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-self: center;
  align-items: center;
  width: 100%;
  height: 82vh;
  margin-bottom: 150px;

  & > img {
    margin: auto;
    max-width: 100%;
    object-fit: cover;
    margin-top: 80px;
  }
`;

const Intro = styled.div`
  padding-top: 190px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Playfair Display", serif;
  margin-left: 78px;
  font-size: 48px;
  & > h3 {
    font-weight: 100;
    text-shadow: 0px 16px 7px rgba(150, 150, 150, 0.33);
    text-align: center;
  }
  & > button {
    width: 40%;
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

const Categories = styled.div`
  margin: auto;
  width: 87.2%;
  height: 900px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  & > .div1,
  .div2,
  .div3,
  .div4 {
    height: 400px;
    border: 1.5px solid #a6a6a6;
  }

  & > .div1,
  .div3 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    justify-content: center;
    & > img {
      max-width: 100%;
      object-fit: contain;
    }
  }

  & > .div2,
  .div4 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    & > img {
      margin: auto;
      width: 80%;
      height: 65%;
      margin-top: 60px;
      margin-bottom: 30px;
      object-fit: contain;
    }
  }

  & > .div1 {
    grid-area: 1 / 1 / 2 / 4;
    background-color: #daf1fd;
  }
  & > .div2 {
    grid-area: 1 / 4 / 2 / 6;
    background-color: #fdffb8;
  }
  & > .div3 {
    grid-area: 2 / 3 / 3 / 6;
    background-color: #f6f0e0;
  }
  & > .div4 {
    grid-area: 2 / 1 / 3 / 3;
    background-color: #fdd9ac;
  }
`;

const CategoryText = styled.article`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > p {
    font-family: "Playfair Display", serif;
    font-size: 38px;
    text-shadow: 0px 16px 7px rgba(150, 150, 150, 0.33);
  }
`;

const LinkButton = styled.button`
  outline: none;
  font-size: 16px;
  font-weight: bold;
  background: transparent;
  border: none;
  text-decoration-line: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  margin: 0;
  padding: 5px;

  :hover {
    box-shadow: 0px 11px 17px 0px rgba(50, 50, 50, 0.64);
    background-color: #e4563c;
    text-decoration: none;
    color: #ffffff;
  }
`;

const Titles = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 32px;
  width: 100%;
  text-align: center;
`;

const Gifts = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 87.2%;
  height: 488px;
  background-color: #ffffff;
  margin-bottom: 4rem;

  & > div {
    margin-left: 100px;

    & > h3 {
      font-family: "Playfair Display", serif;
      font-size: 40px;
      font-weight: 100;
    }

    & > p {
      color: #a6a6a6;
      font-size: 16px;
    }

    & > button {
      width: 47%;
      height: 1.9rem;
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
  }
`;

export default function Home() {
  return (
    <>
      <Cover>
        <Intro>
          <h3>Save 20 % in your Second pruduct whit Your credit card</h3>
          <Link href="/products/category/bestSellers" passHref>
            <button>shop now</button>
          </Link>
        </Intro>
        <img src="https://i.imgur.com/YVfZTT0.png" alt="promotion" />
      </Cover>
      <Titles>Categories</Titles>
      <Categories>
        <div className="div1">
          <CategoryText>
            <p>Best Sellers</p>
            <Link href="/products/category/bestSellers" passHref>
              <LinkButton>Shop Now</LinkButton>
            </Link>
          </CategoryText>
          <img src="https://i.imgur.com/hxMs0Cf.png" alt="logo" />
        </div>
        <div className="div2">
          <img src="https://i.imgur.com/6fn1Ogd.png" alt="logo" />
          <Link href="/products/category/offers" passHref>
            <LinkButton>Offers</LinkButton>
          </Link>
        </div>
        <div className="div3">
          <CategoryText>
            <p>New Collection</p>
            <Link href="/products/category/newCollection" passHref>
              <LinkButton>Shop Now</LinkButton>
            </Link>
          </CategoryText>
          <img src="https://i.imgur.com/kr4hj71.png" alt="logo" />
        </div>
        <div className="div4">
          <img src="https://i.imgur.com/zT7Nav1.png" alt="logo" />
          <Link href="/products/category/liquidation" passHref>
            <LinkButton>Liquidation</LinkButton>
          </Link>
        </div>
      </Categories>
      <Titles>Complement Your Purchase With a Gift Subscription</Titles>
      <Gifts>
        <div>
          <h3>Give the gifts theyll open every day.</h3>
          <p>Subscriptions to The Times. Starting at $25.</p>
          <button>Give</button>
        </div>
        <img src="https://i.imgur.com/OaDXEND.png" alt="logo" />
      </Gifts>
      <Titles>Shop Best Sellers</Titles>
    </>
  );
}
