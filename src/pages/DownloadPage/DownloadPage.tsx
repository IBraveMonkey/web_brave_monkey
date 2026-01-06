import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import styles from "./DownloadPage.module.css";

const DownloadPage: React.FC = () => {
  const { t } = useI18n();

  const handleDownload = (platform: "macOs" | "win") => {
    // Скачиваем ZIP архив папки целиком
    const filePath = `/${platform}.zip`;
    const link = document.createElement("a");
    link.href = filePath;
    link.download = `${platform}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{t("download.subtitle")}</h1>
      <div className={styles.versionContainer}>
        <span className={styles.versionText}>1.0.0 🍎 🪟</span>
      </div>

      <div className={styles.downloadGrid}>
        <div className={styles.downloadCard}>
          <div className={styles.platformHeader}>
            <div className={styles.platformIcon}>
              <span role="img" aria-label="apple">
                🍎
              </span>
            </div>
            <div className={styles.platformInfo}>
              <h2 className={styles.platformTitle}>{t("download.macos")}</h2>
              <p className={styles.platformRequirements}>
                {t("download.macosRequirements")}
              </p>
            </div>
          </div>
          <button
            className={styles.downloadButton}
            onClick={() => handleDownload("macOs")}
          >
            {t("download.downloadButton")}
          </button>
        </div>

        <div className={styles.downloadCard}>
          <div className={styles.platformHeader}>
            <div className={styles.platformIcon}>
              <span role="img" aria-label="windows">
                🪟
              </span>
            </div>
            <div className={styles.platformInfo}>
              <h2 className={styles.platformTitle}>{t("download.windows")}</h2>
              <p className={styles.platformRequirements}>
                {t("download.windowsRequirements")}
              </p>
            </div>
          </div>
          <button
            className={styles.downloadButton}
            onClick={() => handleDownload("win")}
          >
            {t("download.downloadButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
