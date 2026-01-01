import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import { apiClient } from '../../api/apiClient';
import styles from './ForgotPasswordPage.module.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      
      if (response.success) {
        setMessage(t('auth.passwordResetLinkSent'));
      } else {
        setError(response.error || t('auth.passwordResetFailed'));
      }
    } catch (err) {
      setError(t('auth.passwordResetFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t('auth.forgotPassword')}</h1>
      <p className={styles.formSubtitle}>{t('auth.forgotPasswordSubtitle')}</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>{t('auth.email')}</label>
          <input
            id="email"
            type="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {error && <div className={styles.formError}>{error}</div>}
        {message && <div className={styles.formSuccess}>{message}</div>}
        
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? t('auth.sending') : t('auth.sendResetLink')}
        </button>
      </form>
      
      <div className={styles.formGroup} style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>
          <Link to="/login" className={styles.formLink}>{t('auth.backToLogin')}</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;