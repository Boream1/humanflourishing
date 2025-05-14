
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { translations, Language, TranslationsType } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Intentar recuperar el idioma del localStorage si existe
  const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") as Language : "en";
  const [language, setLanguageState] = useState<Language>(storedLanguage || "en");

  // Función para traducir texto
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Función para cambiar el idioma y guardarlo en localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage);
    }
  };

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el contexto de idioma
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
