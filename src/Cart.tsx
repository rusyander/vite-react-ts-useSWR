import React from "react";
import useSWR from "swr";
import { IPoructs, fetcher } from "./App";

export default function Cart() {
  const { data, error, mutate } = useSWR<IPoructs[]>(
    "http://localhost:3004/cart",
    fetcher
    // { revalidateOnMount: false }
  );

  const deleteProduct = async (id: number) => {
    await mutate(
      fetcher("http://localhost:3004/cart/" + id, {
        method: "DELETE",
      })
    );
  };

  return (
    <div>
      {data && data.length > 0 ? (
        data?.map((item: IPoructs) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <button
              onClick={async () => {
                await deleteProduct(item.id);
                mutate(
                  data.filter((order: IPoructs) => order.id !== item.id),
                  {
                    revalidate: false,
                  }
                );
              }}
            >
              delete
            </button>
            <hr />
          </div>
        ))
      ) : (
        <h1>Корзина пуста</h1>
      )}
    </div>
  );
}
