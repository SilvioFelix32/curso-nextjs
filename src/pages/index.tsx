import type { NextPage } from "next";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

const Home: NextPage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    []
  );

  useEffect(() => {
    api.get("/recommended").then((response: any) => {
      return setRecommendedProducts(response.data);
    });
  }, []);

  return (
    <div>
      <Title>Hello World!</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Home;
