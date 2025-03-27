import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              {t('footer.privacy')}
            </a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              {t('footer.terms')}
            </a>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {t('footer.credits')}{' '}
            <a 
              href="https://www.yan-holtz.com" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Yan Holtz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}