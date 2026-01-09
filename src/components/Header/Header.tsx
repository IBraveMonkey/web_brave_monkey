import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useI18n } from "../../contexts/I18nContext";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useI18n();

  // Функция для проверки активной ссылки
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.navLeft}>
        {user ? (
          <Link to="/dashboard" className={styles.navBrand}>
            <img src="/favicon.ico" alt="Logo" className={styles.logo} /> Brave
            Monkey
          </Link>
        ) : (
          <Link to="/" className={styles.navBrand}>
            <img src="/favicon.ico" alt="Logo" className={styles.logo} /> Brave
            Monkey
          </Link>
        )}
      </div>
      <div className={styles.navCenter}>
        <nav className={styles.navLinks}>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`${styles.navLink} ${isActive("/dashboard") ? styles.active : ""}`}
              >
                {t("navigation.dashboard")}
              </Link>
              <Link
                to="/chats"
                className={`${styles.navLink} ${isActive("/chats") ? styles.active : ""}`}
              >
                {t("navigation.chats")}
              </Link>
              <Link
                to="/api-status"
                className={`${styles.navLink} ${isActive("/api-status") ? styles.active : ""}`}
              >
                {t("navigation.apiStatus")}
              </Link>
              <Link
                to="/download"
                className={`${styles.navLink} ${isActive("/download") ? styles.active : ""}`}
              >
                {t("navigation.download")}
              </Link>
              <Link
                to="/faq"
                className={`${styles.navLink} ${isActive("/faq") ? styles.active : ""}`}
              >
                {t("navigation.faq")}
              </Link>
            </>
          ) : (
            <>
              {location.pathname !== "/" && (
                <>
                  <Link
                    to="/login"
                    className={`${styles.navLink} ${isActive("/login") ? styles.active : ""}`}
                  >
                    {t("auth.login")}
                  </Link>
                  <Link
                    to="/register"
                    className={`${styles.navLink} ${isActive("/register") ? styles.active : ""}`}
                  >
                    {t("auth.register")}
                  </Link>
                </>
              )}
              <Link
                to="/faq"
                className={`${styles.navLink} ${isActive("/faq") ? styles.active : ""}`}
              >
                {t("navigation.faq")}
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className={styles.navRight}>
        <ThemeSwitcher />
        <LanguageSwitcher />
        {user && (
          <Link
            to="/profile"
            className={`${styles.profileLink} ${isActive("/profile") ? styles.active : ""}`}
            title={t("navigation.profile")}
          >
            <span role="img" aria-label="profile">
              👤
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
