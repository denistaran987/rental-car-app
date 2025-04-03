import { useSelector } from 'react-redux';
import s from './RentalConditions.module.css';
import { selectCarInfo } from '../../../../../redux/cars/selectors';

const RentalConditions = () => {
  const carInfo = useSelector(selectCarInfo);

  const { rentalConditions } = carInfo;

  return (
    <div>
      <h3 className={s.title}>Rental Conditions:</h3>
      <ul className={s.list}>
        {rentalConditions &&
          rentalConditions.map(condition => {
            return (
              <li className={s.item} key={condition}>
                <svg width="16" height="16">
                  <use href="/icons.svg#icon-circle"></use>
                </svg>
                {condition}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RentalConditions;
