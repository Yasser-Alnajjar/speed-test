import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["ar", "en"] as const;
export type LocaleTypes = (typeof locales)[number];
export const localePrefix = "always";
export const defaultLocale = "en";
export const defaultLanguageCode = "en-US";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing);
