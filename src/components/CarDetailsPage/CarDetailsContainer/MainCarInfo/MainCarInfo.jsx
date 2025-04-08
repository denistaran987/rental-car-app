import { useSelector } from 'react-redux';
import s from './MainCarInfo.module.css';
import { selectCarInfo } from '../../../../redux/cars/selectors';

const MainCarInfo = () => {
  const carInfo = useSelector(selectCarInfo);
  const formattedCarInfoId = carInfo.id && carInfo.id.slice(0, 4);
  const formattedAddress =
    carInfo.address && carInfo.address.split(' ').slice(3).join(' ');
  const formattedMileage = `${String(carInfo.mileage)[0]} ${String(
    carInfo.mileage
  ).slice(1)}`;

  return (
    <div className={s['maininfo-container']}>
      <div className={s.maininfo}>
        <h2 className={s.title}>
          {carInfo.brand} {carInfo.model},{' '}
          <span className={s.year}>{carInfo.year}</span>{' '}
        </h2>
        <span className={s.id}>{`id: ${formattedCarInfoId}`}</span>
      </div>
      <div className={s.location}>
        <svg className={s.icon} width="16" height="16">
          <use href="/icons.svg#icon-location"></use>
        </svg>
        {formattedAddress}
        <span className={s.mileage}>{`Millage: ${formattedMileage} km`}</span>
      </div>
      <span className={s.rentalPrice}>${carInfo.rentalPrice}</span>
      <p className={s.description}>{carInfo.description}</p>
    </div>
  );
};

export default MainCarInfo;
