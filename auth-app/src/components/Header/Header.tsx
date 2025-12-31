import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { t } = useI18n();

  // Функция для проверки активной ссылки
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.navLeft}>
        <Link to="/dashboard" className={styles.navBrand}>
          <span role="img" aria-label="gorilla">🦍</span> Brave Monkey
        </Link>
      </div>
      <div className={styles.navCenter}>
        <nav className={styles.navLinks}>
          <Link
            to="/dashboard"
            className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            {t('navigation.dashboard')}
          </Link>
          <Link
            to="/chats"
            className={`${styles.navLink} ${isActive('/chats') ? styles.active : ''}`}
          >
            {t('navigation.chats')}
          </Link>
          <Link
            to="/api-status"
            className={`${styles.navLink} ${isActive('/api-status') ? styles.active : ''}`}
          >
            {t('navigation.apiStatus')}
          </Link>
          <Link
            to="/profile"
            className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
          >
            {t('navigation.profile')}
          </Link>
        </nav>
      </div>
      <div className={styles.navRight}>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;