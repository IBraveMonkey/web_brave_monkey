import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { validateRegistration } from '../../utils/validation';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация полей
    const validation = validateRegistration(email, password, confirmPassword);

    setEmailError(validation.email.errorKey ? t(validation.email.errorKey) : '');
    setPasswordError(validation.password.errorKey ? t(validation.password.errorKey) : '');
    setConfirmPasswordError(validation.confirmPassword.errorKey ? t(validation.confirmPassword.errorKey) : '');

    if (!validation.isFormValid) {
      return;
    }

    const success = await register({ email, password });
    if (success) {
      // Redirect to login page after successful registration (auto-verified)
      navigate('/login');
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
            className={`${styles.formInput} ${emailError ? styles.formInputError : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Валидация в реальном времени
              const validation = validateRegistration(e.target.value, password, confirmPassword);
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
                const validation = validateRegistration(email, e.target.value, confirmPassword);
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.formLabel}>{t('auth.confirmPassword')}</label>
          <div className={styles.passwordInputContainer}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`${styles.formInput} ${confirmPasswordError ? styles.formInputError : ''}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // Валидация в реальном времени
                const validation = validateRegistration(email, password, e.target.value);
                setConfirmPasswordError(validation.confirmPassword.errorKey ? t(validation.confirmPassword.errorKey) : '');
              }}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {confirmPasswordError && <div className={styles.formError}>{confirmPasswordError}</div>}
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