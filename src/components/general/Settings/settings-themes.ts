/** 
 *     Themes
 */

export type Theme = {
  code: string;
};

export const availableThemes: Theme[] = [
  { code: 'system' },
  { code: 'light' },
  { code: 'dark' },
];

export const getInitialTheme = (): string => {
  const storedTheme = localStorage.getItem('theme');
  if (availableThemes.find((t) => t.code === storedTheme)) return storedTheme!;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

export const changeTheme = (theme: string) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme); 
};
