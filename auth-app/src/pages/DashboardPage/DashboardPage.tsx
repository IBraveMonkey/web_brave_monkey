import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import styles from './DashboardPage.module.css';
import { apiClient } from '../../api/apiClient';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const [statsData, setStatsData] = React.useState<{
    totalChats: number;
    totalMessages: number;
  } | null>(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get<{
          totalChats: number;
          totalMessages: number;
        }>('/chats/stats');
        if (response.success && response.data) {
          setStatsData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };
    fetchStats();
  }, []);

  const getAccountAge = () => {
    if (!user?.createdAt) return '...';
    const created = new Date(user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Simple localization for "days"
    const isRu = t('chats.chats') === 'Чаты';
    if (diffDays === 1) return `1 ${isRu ? 'день' : 'day'}`;
    return `${diffDays} ${isRu ? 'дней' : 'days'}`;
  };

  // Real statistics data
  const stats = [
    { label: t('dashboard.totalChats'), value: statsData?.totalChats ?? '...' },
    {
      label: t('dashboard.messagesSent'),
      value: statsData?.totalMessages ?? '...',
    },
    {
      label: t('dashboard.activeSessions'),
      value: statsData?.totalChats ? '1' : '0',
    },
    { label: t('dashboard.accountAge'), value: getAccountAge() },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {t('dashboard.welcome')}, {user?.email}!
          </h2>
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
