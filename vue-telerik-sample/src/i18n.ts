import { createI18n } from 'vue-i18n';
import en from './locales/es.json';
const i18n = createI18n({
  locale: 'es',  // default locale
    messages: {
      en,
    },
});
export default i18n;
