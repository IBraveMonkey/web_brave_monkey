import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('profile.passwordsNotMatch'));
      return;
    }

    const success = await register({ email, password });
    if (success) {
      // Redirect to verification page after successful registration
      navigate('/verify-email');
    } else {
      setError(t('profile.registrationFailed'));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t('auth.register')}</h1>
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
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>{t('auth.password')}</label>
          <input
            id="password"
            type="password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.formLabel}>{t('auth.confirmPassword')}</label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.formInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className={styles.formError}>{error}</div>}
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>{t('auth.register')}</button>
      </form>
      <div className={styles.formGroup} style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>
          {t('auth.alreadyHaveAccount')} <Link to="/login" className={styles.formLink}>{t('auth.loginHere')}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;