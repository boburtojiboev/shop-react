import { MeLiked } from "./product";

export interface Event{
  _id: string;
  event_name: string;
  event_time: string;
  event_status: string;
  event_address: string;
  event_description: string;
  event_phone: number;
  event_images: string[];
  event_likes: number;
  event_views: number;
  event_comment: number;
  shop_mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  me_liked: MeLiked[]; // Meliked
}