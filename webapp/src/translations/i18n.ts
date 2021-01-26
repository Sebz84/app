import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslationMessages from './languages/en.json';
import deTranslationMessages from './languages/de.json';
import frTranslationMessages from './languages/fr.json';
import zhsTranslationMessages from './languages/zhs.json';
import zhtTranslationMessages from './languages/zht.json';
import nlTranslationMessages from './languages/nl.json';
import rsTranslationMessages from './languages/ru.json';
import {
  LANG_VARIABLE,
  ENGLISH,
  ENGLISH_BRITISH,
  GERMAN,
  FRENCH,
  CHINESE_SIMPLIFIED,
  CHINESE_TRADITIONAL,
  DUTCH,
  RUSSIAN,
} from '../constants';
import PersistentStore from '../utils/persistentStore';
import _ from 'lodash';

const formatTranslationMessages = (locale, messages) => {
  const flattenFormattedMessages = (formattedMessages, key) => {
    const localMessage = messages[key];
    const baseMessage = enTranslationMessages[key];
    const formattedMessage = _.merge({}, baseMessage, localMessage);
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const resources = {
  [ENGLISH]: {
    translation: formatTranslationMessages(ENGLISH, enTranslationMessages),
  },
  [GERMAN]: {
    translation: formatTranslationMessages(GERMAN, deTranslationMessages),
  },
  [FRENCH]: {
    translation: formatTranslationMessages(FRENCH, frTranslationMessages),
  },
  [CHINESE_SIMPLIFIED]: {
    translation: formatTranslationMessages(
      CHINESE_SIMPLIFIED,
      zhsTranslationMessages
    ),
  },
  [CHINESE_TRADITIONAL]: {
    translation: formatTranslationMessages(
      CHINESE_TRADITIONAL,
      zhtTranslationMessages
    ),
  },
  [DUTCH]: {
    translation: formatTranslationMessages(DUTCH, nlTranslationMessages),
  },
  [RUSSIAN]: {
    translation: formatTranslationMessages(RUSSIAN, rsTranslationMessages),
  },
};

export const setupI18n = () => {
  const storageLang = PersistentStore.get(LANG_VARIABLE);
  let locale = '';
  if (storageLang) {
    locale = storageLang;
  } else if (navigator.language) {
    const lang = navigator.language;
    locale = lang;
  } else if (navigator.languages) {
    const lang = navigator.languages[0];
    locale = lang;
  }
  PersistentStore.set(LANG_VARIABLE, locale);
  i18n.use(initReactI18next).init({
    lng: getLocales(locale),
    resources,
    interpolation: {
      prefix: '%{',
      suffix: '}',
    },
  });
};

export const changeLanguage = (lang: string) => {
  PersistentStore.set(LANG_VARIABLE, lang);
  i18n.changeLanguage(lang);
};

export const getLocales = (lang: string) => {
  switch (lang) {
    case ENGLISH:
    case ENGLISH_BRITISH:
      return ENGLISH;
    case GERMAN:
      return GERMAN;
    case FRENCH:
      return FRENCH;
    case CHINESE_SIMPLIFIED:
      return CHINESE_SIMPLIFIED;
    case CHINESE_TRADITIONAL:
      return CHINESE_TRADITIONAL;
    case DUTCH:
      return DUTCH;
    case RUSSIAN:
      return RUSSIAN;
    default:
      return ENGLISH;
  }
};
