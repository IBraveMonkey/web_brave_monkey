import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import styles from './ChatsPage.module.css';

const ChatsPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <h1>{t('chats.chats')}</h1>
      <div className={styles.pageContent}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t('chats.chatHistory')}</h2>
          <p>{t('chats.historyWillAppear')}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;