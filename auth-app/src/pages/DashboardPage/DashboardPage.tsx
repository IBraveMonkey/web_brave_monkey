import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();

  // Mock statistics data
  const stats = [
    { label: t('dashboard.totalChats'), value: '12' },
    { label: t('dashboard.messagesSent'), value: '142' },
    { label: t('dashboard.activeSessions'), value: '1' },
    { label: t('dashboard.accountAge'), value: '3 days' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t('dashboard.welcome')}, {user?.email}!</h2>
          <p>{t('dashboard.personalDashboard')}</p>
        </div>

        <div className={styles.dashboardStats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;