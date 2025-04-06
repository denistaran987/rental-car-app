import { useDispatch, useSelector } from 'react-redux';
import {
  selectCarsFilters,
  selectCarsInfo,
  selectIsLoading,
  selectPage,
  selectSelectedCars,
  selectTotalPages,
} from '../../../redux/cars/selectors';
import s from './CarsList.module.css';
import CarItem from '../CarItem/CarItem';
import Loader from '../../Loader/Loader';
import { fetchCarsData } from '../../../redux/cars/operations';
import { ClipLoader } from 'react-spinners';

const CarsList = () => {
  const { carsList } = useSelector(selectCarsInfo);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectCarsFilters);
  const selectedCars = useSelector(selectSelectedCars);
  const dispatch = useDispatch();

  const hasCars = carsList.length > 0;
  const showLoadMore = carsList.length > 0 && page < totalPages;

  const sortedCars = [...carsList].sort((a, b) => {
    const aChecked = selectedCars.includes(a.id);
    const bChecked = selectedCars.includes(b.id);

    if (aChecked !== bChecked) {
      return bChecked - aChecked;
    }

    return parseFloat(a.rentalPrice) - parseFloat(b.rentalPrice);
  });

  const handleCLick = () => {
    dispatch(fetchCarsData({ page: String(+page + 1), filters }));

    setTimeout(() => {
      const currentScrollPosition = window.scrollY;
      window.scrollTo({
        top: currentScrollPosition + 440,
        behavior: 'smooth',
      });
    }, 300);
  };

  return (
    <>
      {isLoading && <Loader />}
      {hasCars && (
        <ul className={s.list}>
          {sortedCars.map(car => (
            <li className={s.item} key={car.id}>
              <CarItem car={car} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !hasCars && (
        <img
          className={s.image}
          width="400"
          height="400"
          src="/images/cars_not_found.png"
          alt="photo cars not found"
        />
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
