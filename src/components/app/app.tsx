import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
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
import { checkUserAuth } from '../../slices/userSlice';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeed());
    dispatch(checkUserAuth());
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
          <Route
            path='/login'
            element={<ProtectedRoute onlyUnAuth component={<Login />} />}
          />
          <Route
            path='/register'
            element={<ProtectedRoute onlyUnAuth component={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={<ProtectedRoute component={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<ProtectedRoute component={<ResetPassword />} />}
          />
          <Route
            path='/profile'
            element={<ProtectedRoute component={<Profile />} />}
          >
            <Route
              path='orders'
              element={<ProtectedRoute component={<ProfileOrders />} />}
            >
              <Route path=':number' element={<OrderInfo />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
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
        {state?.background && (
          <Routes>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={'Детали заказа'} onClose={handleModalClose}>
                  <OrderInfo />
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
