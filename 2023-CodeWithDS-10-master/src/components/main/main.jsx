import styles from "./main.module.css";
import { Product } from "../products/product";
import { useEffect } from "react";
import { getMenus } from "../../Service/fetcher";

export const Main = ({ products, setProducts, convertPrice }) => {
  useEffect(() => {
    getMenus().then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);

  //최신순, 낮은 가격순, 높은 가격순
  const sortProduct = (type) => {
    const newProduct = [...products];
    if (type === "recent") {
      newProduct.sort((a, b) => a.id - b.id);
      setProducts(newProduct);
    } else if (type === "row") {
      newProduct.sort((a, b) => a.price - b.price);
      setProducts(newProduct);
    } else if (type === "high") {
      newProduct.sort((a, b) => b.price - a.price);
      setProducts(newProduct);
    }
  };
  return (
    <>
      <div className={styles.filter}>
        <p onClick={() => sortProduct("recent")}>최신순</p>
        <p onClick={() => sortProduct("row")}>낮은 가격</p>
        <p onClick={() => sortProduct("high")}>높은 가격</p>
      </div>
      <main className={styles.flex_wrap}>
        {products.map((product) => {
          return (
            <Product
              key={`key-${product.id}`}
              product={product}
              convertPrice={convertPrice}
            />
          );
        })}
      </main>
    </>
  );
};
//<EventBanner /> : 덕성 로고가 있는 사진 삭제 !
