import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // useEffect = lets us control when some code runs
  useEffect(() => {
    const getHomeData = async () => {
      const url = search ? `/api/products?search=${search}` : "/api/products";
      const response = await axios.get(url);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);
  // Dependency Array = lets us control when useEffect runs, [] = only run once

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
