import React from "react";
import styled from "styled-components";

const ModalComponent = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 30;
  background: linear-gradient(to right, #38373764 50%, #3d3d3d81 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 50%;
    height: 50%;
    background-color: #ffffff;
    border: 2px solid #a6a6a6;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > h3 {
      color: #e4563c;
      font-size: 48px;
    }
  }
`;

export default function Modal({ message }) {
  return (
    <ModalComponent>
      <div>
        <h3>{message}</h3>
      </div>
    </ModalComponent>
  );
}
