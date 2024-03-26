export interface Member_data {
  createdAt: string;
  mb_email: string;
  mb_image?: string;
  mb_follow_cnt: number;
  mb_nick: string;
  mb_password: string;
  mb_point: number;
  mb_status: string;
  mb_subscriber_cnt: number;
  mb_type: string;
  updatedAt: Date;
  _id: string;
}

export interface Comment {
  _id: string;
  mb_id: string;
  member_data?: Member_data;
  comment_ref_id: string;
  comment_group: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
