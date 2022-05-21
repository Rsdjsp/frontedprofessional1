import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, updateData } from "../../features/auth/index";
import Modal from "../../components/Modal";
import styled from "styled-components";

const config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    // EmailAuthProvider.PROVIDER_ID,
  ],
};

const LoginForm = styled.div`
  width: 100%;
  max-height: 100vh;
  position: absolute;
  z-index: 10;
  background: linear-gradient(to right, #e9e9e9 50%, #f2f2f2 100%);
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    width: 50%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h1 {
      text-align: center;
      font-weight: 400;
      font-size: 30px;
      font-family: "Playfair Display", serif;
      margin-bottom: 30px;
    }

    & > input {
      height: 35px;
      width: 45%;
      margin-bottom: 15px;

      outline: none;
      border: 1.5px solid #a6a6a6;
    }

    & > p {
      margin: 0;
      width: 45%;
      font-size: 11px;
      font-weight: 500;
      text-align: end;
      cursor: pointer;
      :hover {
        text-decoration-line: underline;
        text-underline-offset: 4px;
        font-weight: bolder;
      }
    }

    & > button {
      width: 45%;
      height: 35px;
      border: none;
      margin-top: 35px;
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
  & > div {
    width: 22.17%;
    display: flex;
    flex-direction: column;

    & > h4 {
      margin-top: 50px;
      font-size: 13px;
      font-weight: 500;
    }
  }
  & > #account {
    background-color: transparent;
    border: none;
    margin-top: 70px;
    margin-bottom: 10px;
    cursor: pointer;
    text-decoration-line: underline;
    text-underline-offset: 4px;
    :hover {
      font-weight: 600;
    }
  }
`;

const Google = styled(StyledFirebaseAuth)`
  cursor: pointer;
  :hover {
    opacity: 70%;
  }
`;
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const sigIn = (event) => {
    event.preventDefault();
    setModal(true);
    const {
      email: { value: email },
      password: { value: password },
    } = event.target;

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(
            login({
              id: user.uid,
              name: user.displayName,
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const {
        firstname: { value: firstname },
        lastname: { value: lastname },
      } = event.target;
      const name = `${firstname} ${lastname}`;
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log(result);
          updateProfile(result.user, {
            displayName: name,
          }).then(() => {
            dispatch(
              updateData({
                name,
              })
            );
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTimeout(() => {
      router.replace("/");
      setModal(false);
    }, 1500);
  };
  return (
    <div>
      <LoginForm>
        <form onSubmit={sigIn}>
          <h1>{isLogin ? "Login" : "Create an Account"}</h1>
          {!isLogin && (
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              id="firstname"
              required
            />
          )}
          {!isLogin && (
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              id="lastname"
              required
            />
          )}
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            minLength={6}
            required
          />
          {isLogin && <p>FORGOT PASSWORD?</p>}
          <button>{isLogin ? "SIGN IN" : "SIGN UP"}</button>
        </form>
        {isLogin && (
          <div>
            <h4>Or login with:</h4>
            <Google uiConfig={config} firebaseAuth={auth} />
          </div>
        )}
        <button onClick={() => setIsLogin(!isLogin)} id="account">
          {isLogin ? "Create Account" : "Login"}
        </button>
      </LoginForm>
      {modal && <Modal message={"Welcome !"} />}
    </div>
  );
}
