import { useRouter } from "next/router";
import React from "react";

// export function getServerSideProps(context) {
//   const { id } = context.params;

//   return {
//     props: {
//       id,
//     },
//   };
// }

export async function getStaticPaths() {
  const productosRequest = await fetch("http://localhost:3000/api/products");
  const productos = await productosRequest.json();

  const paths = productos.map((producto) => ({ params: { id: producto.id } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      producto: {
        id: params.id,
        name: "Producto de ejemplo",
      },
    },
  };
}

export default function Product({ producto}) {
  // const router = useRouter();
  // const id = router.query.id;
  return <div>{producto?.id}</div>;
}
