import { useParams } from 'react-router-dom';
import s from './CarDetailsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCarById } from '../../redux/cars/operations';
import ImageFormContainer from '../../components/CarDetailsPage/ImageFormContainer/ImageFormContainer';
import { selectIsLoading } from '../../redux/cars/selectors';
import Loader from '../../components/Loader/Loader';
import CarDetailsContainer from '../../components/CarDetailsPage/CarDetailsContainer/CarDetailsContainer';
import MainCarInfo from '../../components/CarDetailsPage/CarDetailsContainer/MainCarInfo/MainCarInfo';
import CarDetails from '../../components/CarDetailsPage/CarDetailsContainer/CarDetails/CarDetails';
import clsx from 'clsx';

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  return (
    <section className={s.section}>
      <div className={clsx('container', s['details-container'])}>
        <ImageFormContainer />
        <CarDetailsContainer>
          <MainCarInfo />
          <CarDetails />
        </CarDetailsContainer>
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default CarDetailsPage;
