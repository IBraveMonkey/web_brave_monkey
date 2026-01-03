import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import DownloadDropdown from '../DownloadDropdown/DownloadDropdown';
import styles from '../Header/Header.module.css';

const PublicHeader: React.FC = () => {
  const location = useLocation();
  const { t } = useI18n();

  // Функция для проверки активной ссылки
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.navBrand}>
          <span role="img" aria-label="gorilla">
            🦍
          </span>{' '}
          Brave Monkey
        </Link>
      </div>
      <div className={styles.navCenter}>
        <nav className={styles.navLinks}>
          <DownloadDropdown />
        </nav>
      </div>
      <div className={styles.navRight}>
        <Link
          to="/login"
          className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
        >
          {t('auth.login')}
        </Link>
        <Link
          to="/register"
          className={`${styles.navLink} ${isActive('/register') ? styles.active : ''}`}
        >
          {t('auth.register')}
        </Link>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default PublicHeader;
