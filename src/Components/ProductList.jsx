import { useEffect, useState } from "react";
import classes from "./ProductList.module.css";
import ProductRender from "./ProductRender";

const ProductList = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [errors, setErrors] = useState(null);

  const getProducts = async () => {
    try {
      const resp = await fetch(
        "https://acciojob-module-7-sept-2022-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );
      if (!resp.ok) {
        throw new Error("Something went wrong!");
      }
      const modifiedResponse = await resp.json();
      const pdtInfo = [];
      for (const key in modifiedResponse) {
        console.log(modifiedResponse[key]);
        pdtInfo.push(modifiedResponse[key]);
      }
      setProductInfo(pdtInfo);
    } catch (err) {
      setErrors(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={classes.productList}>
      <h1 className={classes.heading}>Products</h1>
      <div className={classes.pdtList}>
        {errors && <p>{errors}</p>}
        {productInfo.map((val) => (
          <ProductRender key={val.id} src={val.productImage} newPrice={val.newPrice} oldPrice={val.oldPrice} productName={val.productName} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;