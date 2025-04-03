import { useEffect } from 'react';
import CarFiltersPanel from '../../components/CatalogPage/CarFiltersPanel/CarFiltersPanel';
import s from './CatalogPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsBrand } from '../../redux/cars/operations';
import { selectIsLoading } from '../../redux/cars/selectors';
import CarsList from '../../components/CatalogPage/CarsList/CarsList';
import Loader from '../../components/Loader/Loader';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCarsBrand());
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
