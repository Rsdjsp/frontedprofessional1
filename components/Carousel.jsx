/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Link from "next/dist/client/link";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: auto;
  margin-bottom: 160px;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-column-gap: 20px;
`;

const Product = styled.a`
  width: 270px;
  height: fit-content;
  border: 2px solid #a6a6a67b;
  border-radius: 2%;
  background-color: #ffffff;
  color: #363636;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0px 16px 16px 0px rgba(168, 168, 168, 0.38);

  & > img {
    width: 100%;
    height: 270px;
    object-fit: cover;
    margin-bottom: 0;
    :hover {
      object-fit: none;
    }
  }

  & > h4,
  p {
    width: 100%;
    margin-left: 10px;
    line-height: 0%;
  }
`;

const Arrow = styled.button`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 30px;
  color: #a6a6a67b;
  :hover {
    box-shadow: 7px 7px 5px 0px rgba(109, 109, 109, 0.75);
    border-radius: 10%;
    color: #e4563c;
  }
`;

export default function Carousel({ products }) {
  const [bestSeller, setBestSeller] = useState(products);
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(4);

  useEffect(() => {
    setBestSeller(products);
  }, [products]);

  const next = () => {
    if (
      indexStart + 4 > bestSeller.length - 1 ||
      indexEnd > bestSeller.length - 3
    ) {
      setIndexStart(0);
      setIndexEnd(4);
    } else {
      setIndexStart(indexStart + 4);
      setIndexEnd(indexEnd + 4);
    }
  };

  const back = () => {
    if (indexStart - 4 < 0) {
      setIndexStart(bestSeller.length - 5);
      setIndexEnd(bestSeller.length - 1);
    } else {
      setIndexStart(indexStart - 4);
      setIndexEnd(indexEnd - 4);
    }
  };

  return (
    <>
      <Main>
        <Arrow onClick={back}>
          <MdArrowBackIosNew />
        </Arrow>
        <Container>
          {bestSeller
            .slice(indexStart, indexEnd)
            .map(({ id, img, name, price }) => {
              return (
                <Link href={`/products/${id}`} key={id} passHref>
                  <Product>
                    <img src={img} alt="product" />
                    <h4>{name.slice(0, 28)}</h4>
                    <p> $ {price}</p>
                  </Product>
                </Link>
              );
            })}
        </Container>
        <Arrow onClick={next}>
          <MdArrowForwardIos />
        </Arrow>
      </Main>
    </>
  );
}
