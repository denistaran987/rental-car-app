import { Form, Select, Input } from 'antd';
import { useState } from 'react';
import s from './CarFiltersPanel.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectCarsInfo } from '../../../redux/cars/selectors';

const { Option } = Select;

const CarFiltersPanel = () => {
  const [form] = Form.useForm();
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const { carsBrandList, carsPriceList } = useSelector(selectCarsInfo);

  const handleSubmit = async values => {
    try {
      console.log(values);
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

        <Form.Item name="price" label="Price/ 1 hour">
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
            name="from"
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
            name="to"
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
            Search
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CarFiltersPanel;
