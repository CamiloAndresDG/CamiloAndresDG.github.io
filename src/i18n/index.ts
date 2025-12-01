import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './en';
import esTranslations from './es';
import deTranslations from './de';
import frTranslations from './fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      },
      de: {
        translation: deTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;