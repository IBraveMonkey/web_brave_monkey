import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import Dropdown from '../Dropdown/Dropdown';
import styles from './DownloadDropdown.module.css';

const DownloadDropdown: React.FC = () => {
  const { t } = useI18n();

  const handleDownload = (platform: 'macOs' | 'win') => {
    // Скачиваем ZIP архив папки целиком
    const filePath = `/${platform}.zip`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = `${platform}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dropdown title={t('download.title')}>
      <div className={styles.downloadCard}>
        <div className={styles.platformIcon}>
          <span role="img" aria-label="apple">
            🍎
          </span>
        </div>
        <div className={styles.platformInfo}>
          <h3 className={styles.platformTitle}>{t('download.macos')}</h3>
          <p className={styles.platformVersion}>{t('download.macosVersion')}</p>
          <p className={styles.platformRequirements}>
            {t('download.macosRequirements')}
          </p>
        </div>
        <button
          className={styles.downloadButton}
          onClick={() => handleDownload('macOs')}
        >
          {t('download.downloadButton')}
        </button>
      </div>
      <div className={styles.downloadCard}>
        <div className={styles.platformIcon}>
          <span role="img" aria-label="windows">
            🪟
          </span>
        </div>
        <div className={styles.platformInfo}>
          <h3 className={styles.platformTitle}>{t('download.windows')}</h3>
          <p className={styles.platformVersion}>
            {t('download.windowsVersion')}
          </p>
          <p className={styles.platformRequirements}>
            {t('download.windowsRequirements')}
          </p>
        </div>
        <button
          className={styles.downloadButton}
          onClick={() => handleDownload('win')}
        >
          {t('download.downloadButton')}
        </button>
      </div>
    </Dropdown>
  );
};

export default DownloadDropdown;
