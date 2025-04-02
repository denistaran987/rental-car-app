import { useEffect } from 'react';
import CarFiltersPanel from '../../components/CatalogPage/CarFiltersPanel/CarFiltersPanel';
import AppBar from '../../components/HomePage/AppBar/AppBar';
import s from './CatalogPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsBrand, fetchCarsData } from '../../redux/cars/operations';
import Loader from '../../components/Loader/Loader';
import { selectIsLoading } from '../../redux/cars/selectors';
import CarsList from '../../components/CatalogPage/CarsList/CarsList';
import { resetCarsState } from '../../redux/cars/slice';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(resetCarsState());
    dispatch(fetchCarsBrand());
    dispatch(fetchCarsData());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <section className={s.section}>
        <div className="container">
          <CarFiltersPanel />
          <CarsList />
        </div>
      </section>
      {isLoading && <Loader />}
    </>
  );
};

export default CatalogPage;
