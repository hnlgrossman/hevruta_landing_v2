import itemsData from '../data/items.json';

export interface Item {
  id: number;
  name: string;
  description: string;
  productImageUrl: string;
  brandImageUrl: string;
  price: number;
  marketPrice: number;
  category: string;
}

export function getAllItems(): Item[] {
  return itemsData;
}

export function getItemById(id: number): Item | undefined {
  return itemsData.find(item => item.id === id);
}

export function getItemsByCategory(category: string): Item[] {
  return itemsData.filter(item => item.category === category);
} 