import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Input } from 'antd';
import s from './CarFiltersPanel.module.css';
import clsx from 'clsx';
import {
  selectCarsFilters,
  selectCarsInfo,
  selectIsLoading,
} from '../../../redux/cars/selectors';
import { fetchCarsData } from '../../../redux/cars/operations';
import { resetCarsState, setFilters } from '../../../redux/cars/slice';
import { ClipLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';

const { Option } = Select;

const CarFiltersPanel = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { carsBrandList } = useSelector(selectCarsInfo);
  const currentFilters = useSelector(selectCarsFilters);
  const carsPriceList = [30, 40, 50, 60, 70, 80];

  useEffect(() => {
    const initialValues = {
      brand: searchParams.get('brand') || currentFilters.brand || undefined,
      rentalPrice:
        searchParams.get('rentalPrice') ||
        currentFilters.rentalPrice ||
        undefined,
      minMileage:
        searchParams.get('minMileage') ||
        currentFilters.minMileage ||
        undefined,
      maxMileage:
        searchParams.get('maxMileage') ||
        currentFilters.maxMileage ||
        undefined,
    };
    form.setFieldsValue(initialValues);
  }, [form, currentFilters, searchParams]);

  const handleSubmit = values => {
    try {
      const newSearchParams = new URLSearchParams();
      if (values.brand) newSearchParams.set('brand', values.brand);
      if (values.rentalPrice)
        newSearchParams.set('rentalPrice', values.rentalPrice);
      if (values.minMileage)
        newSearchParams.set('minMileage', values.minMileage);
      if (values.maxMileage)
        newSearchParams.set('maxMileage', values.maxMileage);
      setSearchParams(newSearchParams);

      dispatch(resetCarsState());
      dispatch(setFilters(values));
      dispatch(fetchCarsData({ page: '1', filters: values }));
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
        <Form.Item name="brand" label="Car brand" className={s.customLabel}>
          <Select
            placeholder="Choose a brand"
            style={{ width: 204, height: 44 }}
            allowClear
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
            allowClear
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
          >
            <div className={s['input-wrapper']}>
              <span className={s['input-prefix']}>From</span>
              <Input
                type="number"
                min={0}
                className={clsx(s.field, s['field_from'])}
              />
            </div>
          </Form.Item>
          <Form.Item name="maxMileage" style={{ display: 'flex' }}>
            <div className={s['input-wrapper']}>
              <span className={s['input-prefix']}>To</span>{' '}
              <Input
                type="number"
                min={0}
                className={clsx(s.field, s['field_to'])}
              />
            </div>
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
