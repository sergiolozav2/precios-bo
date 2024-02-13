import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { languageKey } from "../hooks/useLanguageStorage";

const storedLanguage = localStorage.getItem(languageKey);
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: storedLanguage ?? "es",
    fallbackLng: "es",
    debug: true,
  });
