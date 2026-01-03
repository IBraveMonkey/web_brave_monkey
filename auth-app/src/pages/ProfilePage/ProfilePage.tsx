import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import { validatePasswordChange, validateEmail } from '../../utils/validation';
import styles from './ProfilePage.module.css';
import { apiClient } from '../../api/apiClient';

const ProfilePage: React.FC = () => {
  const { user, logout, updateEmail } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация полей
    const validation = validatePasswordChange(
      currentPassword,
      newPassword,
      confirmNewPassword
    );

    if (!validation.isFormValid) {
      if (validation.currentPassword.errorKey) {
        setError(t(validation.currentPassword.errorKey));
      } else if (validation.newPassword.errorKey) {
        setError(t(validation.newPassword.errorKey));
      } else if (validation.confirmNewPassword.errorKey) {
        setError(t(validation.confirmNewPassword.errorKey));
      }
      return;
    }

    // Вызов API смены пароля
    try {
      await apiClient.put('/auth/password', {
        current_password: currentPassword,
        new_password: newPassword,
      });

      setSuccess(t('profile.passwordChanged'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      // Скрыть форму смены пароля через 3 секунды
      setTimeout(() => {
        setShowChangePassword(false);
        setSuccess('');
      }, 3000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : t('profile.passwordChangeFailed');
      setError(errorMessage);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация email
    const emailValidation = validateEmail(newEmail);

    if (!emailValidation.isValid) {
      setError(
        emailValidation.errorKey
          ? t(emailValidation.errorKey)
          : t('profile.invalidEmailFormat')
      );
      return;
    }

    // Проверка, что новый email отличается от текущего
    if (newEmail === user?.email) {
      setError(t('profile.emailNotChanged'));
      return;
    }

    try {
      const success = await updateEmail(newEmail);
      if (success) {
        setSuccess(t('profile.emailChanged'));
        setNewEmail('');
        // Сбросим форму через 3 секунды
        setTimeout(() => {
          setShowChangeEmail(false);
          setSuccess('');
        }, 3000);
      } else {
        setError(t('profile.emailChangeFailed'));
      }
    } catch (err) {
      setError(t('profile.emailChangeFailed'));
    }
  };

  return (
    <div className={styles.container}>
      <h1>{t('profile.profile')}</h1>
      <div className={styles.pageContent}>
        <div className={styles.profileLayout}>
          <div className={styles.infoSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t('profile.accountInformation')}
              </h2>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t('profile.email')}</label>
                <div className={`${styles.formInput} ${styles.readOnlyInput}`}>
                  {user?.email}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('profile.emailVerified')}
                </label>
                <div className={`${styles.formInput} ${styles.readOnlyInput}`}>
                  {user?.emailVerified ? t('profile.yes') : t('profile.no')}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('profile.accountCreated')}
                </label>
                <div className={`${styles.formInput} ${styles.readOnlyInput}`}>
                  {user ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t('profile.accountActions')}
              </h2>
              <div className={styles.formGroup}>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {showChangePassword
                    ? t('profile.cancelChangePassword')
                    : t('profile.changePassword')}
                </button>
              </div>

              <div className={styles.formGroup}>
                <button
                  onClick={() => setShowChangeEmail(!showChangeEmail)}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {showChangeEmail
                    ? t('profile.cancelChangeEmail')
                    : t('profile.changeEmail')}
                </button>
              </div>

              {showChangePassword && (
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    {t('profile.changePassword')}
                  </h3>
                  <form onSubmit={handleChangePassword}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        {t('profile.currentPassword')}
                      </label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          className={`${styles.formInput} ${currentPasswordError ? styles.formInputError : ''}`}
                          value={currentPassword}
                          onChange={e => {
                            setCurrentPassword(e.target.value);
                            // Валидация в реальном времени
                            const validation = validatePasswordChange(
                              e.target.value,
                              newPassword,
                              confirmNewPassword
                            );
                            setCurrentPasswordError(
                              validation.currentPassword.errorKey
                                ? t(validation.currentPassword.errorKey)
                                : ''
                            );
                          }}
                          required
                        />
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          aria-label={
                            showCurrentPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {currentPasswordError && (
                        <div className={styles.formError}>
                          {currentPasswordError}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        {t('profile.newPassword')}
                      </label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          className={`${styles.formInput} ${newPasswordError ? styles.formInputError : ''}`}
                          value={newPassword}
                          onChange={e => {
                            setNewPassword(e.target.value);
                            // Валидация в реальном времени
                            const validation = validatePasswordChange(
                              currentPassword,
                              e.target.value,
                              confirmNewPassword
                            );
                            setNewPasswordError(
                              validation.newPassword.errorKey
                                ? t(validation.newPassword.errorKey)
                                : ''
                            );
                          }}
                          required
                        />
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          aria-label={
                            showNewPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showNewPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {newPasswordError && (
                        <div className={styles.formError}>
                          {newPasswordError}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        {t('profile.confirmNewPassword')}
                      </label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          className={`${styles.formInput} ${confirmNewPasswordError ? styles.formInputError : ''}`}
                          value={confirmNewPassword}
                          onChange={e => {
                            setConfirmNewPassword(e.target.value);
                            // Валидация в реальном времени
                            const validation = validatePasswordChange(
                              currentPassword,
                              newPassword,
                              e.target.value
                            );
                            setConfirmNewPasswordError(
                              validation.confirmNewPassword.errorKey
                                ? t(validation.confirmNewPassword.errorKey)
                                : ''
                            );
                          }}
                          required
                        />
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                          aria-label={
                            showConfirmNewPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showConfirmNewPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {confirmNewPasswordError && (
                        <div className={styles.formError}>
                          {confirmNewPasswordError}
                        </div>
                      )}
                    </div>

                    {error && <div className={styles.formError}>{error}</div>}
                    {success && (
                      <div className={styles.formSuccess}>{success}</div>
                    )}

                    <div className={styles.formGroup}>
                      <button
                        type="submit"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                      >
                        {t('profile.updatePassword')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {showChangeEmail && (
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    {t('profile.changeEmail')}
                  </h3>
                  <form onSubmit={handleChangeEmail}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        {t('profile.newEmail')}
                      </label>
                      <input
                        type="email"
                        className={`${styles.formInput} ${newEmailError ? styles.formInputError : ''}`}
                        value={newEmail}
                        onChange={e => {
                          setNewEmail(e.target.value);
                          // Валидация в реальном времени
                          const emailValidation = validateEmail(e.target.value);
                          setNewEmailError(
                            emailValidation.errorKey
                              ? t(emailValidation.errorKey)
                              : ''
                          );
                        }}
                        required
                        placeholder={user?.email}
                      />
                      {newEmailError && (
                        <div className={styles.formError}>{newEmailError}</div>
                      )}
                    </div>

                    {error && <div className={styles.formError}>{error}</div>}
                    {success && (
                      <div className={styles.formSuccess}>{success}</div>
                    )}

                    <div className={styles.formGroup}>
                      <button
                        type="submit"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                      >
                        {t('profile.updateEmail')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className={styles.formGroup}>
                <button
                  onClick={handleLogout}
                  className={`${styles.btn} ${styles.btnDanger || styles['btn-danger']}`}
                >
                  {t('profile.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
