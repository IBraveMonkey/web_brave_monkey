import React, { useEffect, useState } from "react";
import { useI18n } from "../../contexts/I18nContext";
import styles from "./APIsProviderStatus.module.css";

interface HealthStatus {
  status: string;
  inference: Record<string, string>;
  time: string;
}

const APIsProviderStatus: React.FC = () => {
  const { t } = useI18n();
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        // Health endpoint returns direct JSON, not wrapped in ApiResponse
        // We need to make a direct fetch call instead of using apiClient
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("/api/health", {
          method: "GET",
          headers,
        });

        if (response.ok) {
          const data: HealthStatus = await response.json();
          setHealthData(data);
        }
      } catch (err) {
        console.error("Health check failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const getStatus = (key: string) => {
    if (!healthData || !healthData.inference) return "inactive"; // Loading state or no data
    const status = healthData.inference[key];
    return status === "up" ? "active" : "inactive";
  };

  // Define structure locally
  const categories = [
    {
      category: t("apiStatus.coreInference"),
      providers: [
        { name: "Google Gemini", key: "gemini", icon: "gemini" },
        { name: "OpenRouter", key: "openrouter", icon: "openrouter" },
        { name: "Hugging Face", key: "huggingface", icon: "huggingface" },
        { name: "ModelScope", key: "modelscope", icon: "modelscope" },
        { name: "Groq Cloud (LLM)", key: "groq", icon: "groq" },
      ],
    },
    {
      category: t("apiStatus.audioServices"),
      providers: [
        { name: "Groq (STT)", key: "groq_stt", icon: "groq" },
        { name: "Deepgram", key: "deepgram", icon: "deepgram" },
        { name: "AssemblyAI", key: "assemblyai", icon: "assemblyai" },
      ],
    },
  ];

  // Функция для отображения иконки провайдера
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "gemini":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
        );
      case "openrouter":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 2v7M12 15v7M2 12h7M15 12h7M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"></path>
            </svg>
          </div>
        );
      case "huggingface":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>
            </svg>
          </div>
        );
      case "modelscope":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4v16h16V4H4zm8 8l-4 4V8l4 4zm0 0l4-4v8l-4-4z"></path>
            </svg>
          </div>
        );
      case "groq":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        );
      case "deepgram":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 10v3M6 4v11M10 8v8M14 7v10M18 5v13M22 10v3"></path>
            </svg>
          </div>
        );
      case "assemblyai":
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className={styles.serviceIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
      <h1 className={styles.pageTitle}>{t("apiStatus.apisProviderStatus")}</h1>
      <div className={styles.providersGrid}>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>
            <div className={styles.providersList}>
              {category.providers.map((provider, providerIndex) => (
                <div
                  key={providerIndex}
                  className={`${styles.providerCard} ${styles[getStatus(provider.key)]}`}
                >
                  <div className={styles.providerInfo}>
                    {renderIcon(provider.icon)}
                    <span className={styles.providerName}>{provider.name}</span>
                  </div>
                  <div
                    className={`${styles.statusIndicator} ${styles[getStatus(provider.key)]}`}
                  >
                    {getStatus(provider.key) === "active"
                      ? t("apiStatus.active")
                      : t("apiStatus.inactive")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <p style={{ textAlign: "center", marginTop: 10 }}>
          Refreshing status...
        </p>
      )}
    </div>
  );
};

export default APIsProviderStatus;
