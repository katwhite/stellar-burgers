import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';
import { initialState as userInitialState } from './slices/userSlice/userSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientSlice/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { initialState as ordersInitialState } from './slices/orderSlice/orderSlice';
import { initialState as feedsInitialState } from './slices/feedSlice/feedSlice';

describe('rootReducer', () => {
  it('должен правильно инициализировать начальное состояние', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state).toEqual({
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      feed: feedsInitialState,
      orders: ordersInitialState,
      user: userInitialState
    });
  });
});
