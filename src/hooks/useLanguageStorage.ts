import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const languageKey = "language";
export function useLanguageStorage() {
  const { i18n } = useTranslation();

  const currentLanguage = useMemo(() => {
    const storedLanguage = localStorage.getItem(languageKey);
    const current = storedLanguage ?? i18n.language;
    return current;
  }, [i18n.language]);

  function setLanguage(language: string) {
    i18n.changeLanguage(language);
    localStorage.setItem(languageKey, language);
  }

  return { currentLanguage, setLanguage };
}
