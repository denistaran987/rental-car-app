import s from './CarFunctions.module.css';
import { useSelector } from 'react-redux';
import { selectCarInfo } from '../../../../../redux/cars/selectors';

const CarFunctions = () => {
  const carInfo = useSelector(selectCarInfo);
  const { accessories } = carInfo;

  return (
    <div>
      <h3 className={s.title}>Accessories and functionalities:</h3>
      <ul className={s.list}>
        {accessories &&
          accessories.map(accessor => {
            return (
              <li className={s.item} key={accessor}>
                <svg width="16" height="16">
                  <use href="/icons.svg#icon-circle"></use>
                </svg>
                {accessor}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CarFunctions;
