"use client";

import { usePathname, useRouter } from "@navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = {
    ...Object.fromEntries(searchParams.entries()),
  };
  const url = `${pathname}${generateQueryString(query)}`;

  const changeLanguageAction = () => {
    const newLang = locale === "ar" ? "en" : "ar";

    router.push(url, { locale: newLang });
  };

  return (
    <button
      onClick={() => changeLanguageAction()}
      className={`${className} px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg`}
    >
      {locale === "en" ? "English" : "العربية"}
    </button>
  );
};
const generateQueryString = (
  params: any,
  checkNullish: boolean = true
): string => {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key as string];

      const checkIfArray = (value: any, key: string) => {
        if (Array.isArray(value)) return `${key}=${value.join(",")}`;
        else return `${key}=${value.toString()}`;
      };

      if (checkNullish) {
        if (value !== null && value !== undefined && value.toString() !== "") {
          return checkIfArray(value, key);
        }
        return "";
      } else return checkIfArray(value, key);
    })
    .filter((param) => (checkNullish ? param !== "" : true))
    .join("&");

  return queryString ? `?${queryString}` : "";
};
