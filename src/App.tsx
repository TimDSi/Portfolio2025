import { useEffect } from 'react';
import './App.css';
import Navbar from './components/general/Navbar/Navbar';
import { useTranslation } from 'react-i18next';
import { getInitialLanguage } from './components/general/Settings/settings-languages';
import { getInitialTheme } from './components/general/Settings/settings-themes';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = getInitialLanguage();
    i18n.changeLanguage(language);
    
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Default */}
      </main>
    </>
  );
}

export default App;
