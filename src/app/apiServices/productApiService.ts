import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { AllProductsSearchObj, ProductSearchObj } from "../../types/others";
import { Product } from "../../types/product";

class ProductApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getProducts(data: ProductSearchObj) {
    try {
      const url = "/products",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR ::: getBestProducts ${err.message}`);
      throw err;
    }
  }

  async getChosenProduct(product_id: string) {
    try {
      const url = `/products/${product_id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const product: Product = result.data.data;
      return product;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenProduct ${err.message}`);
      throw err;
    }
  }
  async getAllProducts(data: AllProductsSearchObj) {
    try {
      const url = "/productsall",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR ::: getBestProducts ${err.message}`);
      throw err;
    }
  }
}

export default ProductApiService;
