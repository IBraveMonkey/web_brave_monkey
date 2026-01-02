import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { validateLogin } from '../../utils/validation';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация полей
    const validation = validateLogin(email, password);

    setEmailError(validation.email.errorKey ? t(validation.email.errorKey) : '');
    setPasswordError(validation.password.errorKey ? t(validation.password.errorKey) : '');

    if (!validation.isFormValid) {
      return;
    }

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
            className={`${styles.formInput} ${emailError ? styles.formInputError : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Валидация в реальном времени
              const validation = validateLogin(e.target.value, password);
              setEmailError(validation.email.errorKey ? t(validation.email.errorKey) : '');
            }}
            required
          />
          {emailError && <div className={styles.formError}>{emailError}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>{t('auth.password')}</label>
          <div className={styles.passwordInputContainer}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`${styles.formInput} ${passwordError ? styles.formInputError : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // Валидация в реальном времени
                const validation = validateLogin(email, e.target.value);
                setPasswordError(validation.password.errorKey ? t(validation.password.errorKey) : '');
              }}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {passwordError && <div className={styles.formError}>{passwordError}</div>}
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