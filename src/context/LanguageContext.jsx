// src/context/LanguageContext.jsx
import { createContext, useContext, useState } from "react";
import strings from "../i18n/strings";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const t = strings[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ur" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
