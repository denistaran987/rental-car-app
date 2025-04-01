import { useSelector } from 'react-redux';
import { selectCarsList, selectIsLoading } from '../../../redux/cars/selectors';
import CarItem from '../CarItem/CarItem';
import Loader from '../../Loader/Loader';

const CatalogList = () => {
  const cars = useSelector(selectCarsList);
  const isLoading = useSelector(selectIsLoading);
  return (
    <>
      <ul>
        {cars.map(car => {
          return (
            <li key={car.id}>
              <CarItem />
            </li>
          );
        })}
      </ul>
      {isLoading && <Loader />}
    </>
  );
};

export default CatalogList;
