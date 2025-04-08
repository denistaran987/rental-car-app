import { useEffect } from 'react';
import CarFiltersPanel from '../../components/CatalogPage/CarFiltersPanel/CarFiltersPanel';
import s from './CatalogPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsBrand, fetchCarsData } from '../../redux/cars/operations';
import { selectIsLoading } from '../../redux/cars/selectors';
import CarsList from '../../components/CatalogPage/CarsList/CarsList';
import Loader from '../../components/Loader/Loader';
import { setFilters } from '../../redux/cars/slice';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(searchParams.entries());

    dispatch(fetchCarsBrand());
    dispatch(fetchCarsData({ page: '1', filters: paramsObj }));
    dispatch(setFilters(paramsObj));
  }, [dispatch]);

  return (
    <>
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
