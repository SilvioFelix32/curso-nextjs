import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import api from "../../../../services/api";
import { Title } from "../../../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

const Category = ({ products }: CategoryProps) => {
  const router = useRouter();

  if (router.isFallback) {
    <p>Loading ...</p>;
  }

  return (
    <div>
      <Title>{router.query.slug}</Title>

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

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get(`/categories`);
  const categories = await response.data;

  const paths = categories.map((category: IProduct) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true, //if true, when you add something new in your api, when the first user acces the page he will generate the new page or item
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context: any
) => {
  const { slug } = context.params;

  const response = await api.get(`/products?category_id=${slug}`);
  const products = await response.data;

  return {
    props: { products },
    revalidate: 60, //page reload after 60 seconds
  };
};
