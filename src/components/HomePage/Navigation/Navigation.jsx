import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <nav>
      <ul className={s.list}>
        <li>
          <NavLink className={buildLinkClass} to={'/'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to={'/catalog'}>
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
