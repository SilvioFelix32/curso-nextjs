import type { GetStaticProps } from "next";
import api from "../../services/api";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  products: IProduct[];
}

const HomeSSG = ({ products }: HomeProps) => {
  return (
    <div>
      <Title>Hello World!</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {products.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      </section>
    </div>
  );
};

export default HomeSSG;

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const response = await api.get("/products");
  const products = await response.data;

  return {
    props: { products },
    revalidate: 5, //page reload after 5seconds
  };
};
