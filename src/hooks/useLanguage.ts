import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const languages = ['en', 'es', 'de', 'fr'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLang = languages[nextIndex];
    i18n.changeLanguage(newLang);
  };

  return { currentLanguage, toggleLanguage };
}