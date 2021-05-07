import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // path where resources get loaded from

      loadPath:
        process.env.NODE_ENV === "development"
          ? "/locales/{{lng}}/{{ns}}.json"
          : process.env.NODE_ENV === "production" &&
            "./locales/{{lng}}/{{ns}}.json",
      // path to post missing resources
      addPath:
        process.env.NODE_ENV === "development"
          ? "/locales/{{lng}}/{{ns}}.missing.json"
          : process.env.NODE_ENV === "production" &&
            "./locales/{{lng}}/{{ns}}.missing.json",
      // jsonIndent to use when storing json files
      jsonIndent: 2,
    },
    fallbackLng: "en",
    lng: "ar",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
