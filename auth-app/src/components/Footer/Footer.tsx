import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Brave Monkey. {t("footer.loveCapuchins")}
      </p>
    </footer>
  );
};

export default Footer;
