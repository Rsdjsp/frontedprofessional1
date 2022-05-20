/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import styled from "styled-components";
import { database } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../../../components/Footer";

const NameContainer = styled.div`
  width: 100%;
  height: 316px;
  background-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 142px;
  & > h1,
  p {
    text-align: center;
    width: 50%;
    margin: 1;
  }

  & > h1 {
    font-family: "Playfair Display", serif;
    font-size: 28px;
    text-transform: capitalize;
  }

  & > p {
    font-size: 15px;
  }

  & > span {
    position: absolute;
    color: #363636;
    left: 0;
    top: 0;
    margin-top: 172px;
    margin-left: 70px;
    text-transform: uppercase;
    font-weight: 100;
    font-size: 15px;
  }
`;

const Sort = styled.div`
  width: 100%;
  height: 60px;
  display: flexbox;
  align-items: center;
  position: relative;
  border: 2px solid #83a1a23e;
  margin-bottom: 40px;

  & > p {
    color: #83a1a2;
    position: absolute;
    right: 248px;
    top: 8px;
  }

  & > #price,
  #order {
    font-size: 16px;
    outline: none;
  }

  & > #price {
    background-color: transparent;
    border: none;
    border-right: 2px solid #83a1a2;
    margin-left: 70px;
    padding-right: 20px;
  }

  & > #order {
    width: 173px;
    background-color: #ffffff;
    position: absolute;
    right: 70px;
  }
`;

const Container = styled.div`
  width: fit-content;
  display: grid;
  margin: auto;
  margin-bottom: 70px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const Product = styled.a`
  width: 280px;
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

const Paginate = styled.div`
  display: flexbox;
  width: 100%;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;

  & > p {
    margin-right: 10px;
  }

  & > button {
    margin: 5px;
    cursor: pointer;
    background-color: transparent;
    font-size: 16px;
    outline: none;
    border: 1px solid #e4563c;
    :active {
      background-color: #ffffff;
    }
  }
`;

export async function getServerSideProps(context) {
  const { categoryName } = context.params;
  const col = collection(database, "products");
  const docs = await getDocs(col);

  const products = [];

  docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  let focusedProducts = "";
  let name = "";
  let color = "";
  switch (categoryName) {
    case "bestSellers":
      focusedProducts = products.slice(0, 32);
      name = categoryName;
      color = "#DAF1FD";
      break;
    case "offers":
      focusedProducts = products.slice(32, 64);
      name = categoryName;
      color = "#FDD9AC";
      break;
    case "newCollection":
      focusedProducts = products.slice(64, 96);
      name = categoryName;
      color = "#83A1A2";
      break;
    case "liquidation":
      focusedProducts = products.slice(96, 128);
      name = categoryName;
      color = "#FDFFB8";
      break;

    default:
      break;
  }

  return {
    props: {
      focusedProducts,
      name,
      color,
    },
  };
}

export default function Category({ focusedProducts, name, color }) {
  const [products, setProducts] = useState(focusedProducts);
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(16);

  useEffect(() => {
    setProducts(focusedProducts);
  }, [focusedProducts]);

  const pageUp = () => {
    setIndexStart(16);
    setIndexEnd(32);
  };
  const pageDown = () => {
    setIndexStart(0);
    setIndexEnd(16);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "1") {
      const newProducts = focusedProducts.filter(
        (product) => product.price > 50
      );
      setProducts(newProducts);
    } else if (value === "2") {
      const newProducts = focusedProducts.filter(
        (product) => product.price < 50
      );
      setProducts(newProducts);
    } else {
      setProducts(focusedProducts);
    }
  };

  const orderItems = (event) => {
    const value = event.target.value;
    if (value === "1") {
      const newProducts = Array.from(focusedProducts).sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      setProducts(newProducts);
    } else if (value === "2") {
      const newProducts = Array.from(focusedProducts).sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      setProducts(newProducts);
    } else {
      setProducts(focusedProducts);
    }
  };

  return (
    <>
      <NameContainer color={color}>
        <span>home / categories / {name}</span>
        <h1>{name}</h1>
        <p>
          You cant buy happiness, but you can buy the outfit for that special
          occasion. You wont notice the difference.
        </p>
      </NameContainer>
      <Sort>
        <select onChange={handleChange} name="price" id="price">
          <option value="#">$Price</option>
          <option value="1">+ $50</option>
          <option value="2">- $50</option>
        </select>
        <p>{products.length || 0} Items</p>
        <select onChange={orderItems} name="order" id="order">
          <option value="#">Sort</option>
          <option value="1">Ascendant</option>
          <option value="2">Descendant</option>
        </select>
      </Sort>
      <Container>
        {products
          .slice(indexStart, indexEnd)
          .map(({ id, name, price, img }) => {
            return (
              <Link href={`/products/${id}`} key={id} passHref>
                <Product>
                  <img src={img} alt="product_picture" />
                  <h4>{name.slice(0, 20)}</h4>
                  <p> $ {price}</p>
                </Product>
              </Link>
            );
          })}
      </Container>
      <Paginate>
        <p>Page</p>
        <button onClick={pageDown}>1</button>
        {products.length > 16 && <button onClick={pageUp}>2</button>}
      </Paginate>
      <Footer />
    </>
  );
}
