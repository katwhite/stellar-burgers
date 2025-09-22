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

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location };

  function handleModalClose(): void {
    navigate(-1);
  }

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={state?.background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
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
