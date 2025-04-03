import { useDispatch, useSelector } from 'react-redux';
import {
  selectCarsFilters,
  selectCarsInfo,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../../redux/cars/selectors';
import s from './CarsList.module.css';
import CarItem from '../CarItem/CarItem';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { fetchCarsData } from '../../../redux/cars/operations';
import { useEffect } from 'react';
import { resetCarsState } from '../../../redux/cars/slice';
import { ClipLoader } from 'react-spinners';

const CarsList = () => {
  const { carsList } = useSelector(selectCarsInfo);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectCarsFilters);
  const dispatch = useDispatch();

  const hasCars = carsList && carsList.length > 0;
  const showLoadMore = carsList.length > 0 && page < totalPages;

  const sortedCars = [...carsList].sort(
    (a, b) => parseFloat(a.rentalPrice) - parseFloat(b.rentalPrice)
  );

  useEffect(() => {
    dispatch(resetCarsState());
    dispatch(fetchCarsData({ page: '1', filters: {} }));
  }, [dispatch]);

  const handleCLick = () => {
    dispatch(fetchCarsData({ page: String(+page + 1), filters }));
  };

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && hasCars && (
        <ul className={s.list}>
          {sortedCars.map(car => (
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
          {isLoading ? (
            <div className={s.loaderWrapper}>
              <ClipLoader size={20} color="#fff" />
            </div>
          ) : (
            'Load more'
          )}
        </button>
      )}
    </>
  );
};

export default CarsList;
