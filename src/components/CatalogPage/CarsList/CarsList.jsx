import { useDispatch, useSelector } from 'react-redux';
import {
  selectCarsInfo,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../../redux/cars/selectors';
import s from './CarsList.module.css';
import CarItem from '../CarItem/CarItem';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { nextPage } from '../../../redux/cars/slice';
import { fetchCarsData } from '../../../redux/cars/operations';

const CarsList = () => {
  const { carsList } = useSelector(selectCarsInfo);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();

  const hasCars = carsList && carsList.length > 0;
  const showLoadMore = carsList.length > 0 && page < totalPages;

  const handleCLick = () => {
    dispatch(nextPage(String(+page + 1)));
    dispatch(fetchCarsData(String(+page + 1)));
  };

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && hasCars && (
        <ul className={s.list}>
          {carsList.map(car => (
            <li className={s.item} key={car.id}>
              <CarItem car={car} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !hasCars && (
        <ErrorMessage message="Sorry, no cars in rental!" />
      )}

      {showLoadMore && (
        <button type="button" className={s.button} onClick={handleCLick}>
          Load more
        </button>
      )}
    </>
  );
};

export default CarsList;
