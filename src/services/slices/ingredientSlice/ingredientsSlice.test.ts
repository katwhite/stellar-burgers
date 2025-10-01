import * as api from '@api';
import ingredientsReducer, {
  fetchIngredients,
  selectIngredients,
  selectIsLoading
} from './ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../../store';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

describe('ingredientsSliceTests', () => {
  let store: ReturnType<typeof configureStore>;
  // const dispatch = useDispatch();

  beforeEach(() => {
    store = configureStore({
      reducer: { ingredients: ingredientsReducer },
      preloadedState: {
        ingredients: {
          ingredients: [],
          isLoading: false,
          error: null
        }
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Request: при dispatch(fetchIngredients) isLoading становится true', async () => {
    const slowPromise: Promise<TIngredient[]> = new Promise((resolve) => {
      setTimeout(() => resolve(mockIngredients), 20);
    });
    jest.spyOn(api, 'getIngredientsApi').mockImplementation(() => slowPromise);

    const spy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockImplementation(() => slowPromise as any);

    const dispatchPromise = store.dispatch(fetchIngredients());
    const state: RootState = store.getState();

    expect(selectIsLoading(state)).toBe(true);
    await dispatchPromise;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(selectIsLoading(state)).toBe(false);
  });

  test('ингридиенты загрузились, данные записываются и isLoading = false', async () => {
    const spy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockResolvedValue(mockIngredients);

    await dispatch(fetchIngredients());

    const state: RootState = store.getState();

    expect(selectIngredients(state)).toEqual(mockIngredients);
    expect(selectIsLoading(state)).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('ошибка загрузки ингредиентов, error записывается и isLoading = false', async () => {
    const spy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockRejectedValue(new Error('Ошибка сети'));

    await dispatch(fetchIngredients());

    const state: RootState = store.getState();

    expect(state.ingredients.error).toBe('Ошибка сети');
    expect(selectIsLoading(state)).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
