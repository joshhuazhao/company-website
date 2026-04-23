import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const supportedLanguages = ['en', 'zh'] as const;

const loadLocale = async (language: string) => {
    const response = await fetch(`/locales/${language}.json`, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`Failed to load locale file for "${language}"`);
    }

    return response.json();
};

export const initI18n = async () => {
    if (!i18n.isInitialized) {
        i18n
            .use(LanguageDetector)
            .use(initReactI18next);

        await i18n.init({
            resources: {},
            fallbackLng: 'en',
            supportedLngs: [...supportedLanguages],
            interpolation: {
                escapeValue: false
            }
        });
    }

    await Promise.all(
        supportedLanguages.map(async (language) => {
            const translations = await loadLocale(language);
            i18n.addResourceBundle(language, 'translation', translations, true, true);
        })
    );
};

export default i18n;
