import itemsData from '../data/items.json';

export interface Item {
  id: number;
  name: string;
  slug: string;
  description: string;
  modelNumber: string;
  productImageUrl: string;
  additionalImages?: string[];
  brandImageUrl: string;
  price: number;
  marketPrice: number;
  longDescription?: string;
  shortTitle: string;
  detailed_list?: string[];
}

export function getAllItems(): Item[] {
  return itemsData;
}

export function getItemById(id: string): Item | undefined {
  return itemsData.find(item => item.slug === id);
}