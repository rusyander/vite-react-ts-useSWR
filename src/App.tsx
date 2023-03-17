import { useEffect, useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Cart from "./Cart";

export interface IPoructs {
  id: number;
  title: string;
  price: number;
}

export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((res) => res.json());

function App() {
  const { data, error } = useSWR<IPoructs[]>(
    "http://localhost:3004/products",
    fetcher
  );
  const { mutate } = useSWRConfig();

  const addProductToCart = (id: number, title: string, price: number) => {
    const product = {
      id,
      title,
      price,
    };
    console.log("product", product);

    mutate(
      "http://localhost:3004/cart",
      fetcher("http://localhost:3004/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
    );
  };

  console.log(error);

  return (
    <div>
      <h1>asd</h1>
      {data?.map((item: IPoructs) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.price}</p>
          <button
            onClick={() => addProductToCart(item.id, item.title, item.price)}
          >
            add to cart
          </button>
          <hr />
        </div>
      ))}
      {/* ----------------- */}
      <hr />
      <hr />
      <h1>КОРЗИНА</h1>
      <Cart />
    </div>
  );
}

export default App;
