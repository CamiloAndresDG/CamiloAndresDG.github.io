import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {t('footer.credits')} <a href="https://www.yan-holtz.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Yan Holtz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}