import React, { createContext, useContext, useEffect, useState } from 'react';

// pick up the language files; CRA will include them in the bundle
import hrTranslations from './hr.json';
import enTranslations from './en.json';

// key used to store the selected language in sessionStorage
export const LANG_KEY = 'appLang';
const defaultLang = 'hr';
const supportedLanguages = ['hr', 'en'];

// translation dictionary now compiled from external JSON files for clarity.
// adding more languages is as simple as dropping a new file here and
// updating `supportedLanguages`.

const translations = {
  hr: hrTranslations,
  en: enTranslations,
};

// small helper to coerce a language string into something we recognise.
function normalizeLang(lang) {
  if (supportedLanguages.includes(lang)) return lang;
  return defaultLang;
}

function getInitialLang() {
  const stored = sessionStorage.getItem(LANG_KEY);
  if (stored && supportedLanguages.includes(stored)) {
    return stored;
  }

  // no value yet, default to croatian and persist so future renders can
  // read without needing to initialise again.
  sessionStorage.setItem(LANG_KEY, defaultLang);
  return defaultLang;
}

const LanguageContext = createContext({
  lang: defaultLang,
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(getInitialLang);

  const setLanguage = (newLang) => {
    const normalized = normalizeLang(newLang);
    sessionStorage.setItem(LANG_KEY, normalized);
    setLangState(normalized);
  };

  // if some other tab (or the console) writes to sessionStorage we want to
  // update our own state so consumers re-render. the storage event is
  // perfect for this.
  useEffect(() => {
    const handler = (e) => {
      if (e.key === LANG_KEY && e.newValue) {
        const normalized = normalizeLang(e.newValue);
        setLangState(normalized);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const t = (key) => {
    return (
      translations[lang][key] || translations[defaultLang][key] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// convenience hook that just returns the translation helper
export const useTranslation = () => {
  const { t } = useLanguage();
  return t;
};
