import React, { useEffect, useState } from "react";

// Si utlizamos esta función, estaremos usando SSR
export async function getServerSideProps() {
  const productosRequest = await fetch("http://localhost:3000/api/products");

  const productos = await productosRequest.json();

  return {
    props: {
      productos,
    },
  };
}

export default function Productos({productos}) {
  
  return (
    <div>
      {productos.map((producto) => {
        return (
          <article key={producto.id}>
            <h2>{producto.name}</h2>
            <p>{producto.description}</p>
          </article>
        );
      })}
    </div>
  );
}
