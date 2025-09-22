import { ConstructorPage, Feed, Login } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  Location,
  useNavigate
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { fetchFeed } from '../../slices/feedSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeed());
  }, [dispatch]);

  function handleModalClose(): void {
    navigate(-1);
  }

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={state?.background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />}>
            <Route path=':number' element={<OrderInfo />} />
          </Route>
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
        </Routes>
        {state?.background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={'Детали заказа'} onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
        {state?.background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингридиента'} onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
