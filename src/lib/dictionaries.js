import enTranslations from '../locale/en.json';
import ptTranslations from '../locale/pt.json';

export function getDictionary(language) {
  return (language === 'en' ? enTranslations : ptTranslations).translation;
}
