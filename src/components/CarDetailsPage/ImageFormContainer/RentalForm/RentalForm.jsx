import { useSelector } from 'react-redux';
import s from './RentalForm.module.css';
import { selectIsLoading } from '../../../../redux/cars/selectors';
import { DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import localeData from '../../../../../local.json';
import moment from 'moment';

const RentalForm = () => {
  const [form] = Form.useForm();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = values => {
    try {
      toast.success(
        'Great choice! Your car rental has been successfully booked.',
        {
          style: { backgroundColor: '#9be1a0', fontWeight: 'medium' },
          iconTheme: { primary: 'white', secondary: 'black' },
        }
      );
      console.log('Rental request submitted successfully:', values);
      form.resetFields();
    } catch (error) {
      toast.error(error.message, {
        style: { backgroundColor: '#FFCCCC', fontWeight: 'medium' },
      });
    }
  };

  return (
    <div className={s['form-wrapper']}>
      <h2 className={s.title}>Book your car now</h2>
      <p className={s.description}>
        Stay connected! We are always ready to help you.{' '}
      </p>
      <Form
        form={form}
        className={s.form}
        name="request_creation"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Name is required!' }]}
        >
          <Input
            placeholder="Name*"
            className={s.field}
            style={{
              width: '100%',
              backgroundColor: '#F7F7F7',
              height: 48,
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            placeholder="Email*"
            className={s.field}
            style={{
              width: '100%',
              backgroundColor: '#F7F7F7',
              height: 48,
              borderRadius: 'none',
            }}
          />
        </Form.Item>

        <Form.Item name="date">
          <DatePicker
            placeholder="Booking date"
            suffixIcon={null}
            style={{
              width: '100%',
              backgroundColor: '#F7F7F7',
              height: 48,
              borderRadius: 'none',
            }}
            locale={localeData}
            disabledDate={current => {
              return current && current < moment().endOf('day');
            }}
          />
        </Form.Item>

        <Form.Item name="comment">
          <TextArea
            rows={4}
            placeholder="Comment"
            className={s.textarea}
            style={{
              backgroundColor: '#F7F7F7',
              height: 90,
              border: 'none',
              resize: 'none',
            }}
          />
        </Form.Item>

        <Form.Item>
          <button className={s.button} type="submit">
            {isLoading ? (
              <div className={s.loaderWrapper}>
                <ClipLoader size={20} color="#fff" />
              </div>
            ) : (
              'Send'
            )}{' '}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RentalForm;
