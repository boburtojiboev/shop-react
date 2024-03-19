import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { SearchObj } from "../../types/others";
import { Event } from "../../types/event";

class EventApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getEvents(data: SearchObj) {
    try {
      const url = "/events",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      console.log("state:", result.data.satate);
      const events: Event[] = result.data.data;
      return events;
    } catch (err: any) {
      console.log(`ERROR ::: getEvents ${err.message}`);
      throw err;
    }
  }
}

export default EventApiService;
