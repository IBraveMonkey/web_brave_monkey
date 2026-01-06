import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeSwitcher}
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {theme === "dark" ? (
        <span className={styles.icon} role="img" aria-label="sun">
          ☀️
        </span>
      ) : (
        <span className={styles.icon} role="img" aria-label="moon">
          🌙
        </span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
