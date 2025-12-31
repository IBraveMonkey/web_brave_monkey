import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import styles from './APIsProviderStatus.module.css';

const APIsProviderStatus: React.FC = () => {
  const { t } = useI18n();

  // Моковые данные о статусе провайдеров
  const providers = [
    {
      category: t('apiStatus.llmServices'),
      providers: [
        { name: 'Google Gemini', status: 'active', icon: 'gemini' },
        { name: 'OpenRouter', status: 'inactive', icon: 'openrouter' },
        { name: 'Hugging Face', status: 'active', icon: 'huggingface' },
        { name: 'ModelScope', status: 'active', icon: 'modelscope' }
      ]
    },
    {
      category: t('apiStatus.inferenceServices'),
      providers: [
        { name: 'Groq Cloud', status: 'active', icon: 'groq' }
      ]
    },
    {
      category: t('apiStatus.audioServices'),
      providers: [
        { name: 'Deepgram', status: 'inactive', icon: 'deepgram' },
        { name: 'AssemblyAI', status: 'active', icon: 'assemblyai' }
      ]
    }
  ];

  // Функция для отображения иконки провайдера
  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case 'gemini':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
        );
      case 'openrouter':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 2v7M12 15v7M2 12h7M15 12h7M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"></path>
            </svg>
          </div>
        );
      case 'huggingface':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
            </svg>
          </div>
        );
      case 'modelscope':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4v16h16V4H4zm8 8l-4 4V8l4 4zm0 0l4-4v8l-4-4z"></path>
            </svg>
          </div>
        );
      case 'groq':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        );
      case 'deepgram':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 10v3M6 4v11M10 8v8M14 7v10M18 5v13M22 10v3"></path>
            </svg>
          </div>
        );
      case 'assemblyai':
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className={styles.serviceIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{t('apiStatus.apisProviderStatus')}</h1>
      <div className={styles.providersGrid}>
        {providers.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>
            <div className={styles.providersList}>
              {category.providers.map((provider, providerIndex) => (
                <div
                  key={providerIndex}
                  className={`${styles.providerCard} ${styles[provider.status]}`}
                >
                  <div className={styles.providerInfo}>
                    {renderIcon(provider.icon)}
                    <span className={styles.providerName}>{provider.name}</span>
                  </div>
                  <div className={`${styles.statusIndicator} ${styles[provider.status]}`}>
                    {provider.status === 'active' ? t('apiStatus.active') : t('apiStatus.inactive')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APIsProviderStatus;