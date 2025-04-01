import { useEffect } from 'react';
import CarFiltersPanel from '../../components/CatalogPage/CarFiltersPanel/CarFiltersPanel';
import AppBar from '../../components/HomePage/AppBar/AppBar';
import s from './CatalogPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsBrand, fetchCarsList } from '../../redux/cars/operations';
import Loader from '../../components/Loader/Loader';
import { selectIsLoading } from '../../redux/cars/selectors';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCarsBrand());
    dispatch(fetchCarsList());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <section className={s.section}>
        <div className="container">
          <CarFiltersPanel />
        </div>
      </section>
      {isLoading && <Loader />}
    </>
  );
};

export default CatalogPage;
