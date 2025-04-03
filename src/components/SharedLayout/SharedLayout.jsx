import AppBar from '../HomePage/AppBar/AppBar';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';

const SharedLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <AppBar />
      {children}
    </Suspense>
  );
};

export default SharedLayout;
