import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';

const resources = { en: { translation: en } };

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false,
  });
} else {
  i18n.addResources('en', 'translation', en);
}

export default i18n;
