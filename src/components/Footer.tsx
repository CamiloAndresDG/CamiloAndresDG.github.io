import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const theme = 'dark';
  const currentLanguage = 'en';

  const toggleTheme = () => {
    // Implementation of toggleTheme function
  };

  const toggleLanguage = () => {
    // Implementation of toggleLanguage function
  };

  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label={theme === 'dark' ? t('footer.theme.light') : t('footer.theme.dark')}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {currentLanguage === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {t('footer.credits')} Yan Holtz
          </div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}