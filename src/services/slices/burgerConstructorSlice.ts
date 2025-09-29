import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/services/store';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { orderBurger } from './orderSlice';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push({
        ...action.payload,
        id: nanoid()
      });
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveUp: (state, action: PayloadAction<number>) => {
      let temp = state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = temp;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      let temp = state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = temp;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const { addBun, addIngredient, removeIngredient, moveUp, moveDown } =
  burgerConstructorSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export default burgerConstructorSlice.reducer;
