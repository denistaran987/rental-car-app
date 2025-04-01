import clsx from 'clsx';
import s from './HeroSection.module.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <main>
      <section className={s.section}>
        <div className={clsx('container', s.content)}>
          <h1 className={s.title}>Find your perfect rental car</h1>
          <span className={s.text}>
            Reliable and budget-friendly rentals for any journey
          </span>
          <Link to="/catalog" className={s.link}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
