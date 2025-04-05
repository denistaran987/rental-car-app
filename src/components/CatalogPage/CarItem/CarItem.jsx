import s from './CarItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCars } from '../../../redux/cars/selectors';
import { toggleFavorite } from '../../../redux/cars/slice';

const CarItem = ({ car }) => {
  const dispatch = useDispatch();
  const selectedCars = useSelector(selectSelectedCars);
  const checked = selectedCars.includes(car.id);

  const handleToggle = () => {
    dispatch(toggleFavorite(car.id));
  };

  return (
    <>
      <article className={s.item}>
        <div className={s['image-container']}>
          <div
            style={{ backgroundImage: `url(${car.img})` }}
            className={s.image}
          ></div>
          <label className={s['checkbox-label']}>
            <input
              className={s.field}
              type="checkbox"
              checked={checked}
              onChange={handleToggle}
            />
            <svg
              className={`${s.icon} ${checked ? s.checked : ''}`}
              width="16"
              height="16"
            >
              <use href="/icons.svg#icon-heart"></use>
            </svg>
          </label>
        </div>
        <div className={s['car-info']}>
          <div className={s['title-container']}>
            <h2 className={s.title}>
              {car.brand} <span className={s.model}>{car.model}</span>,
            </h2>
            <span className={s.year}>&nbsp;{car.year}</span>
            <span className={s.rentalPrice}>${car.rentalPrice}</span>
          </div>
          <ul className={s['info-list']}>
            <li>
              {car.address.split(' ').slice(3).join(' | ').replace(',', '')} |
            </li>
            <li>&nbsp;{car.rentalCompany} |</li>
          </ul>
          <ul className={s['info-list']}>
            <li>&nbsp;{car.type} |</li>
            <li>
              &nbsp;
              {`${String(car.mileage)[0]} ${String(car.mileage).slice(1)}`}{' '}
            </li>
          </ul>
        </div>
      </article>
      <Link className={s.link} to={`/catalog/${car.id}`}>
        Read More
      </Link>{' '}
    </>
  );
};

export default CarItem;
