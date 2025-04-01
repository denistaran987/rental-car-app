import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(() =>
  import('../pages/CarDetailsPage/CarDetailsPage')
);
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
