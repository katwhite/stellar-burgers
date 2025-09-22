import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi, getOrderByNumberApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface orderState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: orderState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const fetchOrder = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/getOrder', async (data, { rejectWithValue }) => {
  try {
    return (await getOrderByNumberApi(data)).orders[0];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.ingredients = action.payload;
      });
  }
});

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const {} = orderSlice.actions;

export default orderSlice.reducer;
