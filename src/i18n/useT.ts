import { en } from "./en";
import { fr } from "./fr";
import type { Translations } from "./types";

export type Locale = "en" | "fr";

const locales: Record<Locale, Translations> = { en, fr };

/**
 * Returns a `t(key)` function for the given locale.
 * Key is a dot-separated path into the Translations object.
 * Falls back to English if key not found.
 */
export function useT(locale: Locale): Translations {
  return locales[locale] ?? en;}

