import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Shop } from "../../types/user";

class ShopApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTopShops() {
    try {
      const url = `/shops?order=mb_likes&page=1&limit=8`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);

      console.log("state:", result.data.state);
      const top_shops: Shop[] = result.data.data;
      return top_shops;
    } catch (err: any) {
      console.log(`ERROR ::: getTopShops ${err.message}`);
      throw err;
    }
  }
}

export default ShopApiService;
