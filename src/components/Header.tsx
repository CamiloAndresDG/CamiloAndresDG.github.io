import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header() {
  const { t } = useTranslation();
  const theme = 'dark';
  const currentLanguage = 'en';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    // Implementation of toggleTheme function
  };

  const toggleLanguage = () => {
    // Implementation of toggleLanguage function
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {t('header.home')}
      </Link>
      <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {t('header.about')}
      </Link>
      <Link to="/experience" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {t('header.experience')}
      </Link>
      <Link to="/projects" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {t('header.projects')}
      </Link>
      <Link to="/interests" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {t('header.interests')}
      </Link>
      <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {t('header.contact')}
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/LogoPortafolio.svg"
                alt="Logo"
                className="h-8 w-auto dark:invert transition-all duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Theme and Language Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              aria-label={theme === 'dark' ? t('footer.theme.light') : t('footer.theme.dark')}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            >
              {currentLanguage === 'en' ? 'ES' : 'EN'}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg transition-all duration-200`}
        >
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <NavLinks />
          </nav>
        </div>
      </div>
    </header>
  );
} 