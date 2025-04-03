import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Input } from 'antd';
import s from './CarFiltersPanel.module.css';
import clsx from 'clsx';
import { selectCarsInfo, selectIsLoading } from '../../../redux/cars/selectors';
import { fetchCarsBrand, fetchCarsData } from '../../../redux/cars/operations';
import { resetCarsState, setFilters } from '../../../redux/cars/slice';
import { ClipLoader } from 'react-spinners';

const { Option } = Select;

const CarFiltersPanel = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const { carsBrandList } = useSelector(selectCarsInfo);
  const carsPriceList = [30, 40, 50, 60, 70, 80];

  const handleSubmit = values => {
    try {
      dispatch(resetCarsState());
      dispatch(fetchCarsBrand());
      dispatch(setFilters(values));
      dispatch(fetchCarsData({ page: '1', filters: values }));
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        form={form}
        className={s.form}
        name="request_creation"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item name="brand" label="car brand" className={s.customLabel}>
          <Select
            placeholder="Choose a brand"
            style={{ width: 204, height: 44 }}
            className={s.customLabel}
            open={openBrand}
            onDropdownVisibleChange={visible => setOpenBrand(visible)}
            suffixIcon={
              <svg className={openBrand ? s.active : ''} width="15" height="10">
                <use href="/icons.svg#icon-arrow"></use>
              </svg>
            }
          >
            {carsBrandList &&
              carsBrandList.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name="rentalPrice" label="Price/ 1 hour">
          <Select
            placeholder="Choose a price"
            style={{ width: 204, height: 44 }}
            open={openPrice}
            onDropdownVisibleChange={visible => setOpenPrice(visible)}
            suffixIcon={
              <svg className={openPrice ? s.active : ''} width="15" height="10">
                <use href="/icons.svg#icon-arrow"></use>
              </svg>
            }
          >
            {carsPriceList &&
              carsPriceList.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div className={s['input-container']}>
          <Form.Item
            name="minMileage"
            label="Сar mileage / km"
            style={{ display: 'flex' }}
            rules={[{ pattern: /^[0-9]+$/, message: 'Enter a valid number' }]}
          >
            <Input
              type="text"
              className={clsx(s.field, s['field_from'])}
              placeholder="From"
            />
          </Form.Item>
          <Form.Item
            name="maxMileage"
            style={{ display: 'flex' }}
            rules={[{ pattern: /^[0-9]+$/, message: 'Enter a valid number' }]}
          >
            <Input
              type="text"
              className={clsx(s.field, s['field_to'])}
              placeholder="To"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <button className={s.button} type="submit">
            {isLoading ? (
              <div className={s.loaderWrapper}>
                <ClipLoader size={20} color="#fff" />
              </div>
            ) : (
              'Search'
            )}{' '}
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CarFiltersPanel;
