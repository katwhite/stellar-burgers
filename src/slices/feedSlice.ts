import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from 'src/services/store';

interface IngredientsListState {
  ordersData: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsListState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  error: null
};

export const fetchFeed = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('orders/all/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersData = action.payload;
      });
  }
});

export const selectFeed = (state: RootState) => state.feed.ordersData;
export const selectIsLoading = (state: RootState) => state.feed.isLoading;

export const {} = feedSlice.actions;

export default feedSlice.reducer;
