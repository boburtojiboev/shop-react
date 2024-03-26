import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Comment } from "../../types/comment";
import { CommentSearchObj, CreateCommentObj } from "../../types/others";

class CommentApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTargetComment(data: CommentSearchObj): Promise<Comment[]> {
    try {
      const url = "/comments",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);
      const targetComments: Comment[] = result.data.data;
      return targetComments;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetComment ${err.message}`);
      throw err;
    }
  }

  async createComment(data: CreateCommentObj): Promise<any> {
    try {
      const url = "/comment/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:::", result.data.state);

      return true;
    } catch (err: any) {
      console.log(`ERROR ::: createReviews ${err.message}`);
      throw err;
    }
  }
}

export default CommentApiService;
