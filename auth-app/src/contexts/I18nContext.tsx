import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// Import translations
import { en, ru } from '../i18n/translations';

// Define available languages
export type Language = 'en' | 'ru';

// Define context type
interface I18nContextType {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (lang: Language) => void;
}

// Create context with default values
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation function that handles nested keys
const translate = (
  key: string,
  translations: Record<string, unknown>
): string => {
  const keys = key.split('.');
  let result: unknown = translations;

  for (const k of keys) {
    if (
      result &&
      typeof result === 'object' &&
      (result as Record<string, unknown>)[k] !== undefined
    ) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key; // Return the key itself if translation is not found
    }
  }

  return result as string;
};

// I18n provider component
export const I18nProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Update translations when language changes
  const [translations, setTranslations] = useState(language === 'en' ? en : ru);

  useEffect(() => {
    // Update translations when language changes
    setTranslations(language === 'en' ? en : ru);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    t: (key: string) => translate(key, translations),
    changeLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Custom hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
