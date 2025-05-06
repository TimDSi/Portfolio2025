import { useState, useRef, useEffect } from 'react';
import './Settings.css';
import { useTranslation } from 'react-i18next';


const availableLanguages = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'fr', label: '🇫🇷 Français' },
  // ex: { code: 'es', label: '🇪🇸 Español' },
];

const availableThemes = [
  { code: 'light', label: '☀️ Clair' },
  { code: 'dark', label: '🌙 Sombre' },
  // ex: { code: 'dracula', label: '🧛 Dracula' },
];

const Settings = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitialLanguage = () => {
    let lang = 'en';

    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang')?.toLowerCase();
    if (availableLanguages.find(l => l.code === urlLang)) {
        lang = urlLang || lang;
        localStorage.setItem('language', lang);
    }

    const storedLang = localStorage.getItem('language');
    if (availableLanguages.find(l => l.code === storedLang)) {
        lang = storedLang || lang;
    }
    return lang;
  };

  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (availableThemes.find(t => t.code === storedTheme)) return storedTheme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  };

  const [language, setLanguage] = useState(getInitialLanguage);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem('language', selected);
    i18n.changeLanguage(selected);
  };

  useEffect(() => {
    language== getInitialLanguage();
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleThemeChange = (e) => {
    const selected = e.target.value;
    setTheme(selected);
    localStorage.setItem('theme', selected);
    document.documentElement.setAttribute('data-theme', selected);
  };

  return (
    <div className="settings-wrapper" ref={dropdownRef}>
      <button className="settings-toggle" onClick={() => setOpen(!open)}>
        ⚙️
      </button>
      {open && (
        <div className="settings-dropdown">
          <label>
            Langue :
            <select value={language} onChange={handleLanguageChange}>
              {availableLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </label>
          <label>
            Thème :
            <select value={theme} onChange={handleThemeChange}>
              {availableThemes.map(theme => (
                <option key={theme.code} value={theme.code}>{theme.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default Settings;