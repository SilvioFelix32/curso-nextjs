import type { GetServerSideProps } from "next";
import api from "../../services/api";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

const HomeSSR = ({ recommendedProducts }: HomeProps) => {
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

export default HomeSSR;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await api.get("/recommended");
  const recommendedProducts = await response.data;

  return {
    props: { recommendedProducts },
  };
};
