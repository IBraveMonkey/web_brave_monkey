import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../../contexts/I18nContext';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'ru', flag: '🇷🇺', name: 'RU' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'ru') => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Позиционирование выпадающего списка
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom,
        right: window.innerWidth - buttonRect.right
      });
    }
  }, [isOpen]);

  return (
    <div className={styles.languageSwitcher}>
      <button
        ref={buttonRef}
        className={styles.languageButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={styles.languageFlag}>{currentLanguage.flag}</span>
        <span className={styles.languageCode}>{currentLanguage.name}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}></span>
      </button>

      {isOpen && typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            className={styles.dropdown}
            style={{
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              position: 'fixed',
            }}
          >
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`${styles.dropdownItem} ${language === lang.code ? styles.active : ''}`}
                onClick={() => handleLanguageChange(lang.code as 'en' | 'ru')}
              >
                <span className={styles.languageFlag}>{lang.flag}</span>
                <span className={styles.languageCode}>{lang.name}</span>
              </div>
            ))}
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default LanguageSwitcher;