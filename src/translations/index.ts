
import { enTranslations } from './en';
import { esTranslations } from './es';

export type Language = "en" | "es";

export interface TranslationsType {
  [key: string]: string;
}

export const translations: Record<Language, TranslationsType> = {
  en: enTranslations,
  es: esTranslations
};
