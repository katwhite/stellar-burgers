import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/services/store';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  counter: number;
};
export const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  counter: 0
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.counter += 1;
      state.ingredients.push({
        ...action.payload,
        id: state.counter.toString()
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
  }
});

export const { addBun, addIngredient, removeIngredient, moveUp, moveDown } =
  burgerConstructorSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export default burgerConstructorSlice.reducer;
