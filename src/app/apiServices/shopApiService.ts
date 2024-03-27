import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Shop } from "../../types/user";
import { SearchObj } from "../../types/others";

class ShopApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTopShops() {
    try {
      const url = `/shops?order=mb_likes&page=1&limit=8`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      const top_shops: Shop[] = result.data.data;
      return top_shops;
    } catch (err: any) {
      console.log(`ERROR ::: getTopShops ${err.message}`);
      throw err;
    }
  }

  async getShops(data: SearchObj) {
    try {
      const url = `/shops?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const shops: Shop[] = result.data.data;
      return shops;
    } catch (err: any) {
      console.log(`ERROR ::: getShops ${err.message}`);
      throw err;
    }
  }

  async getChosenShop(id: string) {
    try {
      const url = `/shops/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const Shop: Shop = result.data.data;
      return Shop;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenShop ${err.message}`);
      throw err;
    }
  }
}

export default ShopApiService;
