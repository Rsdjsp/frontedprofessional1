import React, { useEffect, useState } from "react";
import Link from "next/link";
import { database } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Si utlizamos esta función, estaremos usando SSR
// export async function getServerSideProps(){
//   const productosRequest = await fetch('http://localhost:3000/api/products')

//   const productos = await productosRequest.json()

//   return{
//     props:{
//       productos
//     }
//   }
// }

//Utilizamos esta función si queremos SSG (Static Site Generation)
export async function getStaticProps() {
  //Reto de mañana: Implementar la consulta a Firebase Aquí
  const col = collection(database, "products");
  const docs = await getDocs(col);

  const productos = [];

  docs.forEach((doc) => {
    productos.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      productos,
    },
    revalidate: 10,
  };
}

export default function Productos({ productos }) {
  // const [productos, setProductos] = useState([])

  //Client-side rendering
  // useEffect(() => {

  //   fetch('http://localhost:3000/api/products')
  //   .then(response=>response.json())
  //   .then(data=>{
  //     setProductos(data)
  //   })
  // }, [])

  return (
    <div>
      {console.log("Productos", productos)}
      {productos.map((producto) => {
        return (
          <article key={producto.id}>
            <Link href={"/productos/" + producto.id} passHref>
              <h2>{producto.name}</h2>
            </Link>
            <p>{producto.description}</p>
          </article>
        );
      })}
    </div>
  );
}
