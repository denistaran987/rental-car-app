import clsx from 'clsx';
import Logo from '../../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import s from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={s.header}>
      <div className={clsx('container', s['header-container'])}>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default AppBar;
