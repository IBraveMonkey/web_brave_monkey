import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import styles from './VerifyEmailPage.module.css';

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const { t } = useI18n();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const success = await verifyEmail(code);
    if (success) {
      setMessage(t('profile.emailVerifiedSuccess'));
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setError(t('profile.invalidCode'));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t('auth.verifyEmail')}</h1>
      <p className={styles.formDescription}>{t('auth.enterSixDigitCode')}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="code" className={styles.formLabel}>
            {t('auth.verificationCode')}
          </label>
          <input
            id="code"
            type="text"
            className={styles.formInput}
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            required
            maxLength={6}
            minLength={6}
          />
        </div>
        {error && <div className={styles.formError}>{error}</div>}
        {message && <div className={styles.formSuccess}>{message}</div>}
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          {t('auth.verifyEmailButton')}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
