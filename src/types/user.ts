import { MeFollowed } from "./follow";
import { MeLiked } from "./product";

export interface Shop {
  _id: string;
  mb_nick: string;
  mb_phone: number;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_address: string;
  mb_description: string;
  mb_image: string;
  mb_point: number;
  mb_top: string;
  mb_views: number;
  mb_likes: number;
  mb_follow_cnt: number;
  mb_subscriber_cnt: number;
  createdAt: Date;
  me_liked: MeLiked[]; // Meliked
}
export interface Member {
  _id: string;
  mb_nick: string;
  mb_phone: number;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_address?: string;
  mb_description?: string;
  mb_image?: string;
  mb_point?: number;
  mb_top?: string;
  mb_views: number;
  mb_likes: number;
  mb_follow_cnt: number;
  mb_subscriber_cnt: number;
  createdAt: Date;
  me_liked: MeLiked[]; // Meliked
  me_followed: MeFollowed[]; // Mefollowed
}
export interface MemberUpdateData {
  mb_nick?: string | null;
  mb_phone?: string | null;
  mb_address?: string | null;
  mb_description?: string | null;
  mb_image?: string | null;
}