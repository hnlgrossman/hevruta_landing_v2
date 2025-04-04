import {Item} from './items';

export function getWhatsappCtaLink(item: Item | null = null) {
  let whatsappCtaLink = "https://wa.me/972504428463?text=";
  if (item) {
    whatsappCtaLink += encodeURIComponent(`היי חברותא 👋🏼\nאני רוצה להצטרף לקבוצת רכישה ל${item.description}`);
  } else {
    whatsappCtaLink += encodeURIComponent(`היי חברותא 👋🏼\nאני רוצה להצטרף לקבוצת רכישה למוצרים שלך`);
  }
  return whatsappCtaLink;
}