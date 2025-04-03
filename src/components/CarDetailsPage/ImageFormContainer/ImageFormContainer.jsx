import { useSelector } from 'react-redux';
import { selectCarInfo, selectIsLoading } from '../../../redux/cars/selectors';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import RentalForm from './RentalForm/RentalForm';
import s from './ImageFormContainer.module.css';

const ImageFormContainer = () => {
  const carInfo = useSelector(selectCarInfo);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={s['imageform-container']}>
      {!isLoading && carInfo ? (
        <>
          <img className={s.image} src={carInfo.img} alt="car photo" />
          <RentalForm />
        </>
      ) : (
        <ErrorMessage message="Sorry, we couldn't find the car, try again later" />
      )}
    </div>
  );
};

export default ImageFormContainer;
