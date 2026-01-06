import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useI18n } from "../../contexts/I18nContext";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import { apiClient } from "../../api/apiClient";
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validToken, setValidToken] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { t } = useI18n();

  // Проверим токен при загрузке страницы
  useEffect(() => {
    if (!token) {
      setValidToken(false);
      setError(t("auth.invalidResetToken"));
      return;
    }

    // В реальном приложении здесь будет проверка токена на сервере
    // Для упрощения в этом примере просто проверим формат токена
    if (token.length < 10) {
      setValidToken(false);
      setError(t("auth.invalidResetToken"));
    }
  }, [token, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Валидация полей
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassword,
    );

    setPasswordError(
      passwordValidation.errorKey ? t(passwordValidation.errorKey) : "",
    );
    setConfirmPasswordError(
      confirmPasswordValidation.errorKey
        ? t(confirmPasswordValidation.errorKey)
        : "",
    );

    if (!passwordValidation.isValid || !confirmPasswordValidation.isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (response.success) {
        setMessage(t("auth.passwordResetSuccess"));
        // Перенаправим пользователя на страницу логина после успешного сброса
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(response.error || t("auth.passwordResetFailed"));
      }
    } catch (err) {
      setError(t("auth.passwordResetFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>{t("auth.invalidTokenTitle")}</h1>
        <div className={styles.formError}>{error}</div>
        <div
          className={styles.formGroup}
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <p>
            <Link to="/login" className={styles.formLink}>
              {t("auth.backToLogin")}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t("auth.resetPassword")}</h1>
      <p className={styles.formSubtitle}>{t("auth.resetPasswordSubtitle")}</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            {t("auth.newPassword")}
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`${styles.formInput} ${passwordError ? styles.formInputError : ""}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // Валидация в реальном времени
                const validation = validatePassword(e.target.value);
                setPasswordError(
                  validation.errorKey ? t(validation.errorKey) : "",
                );
              }}
              required
              disabled={loading}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {passwordError && (
            <div className={styles.formError}>{passwordError}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.formLabel}>
            {t("auth.confirmNewPassword")}
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`${styles.formInput} ${confirmPasswordError ? styles.formInputError : ""}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // Валидация в реальном времени
                const validation = validateConfirmPassword(
                  password,
                  e.target.value,
                );
                setConfirmPasswordError(
                  validation.errorKey ? t(validation.errorKey) : "",
                );
              }}
              required
              disabled={loading}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              disabled={loading}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {confirmPasswordError && (
            <div className={styles.formError}>{confirmPasswordError}</div>
          )}
        </div>

        {error && <div className={styles.formError}>{error}</div>}
        {message && <div className={styles.formSuccess}>{message}</div>}

        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? t("auth.resetting") : t("auth.resetPasswordButton")}
        </button>
      </form>

      <div
        className={styles.formGroup}
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <p>
          <Link to="/login" className={styles.formLink}>
            {t("auth.backToLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
