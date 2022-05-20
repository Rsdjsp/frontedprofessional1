import React from "react";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Home from "../components/Home";
import { database } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getServerSideProps() {
  const col = collection(database, "products");
  const docs = await getDocs(col);
  const products = [];
  docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  const caroProducts = products.slice(0, 20);

  return {
    props: {
      caroProducts,
    },
  };
}

const Principal = ({ caroProducts }) => {
  return (
    <>
      <Home />
      <Carousel products={caroProducts} />
      <Footer />
    </>
  );
};

export default Principal;
