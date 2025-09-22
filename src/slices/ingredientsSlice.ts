import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { useParams } from 'react-router-dom';

interface IngredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsListState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await getIngredientsApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const {} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
