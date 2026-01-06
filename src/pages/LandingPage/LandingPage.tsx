import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../contexts/I18nContext";
import styles from "./LandingPage.module.css";
import ChatDemo from "../../components/ChatDemo/ChatDemo";

const LandingPage: React.FC = () => {
  const { t } = useI18n();
  const [animatedElements, setAnimatedElements] = useState<number[]>([]);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Анимация появления элементов при загрузке
    const timer1 = setTimeout(
      () => setAnimatedElements((prev) => [...prev, 1]),
      200,
    );
    const timer2 = setTimeout(
      () => setAnimatedElements((prev) => [...prev, 2]),
      400,
    );
    const timer3 = setTimeout(
      () => setAnimatedElements((prev) => [...prev, 3]),
      600,
    );
    const timer4 = setTimeout(
      () => setAnimatedElements((prev) => [...prev, 4]),
      800,
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const scrollToCtaButton = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation
    ctaButtonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div
          className={`${styles.heroContent} ${animatedElements.includes(1) ? styles.animateIn : ""}`}
        >
          <h1 className={styles.heroTitle}>
            <span className={styles.braveMonkey}>Brave Monkey</span>
            <br />
            <span className={styles.subtitle}>{t("landing.subtitle")}</span>
          </h1>
          <p className={styles.heroDescription}>{t("landing.description")}</p>
          <div className={styles.heroButtons}>
            <a
              href="#cta-button"
              onClick={scrollToCtaButton}
              className={styles.primaryButton}
            >
              {t("landing.getStarted")}
            </a>
          </div>
        </div>
        <div
          className={`${styles.heroImage} ${animatedElements.includes(2) ? styles.animateIn : ""}`}
        >
          <ChatDemo />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2
          className={`${styles.sectionTitle} ${animatedElements.includes(3) ? styles.animateIn : ""}`}
        >
          {t("landing.featuresTitle")}
        </h2>
        <div className={styles.featuresGrid}>
          <div
            className={`${styles.featureCard} ${animatedElements.includes(1) ? styles.animateIn : ""}`}
          >
            <div className={styles.featureIcon}>🎯</div>
            <h3 className={styles.featureTitle}>
              {t("landing.feature1Title")}
            </h3>
            <p className={styles.featureDescription}>
              {t("landing.feature1Desc")}
            </p>
          </div>
          <div
            className={`${styles.featureCard} ${animatedElements.includes(2) ? styles.animateIn : ""}`}
          >
            <div className={styles.featureIcon}>👁️</div>
            <h3 className={styles.featureTitle}>
              {t("landing.feature2Title")}
            </h3>
            <p className={styles.featureDescription}>
              {t("landing.feature2Desc")}
            </p>
          </div>
          <div
            className={`${styles.featureCard} ${animatedElements.includes(3) ? styles.animateIn : ""}`}
          >
            <div className={styles.featureIcon}>🤖</div>
            <h3 className={styles.featureTitle}>
              {t("landing.feature4Title")}
            </h3>
            <p className={styles.featureDescription}>
              {t("landing.feature4Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className={styles.uspSection}>
        <div
          className={`${styles.uspContent} ${animatedElements.includes(4) ? styles.animateIn : ""}`}
        >
          <h2 className={styles.uspTitle}>{t("landing.uspTitle")}</h2>
          <p className={styles.uspDescription}>{t("landing.uspDescription")}</p>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <span>{t("landing.benefit1")}</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <span>{t("landing.benefit2")}</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <span>{t("landing.benefit3")}</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>✅</span>
              <span>{t("landing.benefit4")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2
          className={`${styles.ctaTitle} ${animatedElements.includes(4) ? styles.animateIn : ""}`}
        >
          {t("landing.ctaTitle")}
        </h2>
        <p
          className={`${styles.ctaDescription} ${animatedElements.includes(4) ? styles.animateIn : ""}`}
        >
          {t("landing.ctaDescription")}
        </p>
        <Link
          to="/register"
          className={styles.ctaButton}
          ref={ctaButtonRef}
          id="cta-button"
        >
          {t("landing.getStarted")}
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
