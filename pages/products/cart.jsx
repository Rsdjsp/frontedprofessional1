/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../api";
import { pullProduct, userCart } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  width: 100%;
  max-height: 100vh;
  height: fit-content;
  position: absolute;
  z-index: 10;
  background: linear-gradient(to right, #e9e9e9 50%, #f2f2f2 100%);
  padding-top: 130px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1,
  div {
    border-bottom: 2px solid #a6a6a6;
    padding-bottom: 25px;
    width: 60%;
  }

  & > h1 {
    font-size: 32px;
    font-family: "Playfair Display", serif;
    font-weight: 400;
  }

  & > div {
    height: fit-content;

    & > article {
      display: flexbox;
      align-items: center;
      max-width: 100%;
      position: relative;

      & > img {
        width: 150px;
        height: 150px;
      }
      & > h2 {
        font-size: 22px;
        font-family: "Playfair Display", serif;
        font-weight: 400;
        width: 200px;
        margin-left: 30px;
        text-align: center;
        margin-right: 30px;
      }
      & > p {
        padding-left: 20px;
        & > span {
          font-size: 22px;
          margin-left: 10px;
        }
      }

      & > button {
        background-color: transparent;
        border: none;
        font-size: 22px;
        margin-left: 100px;
        padding-top: 5px;
        cursor: pointer;
        :hover {
          color: #e4563c;
        }
      }
      & > h3 {
        position: absolute;
        right: 0;
        top: 24%;
        font-size: 24px;
      }
    }
  }
  & > section {
    display: grid;
    width: 60%;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > #comments {
      & > p {
        font-size: 15px;
        margin-top: 15px;
        margin-bottom: 15px;
      }

      & > textarea {
        width: 100%;
        height: 67%;
      }
    }

    & > #checkout {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 150px;
      & > div {
        padding-bottom: 0;
        margin-bottom: 20px;
        & > p {
          text-align: right;
          font-size: 15px;
        }

        & > h3 {
          text-align: right;
          font-size: 24px;
        }
      }
      & > button {
        width: 60%;
        height: 60px;
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
  }
`;

const Cart = () => {
  const { products } = useSelector((state) => state.user.cart);
  const { logged } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let total = 0;
  products &&
    products.forEach((element) => {
      if (element.product.price && element.quantity) {
        const totalAmount = element.product.price * element.quantity;
        total = total + totalAmount;
      }
    });

  useEffect(() => {
  
    dispatch(userCart());
  }, [dispatch, logged, navigate]);

  const removeProduct = (idProduct) => {
    post("/api/cart/delete", {
      product: idProduct,
    });
    const productDel = products.find(
      (product) => product.product._id === idProduct
    );
    const newCart = products.filter((product) => product !== productDel);
    dispatch(pullProduct({ products: newCart }));
  };

  const checkOut = () => {
    navigate(`/payments/${total}`);
  };

  return (
    <CartContainer>
      <h1>Shopping Cart</h1>
      <div>
        {products &&
          products.map(({ product, quantity }) => {
            return (
              <article key={product._id}>
                <img src={product.img} alt="product" />
                <h2>{product.name}</h2>
                <p>
                  X <span>{quantity}</span>
                </p>
                <button onClick={() => removeProduct(product._id)}>
                  <IoTrashOutline />
                </button>
                <h3>$ {(product.price * quantity).toFixed(2)}</h3>
              </article>
            );
          })}
      </div>
      <section>
        <article id="comments">
          <p>
            Include a special message for your recipient on the order packing
            slip at no extra charge!
          </p>
          <textarea
            name="comments"
            id="coments"
            cols="1"
            rows="1"
            placeholder="0/200"
          />
        </article>
        <article id="checkout">
          <div>
            <h3>
              Subtotal <span>$ {total.toFixed(2)}</span>
            </h3>
            <p>Shiping & taxes calculated at checkout</p>
          </div>
          <button onClick={checkOut}>check out</button>
        </article>
      </section>
    </CartContainer>
  );
};

export default Cart;
