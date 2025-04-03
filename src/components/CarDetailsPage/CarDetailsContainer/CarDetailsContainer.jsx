import s from './CarDetailsContainer.module.css';

const CarDetailsContainer = ({ children }) => {
  return <div className={s['cardetails-container']}>{children}</div>;
};

export default CarDetailsContainer;
