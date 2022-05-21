import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { login, logout } from "../features/auth";
import Navbar from "./Navbar";
import { recoverCart } from "../features/products/cart";

export default function Page({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (result) => {
      if (result) {
        dispatch(
          login({
            name: result.displayName,
            id: result.uid,
          })
        );
        dispatch(recoverCart());
      } else {
        // result es null
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
