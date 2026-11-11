import type { TFunction } from 'i18next';

// i18next returns the key itself when a translation is missing.
// This helper transparently falls back to the provided value
// (e.g. the field loaded from the database).
export const translateOr = (t: TFunction, key: string, fallback: string): string => {
    const translated = t(key);
    return translated === key ? fallback : translated;
};
