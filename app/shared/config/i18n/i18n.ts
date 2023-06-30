import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import uk from './uk.json';

const LOCALE_PERSISTENCE_KEY = 'language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (language: (arg0: string) => void) => {
    const persistedLocale = await AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY);

    if (!persistedLocale) {
      return language('en');
    }
    language(persistedLocale);
  },
  init: () => {},
  cacheUserLanguage: (locale: string) => {
    void AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
  },
};

void i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: en,
      uk: uk,
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
