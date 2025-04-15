import {Item} from './items';

export function getWhatsappCtaLink(item: Item | null = null, text: string = '') {
  let whatsappCtaLink = "https://wa.me/972503876311?text=";
  if (item) {
    whatsappCtaLink += encodeURIComponent(`היי חברותא 👋🏼\nאני רוצה להצטרף לקבוצת רכישה ל${item.description}`);
  } else if (text) {
    whatsappCtaLink += encodeURIComponent(`היי חברותא 👋🏼\n${text}`);
  } else {
    whatsappCtaLink += encodeURIComponent(`היי חברותא 👋🏼\nאני רוצה להצטרף לקבוצת רכישה למוצרים שלך`);
  }
  return whatsappCtaLink;
}