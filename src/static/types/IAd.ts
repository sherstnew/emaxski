export interface IAd {
  _id: string;
  author_platform: string;
  author_platform_id: number;
  author_link: string;
  author_platform_name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  published: boolean;
  checked: boolean;
  added_time: string;
  buying: boolean;
  verified: boolean;
}