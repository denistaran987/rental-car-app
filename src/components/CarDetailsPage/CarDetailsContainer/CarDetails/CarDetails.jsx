import s from './CarDetails.module.css';
import CarFunctions from './CarFunctions/CarFunctions';
import CarSpecifications from './CarSpecifications/CarSpecifications';
import RentalConditions from './RentalConditions/RentalConditions';

const CarDetails = () => {
  return (
    <div className={s.carDetails}>
      <RentalConditions />
      <CarSpecifications />
      <CarFunctions />
    </div>
  );
};

export default CarDetails;
