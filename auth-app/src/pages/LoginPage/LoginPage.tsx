import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login({ email, password });
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('profile.invalidPassword'));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t('auth.login')}</h1>
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
        {error && <div className={styles.formError}>{error}</div>}
        <button type="submit" className={styles.btnPrimary}>{t('auth.login')}</button>
      </form>
      <div className={styles.formGroup} style={{ marginTop: '15px', textAlign: 'center' }}>
        <p>
          <Link to="/forgot-password" className={styles.formLink}>{t('auth.forgotPassword')}</Link>
        </p>
      </div>
      <div className={styles.formGroup} style={{ marginTop: '10px', textAlign: 'center' }}>
        <p>
          {t('auth.dontHaveAccount')} <Link to="/register" className={styles.formLink}>{t('auth.registerHere')}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;