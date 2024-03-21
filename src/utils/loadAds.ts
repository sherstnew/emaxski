import { IAd } from '@/static/types/IAd';

export const loadAds = async (category: string | null, offset: number): Promise<IAd[]> => {
  try {
    const data = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pweb/ads?limit=25&offset=${offset}${category ? `&category=${category}` : ''}`)).json();
    if (data) {
      if (!data.detail) return data
      else return [];
    } else {
      return [];
    };
  } catch (error) {
    console.log(error);
    return [];
  }
};