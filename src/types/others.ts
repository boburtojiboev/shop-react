export interface SearchObj {
  page: number;
  limit: number;
  order: string;
}

export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  shop_mb_id?: string;
  product_collection?: string;
}

export interface AllProductsSearchObj {
  page: number;
  limit: number;
  order: string;
  product_size: any;
  product_collection?: string;
}

export interface CommentSearchObj {
  page: number;
  limit: number;
  comment_ref_id: string;
}

export interface CreateCommentObj {
  comment_ref_id: string;
  group_type: string;
  content: string;
}

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}
