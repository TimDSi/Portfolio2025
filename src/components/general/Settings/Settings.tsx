import { useState, useRef, useEffect } from 'react';
import './Settings.css';
import { useTranslation } from 'react-i18next';
import { availableLanguages, getInitialLanguage, changeLanguage } from './settings-languages';
import { availableThemes, getInitialTheme, changeTheme } from './settings-themes';

const Settings = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [theme, setTheme] = useState(getInitialTheme);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setLanguage(selected);
    changeLanguage(selected, i18n); 
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setTheme(selected);
    changeTheme(selected); 
  };

  return (
    <div className="settings-wrapper" ref={dropdownRef}>
      <button className="settings-toggle" onClick={() => setOpen(!open)}>
        ⚙️
      </button>
      {open && (
        <div className="settings-dropdown">
          <label>
            Language :
            <select value={language} onChange={handleLanguageChange}>
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('settings.theme.title')} :
            <select value={theme} onChange={handleThemeChange}>
              {availableThemes.map((theme) => (
                <option key={theme.code} value={theme.code}>
                  {t(`settings.theme.${theme.code}`)}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default Settings;
