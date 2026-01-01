import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  const { user, logout, updateEmail } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Проверка совпадения новых паролей
    if (newPassword !== confirmNewPassword) {
      setError(t('profile.passwordsNotMatch'));
      return;
    }

    // Проверка длины пароля
    if (newPassword.length < 6) {
      setError(t('profile.passwordLength'));
      return;
    }

    // Здесь будет логика смены пароля (обычно через API)
    // Для демонстрации просто покажем сообщение об успехе
    setSuccess(t('profile.passwordChanged'));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

    // Скрыть форму смены пароля через 3 секунды
    setTimeout(() => {
      setShowChangePassword(false);
      setSuccess('');
    }, 3000);
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError(t('profile.invalidEmailFormat'));
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
              <h2 className={styles.cardTitle}>{t('profile.accountInformation')}</h2>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t('profile.email')}</label>
                <div className={`${styles.formInput} ${styles.readOnlyInput}`}>
                  {user?.email}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t('profile.emailVerified')}</label>
                <div className={`${styles.formInput} ${styles.readOnlyInput}`}>
                  {user?.emailVerified ? t('profile.yes') : t('profile.no')}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t('profile.accountCreated')}</label>
                <div className={`${styles.formInput} ${styles.readOnlyInput}`}>
                  {user ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{t('profile.accountActions')}</h2>
              <div className={styles.formGroup}>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {showChangePassword ? t('profile.cancelChangePassword') : t('profile.changePassword')}
                </button>
              </div>

              <div className={styles.formGroup}>
                <button
                  onClick={() => setShowChangeEmail(!showChangeEmail)}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {showChangeEmail ? t('profile.cancelChangeEmail') : t('profile.changeEmail')}
                </button>
              </div>

              {showChangePassword && (
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{t('profile.changePassword')}</h3>
                  <form onSubmit={handleChangePassword}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>{t('profile.currentPassword')}</label>
                      <input
                        type="password"
                        className={styles.formInput}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>{t('profile.newPassword')}</label>
                      <input
                        type="password"
                        className={styles.formInput}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>{t('profile.confirmNewPassword')}</label>
                      <input
                        type="password"
                        className={styles.formInput}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    {error && <div className={styles.formError}>{error}</div>}
                    {success && <div className={styles.formSuccess}>{success}</div>}

                    <div className={styles.formGroup}>
                      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                        {t('profile.updatePassword')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {showChangeEmail && (
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>{t('profile.changeEmail')}</h3>
                  <form onSubmit={handleChangeEmail}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>{t('profile.newEmail')}</label>
                      <input
                        type="email"
                        className={styles.formInput}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                        placeholder={user?.email}
                      />
                    </div>

                    {error && <div className={styles.formError}>{error}</div>}
                    {success && <div className={styles.formSuccess}>{success}</div>}

                    <div className={styles.formGroup}>
                      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                        {t('profile.updateEmail')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className={styles.formGroup}>
                <button onClick={handleLogout} className={`${styles.btn} ${styles.btnDanger || styles['btn-danger']}`}>
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