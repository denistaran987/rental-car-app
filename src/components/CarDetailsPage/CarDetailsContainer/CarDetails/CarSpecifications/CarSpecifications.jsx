import { useSelector } from 'react-redux';
import s from './CarSpecifications.module.css';
import { selectCarInfo } from '../../../../../redux/cars/selectors';

const CarSpecifications = () => {
  const carInfo = useSelector(selectCarInfo);
  const { year, type, fuelConsumption, engineSize } = carInfo;

  return (
    <div>
      <h3 className={s.title}>Car Specifications:</h3>
      <ul className={s.list}>
        <li className={s.item}>
          <svg width="16" height="16">
            <use href="/icons.svg#icon-calendar"></use>
          </svg>
          Year: {year}
        </li>
        <li className={s.item}>
          <svg width="16" height="16">
            <use href="/icons.svg#icon-car"></use>
          </svg>
          Type: {type}
        </li>
        <li className={s.item}>
          <svg width="16" height="16">
            <use href="/icons.svg#icon-fuel_pump"></use>
          </svg>
          Fuel Consumption: {fuelConsumption}
        </li>
        <li className={s.item}>
          <svg width="16" height="16">
            <use href="/icons.svg#icon-gear"></use>
          </svg>
          Engine Size: {engineSize}
        </li>
      </ul>
    </div>
  );
};

export default CarSpecifications;
