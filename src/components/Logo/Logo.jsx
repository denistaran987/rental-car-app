import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to="/">
        <svg width="104" height="16">
          <use href="/icons.svg#icon-logo"></use>
        </svg>
      </Link>
    </>
  );
};

export default Logo;
