import Settings from '../Settings/Settings';
import './Navbar.css';

import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#home">{t('navigation.home')}</a></li>
        <li><a href="#projects">{t('navigation.projects')}</a></li>
        <li><a href="#career">{t('navigation.career')}</a></li>
        <li><a href="#qualifications">{t('navigation.qualifications')}</a></li>
        <li><Settings /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
