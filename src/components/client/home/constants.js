import { WHATSAPP_NUMBER } from '../../../lib/servicesConfig';

export const getWhatsappHref = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
