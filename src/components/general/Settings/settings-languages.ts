/** 
 *     Languages
 */
export type Language = {
  code: string;
  label: string;
};

export const availableLanguages: Language[] = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'fr', label: '🇫🇷 Français' },
];

export const getInitialLanguage = (): string => {
  let lang = 'en';

  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang')?.toLowerCase();
  if (availableLanguages.find((l) => l.code === urlLang)) {
    lang = urlLang || lang;
    localStorage.setItem('language', lang);
  }

  const storedLang = localStorage.getItem('language');
  if (availableLanguages.find((l) => l.code === storedLang)) {
    lang = storedLang || lang;
  }

  return lang;
};

export const changeLanguage = (language: string, i18n: any) => {
  localStorage.setItem('language', language);
  i18n.changeLanguage(language);
};
