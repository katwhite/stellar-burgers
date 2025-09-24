import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../../services/store';

interface orderState {
  orders: TOrder[];
  //для заказов пользователя
  ordersLoading: boolean;
  ordersError: string | null;
  //для создания одного заказа
  orderRequest: boolean;
  orderError: string | null;
  orderModalData: TOrder | null;
  //для открытия модалки
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: orderState = {
  orders: [],
  ordersLoading: false,
  ordersError: null,
  orderRequest: false,
  orderError: null,
  orderModalData: null,
  currentOrder: null,
  isLoading: false,
  error: null
};

export const fetchOrder = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrder', async (data, { rejectWithValue }) => {
  try {
    return (await getOrderByNumberApi(data)).orders[0];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const orderBurger = createAsyncThunk<
  { order: TOrder; name: string },
  string[],
  { rejectValue: string }
>('order/orderBurger', async (data, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(data);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
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
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.error.message as string;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message as string;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectIsLoading = (state: RootState) => state.orders.isLoading;
export const selectOrderRequest = (state: RootState) =>
  state.orders.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.orders.orderModalData;

export const { clearOrderModal } = orderSlice.actions;

export default orderSlice.reducer;
